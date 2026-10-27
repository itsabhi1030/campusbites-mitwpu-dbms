/**
 * fetch-real-logos.mjs
 *
 * Fetches EXACT official brand logos for all CampusBites outlets.
 * Strategy per outlet:
 *   1. Exact Wikimedia Commons file title (confirmed via probe)
 *   2. Wikipedia page image
 *   3. Official brand CDN / first-party site asset
 *   4. Local SVG fallback (rasterised through the weserv.nl proxy)
 *
 * Outputs:
 *   - client/public/mitwpu-logo.png  (official MIT-WPU crest)
 *   - client/public/logos/<id>.png    (per-outlet brand logos)
 *
 * Then updates:
 *   - client/src/menuData.js  -> OUTLETS[].logoUrl
 *   - client/src/App.jsx       -> MitWpuBrandLogo component
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { getJson, request } from './lib/http.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'client', 'public');
const LOGOS_DIR = path.join(PUBLIC, 'logos');
const MENU_DATA = path.join(ROOT, 'client', 'src', 'menuData.js');
const APP_JSX = path.join(ROOT, 'client', 'src', 'App.jsx');

fs.mkdirSync(LOGOS_DIR, { recursive: true });

const BROWSER_UA =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'cb-logos-'));

/* ------------------------------------------------------------------ *
 * Image handling
 * ------------------------------------------------------------------ */

/** Convert an arbitrary image buffer to PNG using Pillow. */
function toPng(buf, destPath) {
    const tmpIn = path.join(TMP, 'in_' + Math.random().toString(36).slice(2));
    const tmpOut = path.join(TMP, 'out_' + Math.random().toString(36).slice(2) + '.png');
    fs.writeFileSync(tmpIn, buf);
    const py = [
        'from PIL import Image',
        'import sys',
        'src, dst = sys.argv[1], sys.argv[2]',
        'img = Image.open(src)',
        'if img.mode not in ("RGBA", "RGB"):',
        '    img = img.convert("RGBA")',
        'img.save(dst, "PNG")',
    ].join('\n');
    execFileSync('python', ['-c', py, tmpIn, tmpOut], {
        timeout: 60000,
        stdio: ['ignore', 'ignore', 'pipe'],
    });
    const out = fs.readFileSync(tmpOut);
    if (out.length < 128) throw new Error('PNG conversion produced an empty file');
    fs.writeFileSync(destPath, out);
    fs.unlinkSync(tmpIn);
    fs.unlinkSync(tmpOut);
    return out.length;
}

/** Download a URL and store it as PNG at destPath. */
async function fetchAndSave(url, destPath, { timeout = 45000, referer } = {}) {
    const headers = { 'User-Agent': BROWSER_UA, Accept: 'image/*,*/*' };
    if (referer) headers['Referer'] = referer;
    const res = await request(url, { timeout, headers });
    if (res.status !== 200 && res.status !== 206) {
        throw new Error('HTTP ' + res.status + ' for ' + url);
    }
    const ct = (res.headers['content-type'] || '').split(';')[0].trim();
    if (!ct.startsWith('image/')) {
        throw new Error('Not an image (' + ct + ') for ' + url);
    }
    if (res.body.length < 512) {
        throw new Error('Response too small (' + res.body.length + 'B) for ' + url);
    }
    const bytes = toPng(res.body, destPath);
    return { bytes, contentType: ct };
}

/** Convert a LOCAL svg file to PNG via the weserv.nl proxy (base64 data URI). */
async function svgFileToPng(svgPath, destPath, width = 512) {
    const svg = fs.readFileSync(svgPath, 'utf8');
    const dataUri = 'data:image/svg+xml;base64,' + Buffer.from(svg, 'utf8').toString('base64');
    const proxyUrl =
        'https://images.weserv.nl/?url=' + encodeURIComponent(dataUri) + '&output=png&w=' + width + '&q=90';
    return fetchAndSave(proxyUrl, destPath, { timeout: 40000 });
}

/** Sleep helper for rate limiting. */
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

/* ------------------------------------------------------------------ *
 * Source resolvers
 * ------------------------------------------------------------------ */

async function commonsImageInfo(title) {
    if (!title) return null;
    const url =
        'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo' +
        '&iiprop=url|mime|size&iiurlwidth=512&titles=' +
        encodeURIComponent(title);
    const r = await getJson(url);
    for (const p of Object.values(r?.query?.pages || {})) {
        if (p.missing) continue;
        return p.imageinfo?.[0] || null;
    }
    return null;
}

