/* The app's data (state): creating it, the demo data for new accounts,
   loading from and saving to localStorage, plus small shared helpers that
   read it (subject chips, form fields, weekly goal bars).
   Needs: auth.js, constants.js, utils.js. */
'use strict';

// Each account has its own saved planner, e.g. "study-planner-v1:ali@mail.com".
const KEY = Auth.dataKey();
/* ---------- state ---------- */
const emptyState = () => ({
  subjects: [], tasks: [], blocks: [], exams: [], sessions: [],
  plans: [], custom: [], cards: [], reviewLog: {},
  settings: { focus: 25, short: 5, long: 15 }, demo: false
});

function splitTopic(s) {
  const i = s.indexOf(' - ');
  return i < 0 ? [s, ''] : [s.slice(0, i), s.slice(i + 3)];
}
function makePlan(src, name, level, days, hours, start) {
  const topics = src[level].slice();
  const n = topics.length;
  const used = Math.min(days, n);
  const base = Math.floor(n / used), extra = n % used;
  const data = [];
  let idx = 0;
  for (let day = 1; day <= used; day++) {
    const cnt = base + (day <= extra ? 1 : 0);
    const per = Math.round((hours / cnt) * 100) / 100;
    const list = [];
    for (let i = 0; i < cnt; i++) list.push({ id: uid(), name: topics[idx++], done: false, doneAt: null, hours: per });
    data.push({ day, topics: list });
  }
  return { id: uid(), name: name + ' · ' + level, level, days: used, hours, start, data };
}
function seedExtras(s) {
  const t = new Date(); t.setHours(0, 0, 0, 0);
  const d = (n) => key(addDays(t, n));
  const plan = makePlan(BUILTIN.DSA, 'DSA', 'Beginner', 3, 2, d(-1));
  plan.data[0].topics.forEach((tp) => { tp.done = true; tp.doneAt = d(-1); });
  s.plans.push(plan);
  const C = (topic, q, a, box, due) => ({ id: uid(), planId: plan.id, topic, q, a, box, due });
  s.cards.push(
    C('Big O Notation', 'What is the time complexity of binary search?', 'O(log n). Each step halves the range still to search.', 1, d(0)),
    C('Stacks & Queues', 'What is the difference between a stack and a queue?', 'A stack is last in, first out. A queue is first in, first out.', 1, d(0)),
    C('Hash Tables', 'How does chaining handle hash collisions?', 'Each bucket holds a list of the entries that hash to the same index.', 2, d(0)),
    C('Hash Tables', 'What lookup time does a hash table give on average?', 'O(1) on average, degrading toward O(n) when many keys collide.', 3, d(3)));
}

