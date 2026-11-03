/* Study streaks: counts consecutive days with study activity.
   Needs: state.js. */
'use strict';

/* ---------- streaks ---------- */
const gapDays = (a, b) => Math.round((parseKey(b) - parseKey(a)) / 86400000);
function activityDates() {
  const set = new Set();
  state.sessions.forEach((s) => set.add(s.date));
  state.tasks.forEach((t) => { if (t.done && t.doneAt) set.add(t.doneAt); });
  state.plans.forEach((p) => p.data.forEach((d) => d.topics.forEach((t) => { if (t.done && t.doneAt) set.add(t.doneAt); })));
  Object.keys(state.reviewLog).forEach((k) => { if (state.reviewLog[k] > 0) set.add(k); });
  return set;
}
function streaks() {
  const set = activityDates();
  let d = new Date(); d.setHours(0, 0, 0, 0);
  if (!set.has(key(d))) d = addDays(d, -1);
  let cur = 0;
  while (set.has(key(d))) { cur++; d = addDays(d, -1); }
  let best = 0, run = 0, prev = null;
  Array.from(set).sort().forEach((k) => {
    run = prev && gapDays(prev, k) === 1 ? run + 1 : 1;
    if (run > best) best = run;
    prev = k;
  });
  return { cur, best: Math.max(best, cur) };
}
function streakStrip(st) {
  const set = activityDates();
  const t0 = new Date(); t0.setHours(0, 0, 0, 0);
  const cells = [];
  for (let i = 13; i >= 0; i--) {
    const k = key(addDays(t0, -i));
    const on = set.has(k);
    cells.push(h('div', {
      class: 'sq' + (on ? ' on' : '') + (i === 0 ? ' today' : ''), role: 'img',
      title: fmtDate(k) + (on ? ': studied' : ': no activity'),
      'aria-label': fmtDate(k) + (on ? ', studied' : ', no activity')
    }));
  }
  return h('div', { class: 'streak' },
    h('div', { class: 'streak-top' },
      h('span', { class: 'mono' }, 'Last 14 days'),
      h('span', { class: 'mono' }, 'Best streak: ' + st.best + (st.best === 1 ? ' day' : ' days'))),
    h('div', { class: 'strip' }, cells),
    h('p', { class: 'muted-note' }, 'A day counts when you finish a focus session, task, plan topic or flashcard review.'));
}