async function wikiPageImage(term) {
    try {
        const r = await getJson(
            'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(term),
            { timeout: 20000 }
        );
        if (!r || (r.type && r.type.includes('not_found'))) return null;
        return r.originalimage?.source || r.thumbnail?.source || null;
    } catch {
        return null;
    }
}

/* ------------------------------------------------------------------ *
 * Outlet configuration
 * ------------------------------------------------------------------ */

// Exact Wikimedia Commons file titles confirmed by probe_titles_batch.mjs
const OUTLET_CONFIG = [
    { id: 'dominos', term: "Domino's Pizza", title: "File:Domino's Pizza logo.png", wikiTerm: "Domino's Pizza" },
    { id: 'mcdonalds', term: "McDonald's", title: "File:McDonald's Golden Arches.svg" },
    { id: 'kfc', term: 'KFC', title: 'File:KFC logo.png' },
    { id: 'burger_king', term: 'Burger King', title: 'File:Burger King 2020.svg' },
    { id: 'subway', term: 'Subway', title: 'File:Subway-logo-green 2016.png' },
    { id: 'starbucks', term: 'Starbucks', title: 'File:Starbucks Corporation Logo 2011.svg', wikiTerm: 'Starbucks' },
    { id: 'taco_bell', term: 'Taco Bell', title: 'File:Taco Bell 2023.svg', wikiTerm: 'Taco Bell' },
    { id: 'haldirams', term: "Haldiram's", title: "File:Haldiram's Logo SVG.svg" },
    { id: 'wow_momo', term: 'Wow Momo', title: 'File:Wow Momo Logo.jpg' },
    { id: 'chaayos', term: 'Chaayos', title: 'File:Chaayos logo.png', wikiTerm: 'Chaayos' },
    { id: 'baskin_robbins', term: 'Baskin Robbins', title: 'File:Baskin Robbins logo 2013 - 2.png' },
    { id: 'behrouz_biryani', term: 'Behrouz Biryani', title: 'File:Behrouz Biryani logo.png', wikiTerm: 'Behrouz Birani' },
    { id: 'madras_cafe', term: 'Madras Cafe', title: 'File:Madras Cafe logo.png', wikiTerm: 'Madras Cafe' },
    { id: 'belgian_waffle', term: 'Belgian Waffle Co', title: 'File:Belgian Waffle Co logo.png', wikiTerm: 'Belgian Waffle Co' },
    { id: 'pizza_hut', term: 'Pizza Hut', title: 'File:Pizza Hut 2025.svg' },
    { id: 'naturals', term: "Natural's Ice Cream", title: 'File:Natural IceCream Logo.png', wikiTerm: "Natural's Ice Cream" },
    { id: 'faasos', term: 'Faasos', title: 'File:Faasos Logo.svg' },
    { id: 'keventers', term: 'Keventers', title: 'File:Keventers Milkshake.png', wikiTerm: 'Keventers' },
    { id: 'california_burrito', term: 'California Burrito', title: 'File:California Burrito Logo.png' },
    { id: 'rolls_mania', term: 'Rolls Mania', title: 'File:RollsManiaLogo.jpg' },
    { id: 'mainland_china', term: 'Mainland China', title: 'File:MainlandChina.png' },
    { id: 'dunkin', term: "Dunkin' Donuts", title: "File:Dunkin' logo.svg" },
    { id: 'bbq_nation', term: 'Barbeque Nation', title: 'File:Barbeque Nation logo.png', wikiTerm: 'Barbeque Nation' },
    { id: 'amul_ice', term: 'Amul', title: 'File:Amul Logo.png' },
    { id: 'juice_junction', term: 'Juice Junction', title: 'File:Juice Junction logo.png', wikiTerm: 'Juice Junction' },
    // Pseudo-outlet "All Outlets" -> CampusBites house brand mark
    { id: 'campusbites', term: 'CampusBites', localOnly: true },
];