function seed() {
  const t = new Date(); t.setHours(0, 0, 0, 0);
  const d = (n) => key(addDays(t, n));
  const s = emptyState();
  s.demo = true;
  s.subjects = [
    { id: 's1', name: 'Calculus II', color: 0, goal: 5 },
    { id: 's2', name: 'Data Structures', color: 1, goal: 6 },
    { id: 's3', name: 'Physics I', color: 2, goal: 4 },
    { id: 's4', name: 'Technical Writing', color: 3, goal: 2 }
  ];
  s.tasks = [
    { id: uid(), title: 'Problem set 6: series convergence', subject: 's1', due: d(1), pri: 'high', est: 90, done: false, doneAt: null },
    { id: uid(), title: 'Implement a linked list with unit tests', subject: 's2', due: d(2), pri: 'high', est: 120, done: false, doneAt: null },
    { id: uid(), title: 'Read chapter 7: Gauss’s law', subject: 's3', due: d(3), pri: 'med', est: 45, done: false, doneAt: null },
    { id: uid(), title: 'Draft lab report outline', subject: 's4', due: d(0), pri: 'low', est: 30, done: false, doneAt: null },
    { id: uid(), title: 'Review lecture notes on binary trees', subject: 's2', due: d(-1), pri: 'med', est: 40, done: false, doneAt: null },
    { id: uid(), title: 'Quiz prep: integration techniques', subject: 's1', due: d(5), pri: 'med', est: 60, done: false, doneAt: null },
    { id: uid(), title: 'Submit reading response', subject: 's4', due: d(-2), pri: 'low', est: 25, done: true, doneAt: d(-2) }
  ];
  const B = (day, a, b, sub, label) => ({ id: uid(), day, start: a, end: b, subject: sub, label });
  s.blocks = [
    B(0, '09:00', '10:30', 's1', 'Lecture'), B(0, '11:00', '12:30', 's2', 'Lecture'),
    B(1, '10:00', '11:30', 's3', 'Lecture'), B(1, '14:00', '16:00', 's2', 'Lab'),
    B(2, '09:00', '10:30', 's1', 'Lecture'), B(2, '17:00', '19:00', 's1', 'Study: problem set'),
    B(3, '11:00', '12:30', 's4', 'Seminar'), B(3, '16:00', '17:30', 's3', 'Study: problem set'),
    B(4, '10:00', '11:30', 's2', 'Study: coding'), B(4, '18:00', '19:00', 's3', 'Review'),
    B(6, '10:00', '12:00', 's2', 'Project time')
  ];
  s.exams = [
    { id: uid(), title: 'Quiz 2', subject: 's2', date: d(7) },
    { id: uid(), title: 'Midterm', subject: 's1', date: d(12) },
    { id: uid(), title: 'Midterm', subject: 's3', date: d(19) }
  ];
  const S = (n, sub, min) => ({ id: uid(), subject: sub, min, date: d(n) });
  s.sessions = [S(0, 's2', 25), S(-1, 's1', 50), S(-1, 's2', 25), S(-2, 's3', 50), S(-3, 's1', 75), S(-4, 's2', 50), S(-5, 's4', 25)];
  seedExtras(s);
  return s;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s && Array.isArray(s.subjects)) {
        s.settings = Object.assign({ focus: 25, short: 5, long: 15 }, s.settings || {});
        const fresh = !Array.isArray(s.plans);
        ['tasks', 'blocks', 'exams', 'sessions', 'plans', 'custom', 'cards'].forEach((k) => { if (!Array.isArray(s[k])) s[k] = []; });
        if (!s.reviewLog || typeof s.reviewLog !== 'object') s.reviewLog = {};
        if (fresh && s.demo) seedExtras(s);
        return s;
      }
    }
  } catch (e) { /* storage unavailable */ }
  return seed();
}
// Saving can fail (storage full, private browsing, or storage blocked).
// Tell the user instead of failing silently, so they know changes may be lost.
// The warning goes in the footer, not a toast, because the caller's own
// toast ("Task added") would replace it straight away.
function save() {
  const foot = $('.foot');
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    foot.textContent = 'Your plan is saved in this browser only.';
    foot.classList.remove('foot-error');
  } catch (e) {
    foot.textContent = 'Could not save. Your changes will be lost when you close this page.';
    foot.classList.add('foot-error');
    foot.setAttribute('role', 'alert');
  }
}

let state = load();
let view = 'overview';
let taskFilter = 'open';
let focusSubject = state.subjects[0] ? state.subjects[0].id : '';

const subj = (id) => state.subjects.find((s) => s.id === id) || null;
function chip(id) {
  const s = subj(id);
  if (!s) return h('span', { class: 'chip chip-none' }, h('i', { class: 'dot' }), 'No subject');
  return h('span', { class: 'chip', style: '--c:var(--s' + s.color + ')' }, h('i', { class: 'dot' }), s.name);
}
function field(label, id, input, cls) {
  return h('div', { class: 'field' + (cls ? ' ' + cls : '') }, h('label', { for: id }, label), input);
}
function subjectSelect(id, val, withNone) {
  const s = h('select', { id });
  if (withNone) s.append(h('option', { value: '' }, 'No subject'));
  state.subjects.forEach((x) => s.append(h('option', { value: x.id }, x.name)));
  if (val !== undefined) s.value = val;
  return s;
}
function weekMinutes(subjectId) {
  return state.sessions
    .filter((s) => inWeek(s.date) && (subjectId === undefined || s.subject === subjectId))
    .reduce((a, s) => a + s.min, 0);
}
function goalBar(s) {
  const mins = weekMinutes(s.id);
  const goal = s.goal * 60;
  const pct = goal ? Math.min(100, (mins / goal) * 100) : 0;
  return h('div', { class: 'goal' },
    h('div', { class: 'goal-top' }, chip(s.id), h('span', { class: 'mono' }, fmtMin(mins) + ' of ' + fmtMin(goal))),
    h('div', { class: 'track', role: 'img', 'aria-label': s.name + ': ' + Math.round(pct) + ' percent of weekly goal', style: '--c:var(--s' + s.color + ')' },
      h('div', { class: 'fill', style: 'width:' + pct + '%' })));
}
