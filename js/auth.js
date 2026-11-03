/* Accounts and login, stored in the browser (localStorage).

   This is a front-end prototype: there is no server, so anyone with the
   browser's developer tools can read or change this data. Real login needs a
   server that keeps the users list where the visitor cannot reach it.

   Storage layout
     sp-users    { "<email>": { name, email, algo, iter, salt, hash, created } }
     sp-session  { email }  in localStorage ("keep me logged in")
                            or sessionStorage (until the browser closes)
     study-planner-v1:<email>   that user's planner data (see script.js)

   Loaded in the <head> of every page, before any other script, so that
   protected pages can redirect before they draw anything. */
var Auth = (function () {
  'use strict';

  const USERS_KEY = 'sp-users';
  const SESSION_KEY = 'sp-session';
  const DATA_PREFIX = 'study-planner-v1';

  /* ---------- storage ---------- */
  function readUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch (e) { return {}; }
  }
  function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  // Emails are compared without case or spaces: "Ali@Mail.com " = "ali@mail.com".
  function normEmail(email) {
    return String(email).trim().toLowerCase();
  }

  /* ---------- password hashing ----------
     We never store the password itself, only a hash made with PBKDF2:
     SHA-256 repeated 600,000 times (OWASP's recommended count). The
     repetition makes each guess slow, so trying millions of passwords
     against a copied hash takes far longer than with a single SHA-256.
     The salt is random per user, so two people with the same password get
     different hashes. Uses the browser's built-in Web Crypto API. */
  const ALGO = 'pbkdf2-sha256';
  const ITERATIONS = 600000;
  function canHash() {
    return !!(window.crypto && window.crypto.subtle);
  }
  function toHex(buffer) {
    return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, '0')).join('');
  }
  function randomSalt() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return toHex(bytes);
  }
  async function hashPassword(password, salt, iterations) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode(salt), iterations: iterations },
      keyMaterial, 256);
    return toHex(bits);
  }
  // Accounts made before the switch to PBKDF2 used one plain SHA-256 round.
  // Only used to check those old passwords once, then they are upgraded.
  async function legacyHash(password, salt) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + password));
    return toHex(digest);
  }
  async function checkPassword(user, password) {
    if (user.algo === ALGO) return (await hashPassword(password, user.salt, user.iter)) === user.hash;
    return (await legacyHash(password, user.salt)) === user.hash;
  }
  // Builds the stored password fields for a new or upgraded account.
  async function passwordRecord(password) {
    const salt = randomSalt();
    return { algo: ALGO, iter: ITERATIONS, salt: salt, hash: await hashPassword(password, salt, ITERATIONS) };
  }

  /* ---------- session ---------- */
  function startSession(email, remember) {
    // Clear any older session first, so only one account is ever logged in.
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    const store = remember ? localStorage : sessionStorage;
    store.setItem(SESSION_KEY, JSON.stringify({ email: email }));
  }
  function currentUser() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const email = JSON.parse(raw).email;
      const user = readUsers()[email];
      return user ? { name: user.name, email: user.email } : null;
    } catch (e) {
      return null;
    }
  }
  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    location.href = 'login.html';
  }

  /* ---------- register and login ----------
     Both return { ok: true } or { ok: false, field, error } so the page can
     show the error next to the right input. */
  async function register(name, email, password) {
    if (!canHash()) return { ok: false, field: 'form', error: noCryptoMessage() };
    email = normEmail(email);
    const users = readUsers();
    if (users[email]) return { ok: false, field: 'email', error: 'An account with this email already exists. Log in instead.' };

    const pw = await passwordRecord(password);
    const firstUser = Object.keys(users).length === 0;
    users[email] = Object.assign({ name: name.trim(), email: email, created: new Date().toISOString() }, pw);
    writeUsers(users);

    // Planner data saved before accounts existed is given to the first
    // account, so nothing already entered is lost.
    const legacy = localStorage.getItem(DATA_PREFIX);
    if (firstUser && legacy) {
      localStorage.setItem(dataKey(email), legacy);
      localStorage.removeItem(DATA_PREFIX);
    }

    // Logged in until the browser closes, so a shared computer does not stay
    // logged in. "Keep me logged in" on the login page makes it last longer.
    startSession(email, false);
    return { ok: true };
  }

  async function login(email, password, remember) {
    if (!canHash()) return { ok: false, field: 'form', error: noCryptoMessage() };
    email = normEmail(email);
    const user = readUsers()[email];
    // Same message whether the email or the password is wrong, so the form
    // does not reveal which emails have accounts.
    const fail = { ok: false, field: 'form', error: 'Email or password is incorrect. Check them and try again, or create an account.' };
    if (!user) return fail;
    if (!(await checkPassword(user, password))) return fail;
    // Old single-round hash? Replace it with a PBKDF2 one now that we have
    // the correct password in hand.
    if (user.algo !== ALGO) {
      const users = readUsers();
      Object.assign(users[email], await passwordRecord(password));
      writeUsers(users);
    }
    startSession(email, remember);
    return { ok: true };
  }

  function noCryptoMessage() {
    return 'This browser cannot run the secure login here. Open the site from GitHub Pages or VS Code Live Server.';
  }

  /* ---------- page protection ----------
     Called at the top of each planner page. Sends logged-out visitors to the
     login page and remembers where they were going. */
  function requireLogin() {
    if (currentUser()) return true;
    const page = location.pathname.split('/').pop() || 'index.html';
    location.replace('login.html?next=' + encodeURIComponent(page));
    return false;
  }
  // Where to go after logging in. Only plain page names like "tasks.html"
  // are accepted, so a link cannot send people to another website.
  function nextPage() {
    const next = new URLSearchParams(location.search).get('next');
    return next && /^[a-z]+\.html$/.test(next) ? next : 'index.html';
  }
  // Login and register pages: if already logged in, skip straight to the app.
  function redirectIfLoggedIn() {
    if (currentUser()) location.replace(nextPage());
  }

  // localStorage key for one user's planner data.
  function dataKey(email) {
    return DATA_PREFIX + ':' + normEmail(email || (currentUser() || {}).email || 'guest');
  }

  /* ---------- account bar ----------
     Fills <div id="account"> in the page header with the user's name and a
     Log out button, or a Log in link when nobody is logged in. */
  // Fills every account slot on the page (marked data-account): the sidebar
  // on computers and the "More" menu on phones.
  function renderAccount() {
    const user = currentUser();
    document.querySelectorAll('[data-account]').forEach(function (box) {
      box.replaceChildren();
      if (user) {
        const who = document.createElement('span');
        who.className = 'account-name';
        who.textContent = 'Logged in as ' + user.name;
        const out = document.createElement('button');
        out.type = 'button';
        out.className = 'link-btn';
        out.textContent = 'Log out';
        out.addEventListener('click', logout);
        box.append(who, out);
      } else {
        const a = document.createElement('a');
        a.href = 'login.html';
        a.textContent = 'Log in';
        box.append(a);
      }
    });
  }
  document.addEventListener('DOMContentLoaded', renderAccount);

  /* Each page says what kind it is on its <html> tag, which already exists
     when this file runs in the <head>:
       data-auth="required"  planner pages: send logged-out visitors to login
       data-auth="guest"     login and register: skip them if logged in
       (no attribute)        public pages, like contact
     This runs here, not in a <script> written into each page, so the
     Content Security Policy can forbid inline scripts completely. */
  const pageMode = document.documentElement.getAttribute('data-auth');
  if (pageMode === 'required') requireLogin();
  else if (pageMode === 'guest') redirectIfLoggedIn();

  return {
    register: register,
    login: login,
    logout: logout,
    currentUser: currentUser,
    requireLogin: requireLogin,
    redirectIfLoggedIn: redirectIfLoggedIn,
    nextPage: nextPage,
    dataKey: dataKey,
    normEmail: normEmail
  };
})();