/** Official first-party / brand CDN assets used as a fallback tier. */
const CDN_ASSETS = {
    chaayos: ['https://chaayos.com/cdn/shop/files/Chaayos_Logo_a41a4981-896a-411b-b663-c500726a842c.jpg?width=600'],
    madras_cafe: ['https://www.madrascafe.co.in/assets/images/logo.svg'],
    behrouz_biryani: ['https://product-assets.faasos.io/eatsure/production/bb-brandcolor-logo.svg'],
    rolls_mania: ['https://rollsmania.com/assets/images/logo/rm.png'],
    bbq_nation: ['https://barbequenation.com/icons/logo.svg'],
    belgian_waffle: ['https://www.belgianwaffle.com/logo.png'],
    juice_junction: ['https://www.juicejunction.com/logo.png'],
    keventers: ['https://www.keventers.com/static/keventers-logo.png'],
    amul_ice: ['https://www.amul.com/content/amul-ice-cream/images/logo.png'],
    naturals: ['https://www.naturals.com/logo.png'],
    taco_bell: ['https://www.tacobell.com/images/logo.png'],
    starbucks: ['https://www.starbucks.com/assets/images/logo.svg'],
    mcdonalds: ['https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/images/logos/mcdonalds_brand_logo.png'],
    pizza_hut: ['https://ph-site-api.yumchina.com/statics/v1/media/YUM-Logo.svg'],
    dominos: ['https://www.dominos.co.in/media/images/dominos-logo.png'],
    burger_king: ['https://www.burgerking.in/images/logo.png'],
    subway: ['https://www.subway.com/images/logo.png'],
    kfc: ['https://www.kfc.co.in/images/logo.png'],
    dunkin: ['https://www.dunkindonuts.com/images/logo.svg'],
    wow_momo: ['https://www.wowmomo.com/images/logo.png'],
    california_burrito: ['https://www.californiaburrito.co.in/images/logo.png'],
    haldirams: ['https://www.haldirams.com/images/logo.svg'],
    mainland_china: ['https://mainlandchinabowl.com/images/logo.png'],
    baskin_robbins: ['https://www.baskinrobbins.co.in/images/logo.png'],
};

/* ------------------------------------------------------------------ *
 * Fetch orchestration
 * ------------------------------------------------------------------ */

async function fetchLogo(cfg) {
    const dest = path.join(LOGOS_DIR, cfg.id + '.png');
    console.log('\n=== ' + cfg.id + '  ("' + cfg.term + '") ===');
    const attempts = [];

    if (cfg.localOnly) {
        const localSvg = path.join(LOGOS_DIR, cfg.id + '.svg');
        try {
            const bytes = await svgFileToPng(localSvg, dest, 512);
            console.log('  OK  [local-fallback] converted ' + cfg.id + '.svg -> ' + cfg.id + '.png');
            return { ok: true, source: 'local-fallback', title: cfg.id + '.svg', bytes };
        } catch (e) {
            console.log('  XX  FAILED  ' + e.message);
            return { ok: false, error: e.message };
        }
    }

    // 1) Exact Commons file
    if (cfg.title) {
        try {
            const info = await commonsImageInfo(cfg.title);
            if (info?.thumburl) {
                await fetchAndSave(info.thumburl, dest);
                console.log('  OK  [commons-exact]  ' + cfg.title);
                return { ok: true, source: 'commons-exact', title: cfg.title, bytes: fs.statSync(dest).size };
            }
        } catch (e) {
            attempts.push('commons-exact: ' + e.message);
            console.log('  --  commons-exact failed: ' + e.message);
        }
    }

    // 2) Wikipedia page image
    try {
        const wikiUrl = await wikiPageImage(cfg.wikiTerm || cfg.term);
        if (wikiUrl) {
            await fetchAndSave(wikiUrl, dest);
            console.log('  OK  [wikipedia]      ' + wikiUrl.slice(0, 92));
            return { ok: true, source: 'wikipedia', title: cfg.wikiTerm || cfg.term, bytes: fs.statSync(dest).size };
        }
    } catch (e) {
        attempts.push('wikipedia: ' + e.message);
        console.log('  --  wikipedia failed: ' + e.message);
    }

    // 3) Official brand CDN / first-party site asset
    for (const su of CDN_ASSETS[cfg.id] || []) {
        try {
            await fetchAndSave(su, dest, { referer: new URL(su).origin + '/' });
            console.log('  OK  [cdn]             ' + su.slice(0, 92));
            return { ok: true, source: 'cdn', title: su, bytes: fs.statSync(dest).size };
        } catch (e) {
            attempts.push('cdn(' + cfg.id + '): ' + e.message);
        }
    }

    // 4) Commons search fallback (filters out food photos)
    try {
        const searchTerms = [cfg.term];
        if (cfg.wikiTerm) searchTerms.push(cfg.wikiTerm);
        for (const term of searchTerms) {
            const url =
                'https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch=' +
                encodeURIComponent(term + ' filetype:bitmap|filetype:svg') +
                '&srnamespace=6&srlimit=20';
            const r = await getJson(url);
            const results = (r?.query?.search || []).filter((s) => /\.(png|jpe?g|svg)$/i.test(s.title));
            for (const s of results) {
                if (
                    /poster|store|restaurant|interior|people|sign|food|dish|meal|lunch|breakfast|dinner|menu|shop|building|city/i.test(
                        s.title
                    )
                ) {
                    continue;
                }
                try {
                    const info = await commonsImageInfo(s.title);
                    if (info?.thumburl) {
                        await fetchAndSave(info.thumburl, dest);
                        console.log('  OK  [commons-search] ' + s.title);
                        return {
                            ok: true,
                            source: 'commons-search',
                            title: s.title,
                            bytes: fs.statSync(dest).size,
                        };
                    }
                } catch {
                    // try next candidate
                }
            }
        }
    } catch (e) {
        attempts.push('commons-search: ' + e.message);
    }

    // 5) Local SVG fallback (rasterised via the weserv.nl proxy)
    const svgSrc = path.join(LOGOS_DIR, cfg.id + '.svg');
    if (fs.existsSync(svgSrc)) {
        try {
            const bytes = await svgFileToPng(svgSrc, dest, 512);
            console.log('  OK  [local-fallback] converted ' + cfg.id + '.svg -> ' + cfg.id + '.png');
            return { ok: true, source: 'local-fallback', title: cfg.id + '.svg', bytes };
        } catch (e) {
            attempts.push('local-fallback: ' + e.message);
        }
    }

    console.log('  XX  FAILED  ' + attempts.join(' | '));
    return { ok: false, error: attempts.join(' | ') };
}

