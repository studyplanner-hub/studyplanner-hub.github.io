/* General helpers: date keys ("2026-11-03"), date and time formatting,
   h() for building HTML elements, toast messages, delete with Undo, and the
   two-click confirm button. Needs: constants.js. */
'use strict';

/* ---------- helpers ---------- */
const $ = (s) => document.querySelector(s);
const pad = (n) => String(n).padStart(2, '0');
const key = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const parseKey = (k) => { const p = k.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const uid = () => Math.random().toString(36).slice(2, 9);
const todayKey = () => key(new Date());
const weekStart = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return addDays(d, -d.getDay()); };
const inWeek = (k) => k >= key(weekStart()) && k <= key(addDays(weekStart(), 6));
const dayDiff = (k) => Math.round((parseKey(k) - parseKey(todayKey())) / 86400000);
const toMin = (s) => { const p = s.split(':').map(Number); return p[0] * 60 + p[1]; };

function fmtMin(m) {
  m = Math.round(m);
  if (m < 60) return m + 'm';
  const hh = Math.floor(m / 60), mm = m % 60;
  return mm ? hh + 'h ' + mm + 'm' : hh + 'h';
}
function fmtDate(k) {
  return parseKey(k).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
function fmtDue(k) {
  const d = dayDiff(k);
  if (d === 0) return 'Today';
  if (d === 1) return 'Tomorrow';
  if (d === -1) return 'Yesterday';
  if (d < 0) return (-d) + ' days overdue';
  if (d < 7) return DAYS_LONG[parseKey(k).getDay()];
  return fmtDate(k);
}
// fmtDue for use in the middle of a sentence ("next review is tomorrow").
// Only the relative words are lowercased; day names and months keep their capitals.
function fmtDueInline(k) {
  const s = fmtDue(k);
  return (s === 'Today' || s === 'Tomorrow' || s === 'Yesterday') ? s.toLowerCase() : s;
}

function add(e, k) {
  if (k == null || k === false) return;
  if (Array.isArray(k)) k.forEach((x) => add(e, x));
  else e.append(k instanceof Node ? k : document.createTextNode(String(k)));
}
function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  if (attrs) {
    for (const k of Object.keys(attrs)) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'style') e.style.cssText = v;
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
      else if (k === 'value' || k === 'checked' || k === 'disabled') e[k] = v;
      else e.setAttribute(k, v === true ? '' : v);
    }
  }
  kids.forEach((k) => add(e, k));
  return e;
}

let toastTimer = null;
// action (optional): { label, run } adds a button, e.g. Undo. Toasts with an
// action stay up longer so there is time to reach the button.
function toast(msg, action) {
  const t = $('#toast');
  const box = t.firstElementChild;
  box.textContent = msg;
  if (action) {
    box.append(h('button', {
      type: 'button', class: 'toast-act',
      onclick: () => { clearTimeout(toastTimer); t.classList.remove('show'); action.run(); }
    }, action.label));
  }
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), action ? 6000 : 2400);
}

// Delete an item from one of the state lists, with an Undo that puts it
// back in the same position.
function removeWithUndo(listKey, item, what) {
  const i = state[listKey].indexOf(item);
  if (i < 0) return;
  state[listKey].splice(i, 1);
  save(); render();
  toast(what + ' deleted', {
    label: 'Undo',
    run: () => {
      const list = state[listKey];
      list.splice(Math.min(i, list.length), 0, item);
      save(); render(); toast(what + ' restored');
    }
  });
}

function confirmBtn(label, fn, cls) {
  const b = h('button', { type: 'button', class: cls || 'btn btn-ghost' }, label);
  let t = null;
  b.addEventListener('click', () => {
    if (b.dataset.armed) { clearTimeout(t); fn(); return; }
    b.dataset.armed = '1';
    b.textContent = 'Click again to confirm';
    b.classList.add('armed');
    t = setTimeout(() => { delete b.dataset.armed; b.textContent = label; b.classList.remove('armed'); }, 3500);
  });
  return b;
}

// Shows a planner form's error message and points the user at the field to
// fix: the field gets a red outline (aria-invalid), the message is linked to
// it so screen readers read it out, and focus moves there. The outline goes
// away as soon as the user changes the field.
function fieldError(msg, input, text) {
  const form = msg.closest('form');
  if (form) form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  msg.textContent = text;
  if (!input) return;
  if (!msg.id) msg.id = 'msg-' + uid();
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', msg.id);
  input.focus();
  input.addEventListener('input', () => input.removeAttribute('aria-invalid'), { once: true });
}
