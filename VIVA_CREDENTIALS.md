# 🎓 MIT-WPU CampusBites — Viva Presentation Reference Sheet
**Confidential Academic & Operational Reference Document for DBMS & Project Viva Evaluation**

---

## 1. Master DBMS & Admin Executive Portal

| Field | Configuration Value | Operational Notes |
| :--- | :--- | :--- |
| **System Role** | Master Database Administrator (DBMS Admin) | Central control tower for campus food court operations |
| **Portal Name** | 4. DBMS & Admin Control Tower | Accessible via navigation header toggle button |
| **Login Email** | `admin@mitwpu.edu.in` | Verified MIT-WPU administrative credentials |
| **Password** | `Admin@123` | High-security administrative secret |
| **Access Scope** | Master Executive Visibility & Control | All 25 brand outlets, live rider fleet telemetry, revenue KPIs, order management & cancellation |
| **Database Engine** | MongoDB Atlas Cluster | Database: `campusbites` \| Collections: `customers`, `orders`, `otp_verifications`, `menu_items` |
| **API Server** | Node.js / Express REST API | Running locally on `http://localhost:5000/api` |

---

## 2. Kitchen Display System (KDS) Credentials — Unique Passwords per Outlet

Each partner restaurant outlet in the MIT-WPU food court has its own isolated kitchen terminal with an exclusive unique password. Stalls view and manage only their own order queues and menu items. The Master Kitchen Supervisor has unified multi-stall visibility.

| # | Restaurant Brand Outlet | Outlet ID | Authorized Login Email | Unique Password | Kitchen Isolation & Access Scope |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **0** | **Master Kitchen Supervisor** | `all` | `kds@mitwpu.edu.in` | `KdsMaster@2026` | **Unified Master KDS (Cross-Outlet Monitoring & Dispatch)** |
| 1 | Domino's Pizza | `dominos` | `dominos@mitwpu.edu.in` | `Domino@Pizza91` | Isolated Domino's Kitchen Terminal, Order Queue & Menu CRUD |
| 2 | McDonald's | `mcdonalds` | `mcdonalds@mitwpu.edu.in` | `McD@Burger82` | Isolated McDonald's Kitchen Terminal, Order Queue & Menu CRUD |
| 3 | KFC | `kfc` | `kfc@mitwpu.edu.in` | `Kfc@Crispy73` | Isolated KFC Kitchen Terminal, Order Queue & Menu CRUD |
| 4 | Burger King | `burger_king` | `burgerking@mitwpu.edu.in` | `BK@Whopper64` | Isolated Burger King Kitchen Terminal, Order Queue & Menu CRUD |
| 5 | Subway | `subway` | `subway@mitwpu.edu.in` | `Sub@Fresh55` | Isolated Subway Kitchen Terminal, Order Queue & Menu CRUD |
| 6 | Starbucks | `starbucks` | `starbucks@mitwpu.edu.in` | `Star@Brew46` | Isolated Starbucks Kitchen Terminal, Order Queue & Menu CRUD |
| 7 | Taco Bell | `taco_bell` | `tacobell@mitwpu.edu.in` | `Taco@Crunch37` | Isolated Taco Bell Kitchen Terminal, Order Queue & Menu CRUD |
| 8 | Haldiram's | `haldirams` | `haldirams@mitwpu.edu.in` | `Haldi@Sweets28` | Isolated Haldiram's Kitchen Terminal, Order Queue & Menu CRUD |
| 9 | Wow! Momo | `wow_momo` | `wowmomo@mitwpu.edu.in` | `Momo@Steam19` | Isolated Wow! Momo Kitchen Terminal, Order Queue & Menu CRUD |
| 10 | Chaayos | `chaayos` | `chaayos@mitwpu.edu.in` | `Chai@Kadak90` | Isolated Chaayos Kitchen Terminal, Order Queue & Menu CRUD |
| 11 | Baskin Robbins | `baskin_robbins` | `baskinrobbins@mitwpu.edu.in` | `Baskin@Scoop81` | Isolated Baskin Robbins Kitchen Terminal, Order Queue & Menu CRUD |
| 12 | Behrouz Biryani | `behrouz_biryani` | `behrouzbiryani@mitwpu.edu.in` | `Behrouz@Dum72` | Isolated Behrouz Biryani Kitchen Terminal, Order Queue & Menu CRUD |
| 13 | Madras Tiffin | `madras_cafe` | `madrastiffin@mitwpu.edu.in` | `Madras@Dosa63` | Isolated Madras Tiffin Kitchen Terminal, Order Queue & Menu CRUD |
| 14 | Belgian Waffle | `belgian_waffle` | `belgianwaffle@mitwpu.edu.in` | `Waffle@Warm54` | Isolated Belgian Waffle Kitchen Terminal, Order Queue & Menu CRUD |
| 15 | Pizza Hut | `pizza_hut` | `pizzahut@mitwpu.edu.in` | `Pizza@Crust45` | Isolated Pizza Hut Kitchen Terminal, Order Queue & Menu CRUD |
| 16 | Natural's Ice Cream | `naturals` | `naturals@mitwpu.edu.in` | `Nature@Fruit36` | Isolated Natural's Kitchen Terminal, Order Queue & Menu CRUD |
| 17 | Faasos Wraps | `faasos` | `faasos@mitwpu.edu.in` | `Faasos@Roll27` | Isolated Faasos Kitchen Terminal, Order Queue & Menu CRUD |
| 18 | Keventers | `keventers` | `keventers@mitwpu.edu.in` | `Kevent@Shake18` | Isolated Keventers Kitchen Terminal, Order Queue & Menu CRUD |
| 19 | California Burrito | `california_burrito` | `californiaburrito@mitwpu.edu.in` | `Cal@Burrito99` | Isolated California Burrito Kitchen Terminal, Order Queue & Menu CRUD |
| 20 | Rolls Mania | `rolls_mania` | `rollsmania@mitwpu.edu.in` | `Rolls@Mania88` | Isolated Rolls Mania Kitchen Terminal, Order Queue & Menu CRUD |
| 21 | Mainland China Bowl | `mainland_china` | `mainlandchina@mitwpu.edu.in` | `China@Wok77` | Isolated Mainland China Kitchen Terminal, Order Queue & Menu CRUD |
| 22 | Dunkin' | `dunkin` | `dunkin@mitwpu.edu.in` | `Dunkin@Donut66` | Isolated Dunkin' Kitchen Terminal, Order Queue & Menu CRUD |
| 23 | Barbeque Nation Express | `bbq_nation` | `barbequenation@mitwpu.edu.in` | `BBQ@Grill55` | Isolated BBQ Nation Kitchen Terminal, Order Queue & Menu CRUD |
| 24 | Amul Ice Cream | `amul_ice` | `amul@mitwpu.edu.in` | `Amul@Dairy44` | Isolated Amul Ice Cream Kitchen Terminal, Order Queue & Menu CRUD |
| 25 | Juice Junction | `juice_junction` | `juicejunction@mitwpu.edu.in` | `Juice@Fresh33` | Isolated Juice Junction Kitchen Terminal, Order Queue & Menu CRUD |