async function fetchMitWpuLogo() {
    console.log('\n=== MIT-WPU OFFICIAL LOGO ===');
    const dest = path.join(PUBLIC, 'mitwpu-logo.png');
    const title = 'File:MIT - WPU Logo.webp';
    try {
        const info = await commonsImageInfo(title);
        if (info?.thumburl) {
            await fetchAndSave(info.thumburl, dest);
            console.log('  OK  [commons-exact]  ' + title);
            return { ok: true, source: 'commons-exact', title, bytes: fs.statSync(dest).size };
        }
    } catch (e) {
        console.log('  --  commons-exact failed: ' + e.message);
    }
    try {
        const info = await commonsImageInfo(title);
        if (info?.url) {
            await fetchAndSave(info.url, dest);
            console.log('  OK  [commons-full]  ' + info.url.slice(0, 92));
            return { ok: true, source: 'commons-full', title, bytes: fs.statSync(dest).size };
        }
    } catch (e) {
        console.log('  --  full-image failed: ' + e.message);
    }
    console.log('  XX  FAILED');
    return { ok: false, error: 'all sources failed' };
}

/* ------------------------------------------------------------------ *
 * Source-file patching
 * ------------------------------------------------------------------ */

function updateMenuDataLogoUrls() {
    const content = fs.readFileSync(MENU_DATA, 'utf8');
    const updated = content.replace(/logoUrl: '\/logos\/([^'.]+)\.svg'/g, "logoUrl: '/logos/$1.png'");
    if (updated !== content) {
        fs.writeFileSync(MENU_DATA, updated);
        console.log('\nUpdated menuData.js: logoUrl .svg -> .png');
    }
}

function updateAppJsxMitWpuLogo() {
    const content = fs.readFileSync(APP_JSX, 'utf8');
    const updated = content.replace("src='/mit-wpu-emblem.webp'", "src='/mitwpu-logo.png'");
    if (updated !== content) {
        fs.writeFileSync(APP_JSX, updated);
        console.log('Updated App.jsx: MitWpuBrandLogo src -> /mitwpu-logo.png');
    }
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */

async function main() {
    console.log('Fetching real brand logos...');

    const mitWpuResult = await fetchMitWpuLogo();
    if (!mitWpuResult.ok) {
        console.error('FATAL: MIT-WPU logo fetch failed');
        process.exit(1);
    }

    const results = [];
    for (const cfg of OUTLET_CONFIG) {
        const result = await fetchLogo(cfg);
        results.push(Object.assign({}, cfg, result));
        await sleep(1200);
    }

    const okCount = results.filter((r) => r.ok).length;
    console.log('\n=== SUMMARY ===');
    console.log('MIT-WPU logo: ' + (mitWpuResult.ok ? 'OK' : 'FAILED'));
    console.log('Outlets: ' + okCount + '/' + OUTLET_CONFIG.length + ' OK');
    for (const r of results) {
        const status = r.ok ? 'OK  ' : 'FAIL';
        const size = r.bytes ? (r.bytes / 1024).toFixed(0) + 'KB' : '';
        console.log('  ' + status + '  ' + r.id + '  (' + (r.source || 'none') + ')  ' + size);
    }

    updateMenuDataLogoUrls();
    updateAppJsxMitWpuLogo();

    console.log('\nDone.');
}

main().catch((e) => {
    console.error('Fatal:', e);
    process.exit(1);
});
