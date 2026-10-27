/**
 * Shared HTTP helpers for the CampusBites asset-fetching scripts.
 * All outbound requests send a descriptive User-Agent, which Wikimedia's
 * API policy requires (requests without one are answered with HTTP 403).
 */

import https from 'https';
import http from 'http';
import { URL } from 'url';

export const USER_AGENT =
    'CampusBitesAssetBot/1.0 (https://github.com/campusbites; student project @ MIT-WPU) node-fetch';

/**
 * Perform a GET request and return { status, headers, body:Buffer }.
 * Never throws on non-2xx so callers can branch on the status code.
 */
export function request(url, { timeout = 30000, headers = {} } = {}) {
    return new Promise((resolve, reject) => {
        let parsed;
        try {
            parsed = new URL(url);
        } catch (e) {
            reject(new Error(`Invalid URL: ${url}`));
            return;
        }
        const lib = parsed.protocol === 'http:' ? http : https;
        const req = lib.get(
            url,
            {
                headers: {
                    'User-Agent': USER_AGENT,
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    ...headers,
                },
            },
            (res) => {
                const chunks = [];
                res.on('data', (c) => chunks.push(c));
                res.on('end', () => {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: Buffer.concat(chunks),
                    });
                });
            }
        );
        req.on('error', reject);
        req.setTimeout(timeout, () => {
            req.destroy();
            reject(new Error(`Request timeout: ${url}`));
        });
    });
}

/**
 * GET a URL, following up to `maxRedirects` 301/302/307/308 responses.
 * Returns { status, headers, body, url } where `url` is the final URL.
 */
export async function requestFollow(url, { timeout = 30000, headers = {}, maxRedirects = 6 } = {}) {
    let current = url;
    for (let hop = 0; hop <= maxRedirects; hop++) {
        const res = await request(current, { timeout, headers });
        const loc = res.headers['location'];
        const isRedirect = [301, 302, 303, 307, 308].includes(res.status) && loc;
        if (!isRedirect) {
            res.url = current;
            return res;
        }
        current = new URL(loc, current).toString();
    }
    throw new Error('Too many redirects for ' + url);
}

/** GET and parse JSON. Returns null on any failure. */
export async function getJson(url, options = {}) {
    try {
        const res = await request(url, options);
        if (res.status !== 200) return null;
        return JSON.parse(res.body.toString('utf8'));
    } catch {
        return null;
    }
}

/**
 * HEAD/GET probe that confirms the URL serves an image.
 * Returns { ok, status, contentType, bytes }.
 */
export async function verifyImage(url, { timeout = 20000, minBytes = 1024 } = {}) {
    try {
        const res = await request(url, { timeout, headers: { Range: 'bytes=0-2047' } });
        const contentType = (res.headers['content-type'] || '').split(';')[0].trim();
        const isImage = contentType.startsWith('image/');
        // A 206 Partial Content is still a successful image response.
        const statusOk = res.status === 200 || res.status === 206;
        const { size } = res.headers;
        const bytes = size && !Number.isNaN(Number(size)) ? Number(size) : res.body.length;
        return {
            ok: statusOk && isImage && bytes >= minBytes,
            status: res.status,
            contentType,
            bytes,
        };
    } catch (e) {
        return { ok: false, status: 0, contentType: '', bytes: 0, error: e.message };
    }
}

/** Download a binary asset to disk. */
export async function download(url, destPath, { timeout = 45000, headers = {} } = {}) {
    const res = await request(url, { timeout, headers });
    if (res.status !== 200 && res.status !== 206) {
        throw new Error(`HTTP ${res.status} for ${url}`);
    }
    const contentType = (res.headers['content-type'] || '').split(';')[0].trim();
    if (!contentType.startsWith('image/')) {
        throw new Error(`Not an image (${contentType}) for ${url}`);
    }
    if (res.body.length < 512) {
        throw new Error(`Response too small (${res.body.length}B) for ${url}`);
    }
    const { writeFileSync, mkdirSync } = await import('fs');
    const { dirname } = await import('path');
    mkdirSync(dirname(destPath), { recursive: true });
    writeFileSync(destPath, res.body);
    return { bytes: res.body.length, contentType };
}

export function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