---

## 3. Campus Courier Fleet — Unique Rider Dispatch Credentials

The MIT-WPU smart courier fleet manages autonomous inter-building meal transit across Saraswati, Chanakya, Shivaji, Ramanujan, and Peace Dome academic blocks.

| # | Rider Name | Vehicle Assigned | Phone Number | Login Email | Unique Password | Dispatch Role & Rating |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Suresh Kumar | `MH-12-AB-4567` (EV Bike) | `+91-9765432100` | `rider1@mitwpu.edu.in` *(or `rider@mitwpu.edu.in`)* | `Rider@Suresh1` | Senior Campus Courier (Rating: 4.9 ★) |
| **2** | Ramesh Shinde | `MH-12-CD-8901` (EV Scooter) | `+91-9822334455` | `rider2@mitwpu.edu.in` | `Rider@Ramesh2` | Active Courier (Rating: 4.8 ★) |
| **3** | Amit Patil | `MH-12-EF-2345` (EV Bike) | `+91-9977665544` | `rider3@mitwpu.edu.in` | `Rider@Amit3` | Express Delivery Specialist (Rating: 4.9 ★) |
| **4** | Vikas Deshmukh | `MH-12-GH-6789` (EV Scooter) | `+91-9123456780` | `rider4@mitwpu.edu.in` | `Rider@Vikas4` | North Campus Runner (Rating: 4.7 ★) |
| **5** | Rahul Kulkarni | `MH-12-JK-0123` (EV Bike) | `+91-9345678901` | `rider5@mitwpu.edu.in` | `Rider@Rahul5` | Hostels & Labs Dispatcher (Rating: 4.8 ★) |
| **6** | Sachin More | `MH-12-LM-4567` (EV Scooter) | `+91-9567890123` | `rider6@mitwpu.edu.in` | `Rider@Sachin6` | Evening Transit Lead (Rating: 4.9 ★) |

---

## 4. Strict Authentication Gate Protocol

| Step # | User Action | System State | Enforced Response | Expected Outcome |
| :-: | :--- | :--- | :--- | :--- |
| **G-1** | Guest browses catalog or searches dishes | `user === null` | Allows browsing, filtering, search, language toggle, and theme switch | Complete access to public food court catalog |
| **G-2** | Guest clicks `+ ADD` on any food card | `user === null` | Intercepts click; blocks cart modification; triggers auth modal | Pop-up notification: *"Please sign in to add items to your tray"* |
| **G-3** | Guest clicks floating tray checkout button | `user === null` | Blocks navigation; forces authentication modal | Authentication modal appears with student login view |
| **G-4** | Student completes login or sign-up | `user !== null` | Stores JWT token & customer session in localStorage | Tray unlocked; items persist across sessions |

---

## 5. Password Security Criteria & Validation Protocol

All customer and staff passwords must satisfy 5 strict regex validation rules before being accepted by the system:

| Rule # | Requirement Criteria | Minimum Value / Character Set | Regex Test Pattern | Validation UI Indicator |
| :-: | :--- | :--- | :--- | :--- |
| **R-1** | Minimum Length | At least 8 characters | `pass.length >= 8` | Green checkmark pill when satisfied |
| **R-2** | Uppercase Alphabet | At least 1 character (`A-Z`) | `/[A-Z]/.test(pass)` | Green checkmark pill when satisfied |
| **R-3** | Lowercase Alphabet | At least 1 character (`a-z`) | `/[a-z]/.test(pass)` | Green checkmark pill when satisfied |
| **R-4** | Numeric Digit | At least 1 digit (`0-9`) | `/[0-9]/.test(pass)` | Green checkmark pill when satisfied |
| **R-5** | Special Symbol | At least 1 special symbol | `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)` | Green checkmark pill when satisfied |

---

## 6. Customer Sign-Up & Email OTP Verification Testing Protocol

| Step # | Testing Phase | User Input & Action | System Processing & Validation | Expected Result |
| :-: | :--- | :--- | :--- | :--- |
| **SU-1** | Initiation | Click **Sign In** → Switch to **Create Account** tab | Opens registration form with Name, Email, Password fields | Sign-up form displays with real-time password criteria checklist |
| **SU-2** | Form Entry | Enter Full Name, `@mitwpu.edu.in` email, and strong password | Validates MIT-WPU academic domain and 5 password security rules | **Send Verification OTP** button activates |
| **SU-3** | OTP Dispatch | Click **Send Verification OTP** | Server generates cryptographically random 6-digit OTP, stores with 10m TTL in `otp_verifications` | OTP sent via SMTP transporter (also displayed in dev toast / server log) |
| **SU-4** | OTP Input | Enter 6-digit OTP into input field | Client checks OTP length; enables verification trigger | **Verify OTP & Activate Account** button unlocks |
| **SU-5** | Verification & Registration | Click **Verify OTP & Activate Account** | Backend verifies OTP hash, hashes password with bcrypt, inserts document into MongoDB `customers` | Account activated, user logged in, welcome toast shown, cart unlocked |

---

## 7. Customer Forgot Password OTP Testing Protocol

| Step # | Testing Phase | User Input & Action | System Processing & Validation | Expected Result |
| :-: | :--- | :--- | :--- | :--- |
| **FP-1** | Initiation | In Sign In modal, click **"Forgot Password?"** link | Transitions auth modal into Password Reset workflow | Dedicated forgot password card renders with email input field |
| **FP-2** | Email Verification | Enter registered email address & click **Send Reset OTP** | Queries MongoDB `customers` collection to confirm registered account; dispatches 6-digit reset OTP | Success toast: *"Reset OTP sent to your registered email"*; form advances to Step 2 |
| **FP-3** | OTP & New Password | Enter 6-digit OTP + New Password + Confirm New Password | Validates 6-digit code, ensures passwords match, validates 5 security rules | Real-time security checklist turns green; activates reset button |
| **FP-4** | Password Update | Click **Reset Password & Sign In** | API `/api/auth/reset-password` updates `password_hash` in MongoDB, removes used OTP, issues session token | Success toast: *"Password reset successfully!"*; user logged in immediately |

---

## 8. Active Promo & Voucher Codes Table

| Promo Code | Discount % | Max Cap | Minimum Order Value | Eligible Outlets / Applicability |
| :--- | :-: | :-: | :-: | :--- |
| `CAMPUS50` | **50% OFF** | ₹100 | ₹199 | MIT-WPU Smart Campus Welcome Perk (Valid across all 25 outlets) |
| `DOMINOS30` | **30% OFF** | ₹120 | ₹249 | Domino's Pizza & Garlic Bread Exclusive Orders |
| `BIRYANI100` | **35% OFF** | ₹100 | ₹299 | Behrouz Biryani & Barbeque Nation Kebabs Platters |
| `WAFFLE25` | **25% OFF** | ₹80 | ₹150 | Belgian Waffle, Keventers & Baskin Robbins Treats |
| `FREEDEL` | **100% OFF Delivery** | ₹20 | ₹149 | Campus-wide Free Delivery perk across all University Blocks |

---

## 9. Team Members

| Student Contributor Name | University Email Address | LinkedIn Profile Link |
| :--- | :--- | :--- |
| **Abhishek Sahoo** | `abhishek.sahoo@mitwpu.edu.in` | [linkedin.com/in/abhishek-sahoo-7b7209312](https://www.linkedin.com/in/abhishek-sahoo-7b7209312) |
| **Pratik Kumar Sahu** | `pratikkumar.sahu@mitwpu.edu.in` | [linkedin.com/in/pratikkumarsahu0157](https://www.linkedin.com/in/pratikkumarsahu0157/) |
| **Shreyas Chakraborty** | `shreyas.chakraborty@mitwpu.edu.in` | [linkedin.com/in/shreyas-chakraborty-875a743a5](https://www.linkedin.com/in/shreyas-chakraborty-875a743a5/) |
| **Siddhi Garud** | `siddhi.garud@mitwpu.edu.in` | [linkedin.com/in/siddhi-garud-945a31344](https://www.linkedin.com/in/siddhi-garud-945a31344/) |
