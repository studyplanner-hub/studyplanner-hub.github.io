/* Overview page: next tasks, today's schedule, focus chart, exams.
   Needs: state.js, tasks.js, plans.js, streaks.js (called when it renders). */
'use strict';

/* ---------- overview ---------- */
function resetAll() {
  state = emptyState();
  focusSubject = '';
  save(); render(); toast('Started fresh');
}

function viewOverview() {
  const wrap = h('div', { class: 'stack' });
  if (state.demo) {
    wrap.append(h('div', { class: 'notice', role: 'note' },
      h('p', null, 'Example courses and tasks are loaded so you can see how the planner works. Start fresh to enter your own.'),
      h('div', { class: 'row' },
        confirmBtn('Start fresh', resetAll, 'btn'),
        h('button', { class: 'btn btn-ghost', type: 'button', onclick: () => { state.demo = false; save(); render(); } }, 'Keep and edit'))));
  }

  const open = state.tasks.filter((t) => !t.done);
  const overdue = open.filter((t) => t.due && dayDiff(t.due) < 0).length;
  const doneWeek = state.tasks.filter((t) => t.done && t.doneAt && inWeek(t.doneAt)).length;
  const focusWeek = weekMinutes();
  const st = streaks();
  const stat = (label, value, cls) => [h('dt', null, label), h('dd', { class: cls || '' }, value)];

  // Lead row: what to do now. "Next up" is the main panel; today's
  // schedule and plan topics stack beside it as quieter context.
  const next = open.slice().sort(byDue).slice(0, 5);
  const tdy = new Date().getDay();
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const todays = state.blocks.filter((b) => b.day === tdy).sort((a, b) => toMin(a.start) - toMin(b.start));
  wrap.append(h('div', { class: 'lead' },
    h('section', { class: 'panel panel-lead' },
      h('div', { class: 'panel-head' }, h('h2', null, 'Next up'),
        h('a', { href: 'tasks.html', class: overdue ? 'has-late' : null }, overdue ? 'All tasks (' + overdue + ' overdue)' : 'All tasks')),
      next.length ? h('ul', { class: 'tasks' }, next.map(taskRow)) : h('p', { class: 'empty' }, 'Nothing open. Add a task in Tasks.')),
    h('div', { class: 'stack' },
      h('section', { class: 'panel' },
        h('div', { class: 'panel-head' }, h('h2', null, 'Today, ' + DAYS_LONG[tdy]), h('a', { href: 'schedule.html' }, 'Weekly schedule')),
        todays.length
          ? h('ul', { class: 'rows' }, todays.map((b) => {
            const live = nowMin >= toMin(b.start) && nowMin < toMin(b.end);
            return h('li', null,
              h('span', { class: 'mono' }, b.start + '–' + b.end),
              h('span', { class: 'grow' }, b.label || 'Study block'),
              chip(b.subject),
              live ? h('span', { class: 'mono now-tag' }, 'Now') : null);
          }))
          : h('p', { class: 'empty' }, 'Nothing scheduled today. Add a block in Schedule.')),
      planTodayPanel())));

  wrap.append(h('section', { class: 'panel', 'aria-labelledby': 'week-h' },
    h('div', { class: 'panel-head' }, h('h2', { id: 'week-h' }, 'This week')),
    h('dl', { class: 'stats' },
      h('div', null, stat('Tasks done', String(doneWeek))),
      h('div', null, stat('Focus time',fmtMin(focusWeek))),
      h('div', null, stat('Study streak', st.cur + (st.cur === 1 ? ' day' : ' days')))),
    streakStrip(st)));

  const ws = weekStart();
  const per = DAYS.map((_, i) => {
    const k = key(addDays(ws, i));
    return state.sessions.filter((s) => s.date === k).reduce((a, s) => a + s.min, 0);
  });
  const max = Math.max(60, ...per);
  const exams = state.exams.filter((x) => dayDiff(x.date) >= 0).sort((a, b) => (a.date < b.date ? -1 : 1)).slice(0, 4);
  wrap.append(h('div', { class: 'grid-2' },
    h('section', { class: 'panel' },
      h('div', { class: 'panel-head' }, h('h2', null, 'Focus minutes by day'), h('a', { href: 'focus.html' }, 'Start a session')),
      h('div', {
        class: 'days', role: 'img',
        'aria-label': 'Focus minutes per day this week: ' + DAYS.map((d, i) => d + ' ' + per[i]).join(', ')
      }, per.map((m, i) => h('div', { class: 'day' + (i === tdy ? ' today' : '') },
        h('span', { class: 'val' }, m ? String(m) : ''),
        h('div', { class: 'barwrap' }, h('div', { class: 'bar', style: 'height:' + (m ? Math.max(3, (m / max) * 100) : 1) + '%' })),
        h('span', { class: 'lab' }, DAYS[i]))))),
    h('section', { class: 'panel' },
      h('div', { class: 'panel-head' }, h('h2', null, 'Exams'), h('a', { href: 'subjects.html' }, 'Manage')),
      exams.length
        ? h('ul', { class: 'rows' }, exams.map((x) => h('li', null,
          h('span', { class: 'grow' }, x.title), chip(x.subject),
          h('span', { class: 'mono' }, fmtDate(x.date) + ' · ' + countdown(x.date)))))
        : h('p', { class: 'empty' }, 'No upcoming exams. Add one in Subjects.'))));

  wrap.append(h('section', { class: 'panel' },
    h('div', { class: 'panel-head' }, h('h2', null, 'Weekly study goals')),
    state.subjects.length ? state.subjects.map(goalBar) : h('p', { class: 'empty' }, 'Add a subject to set a weekly goal.')));
  return wrap;
}
function countdown(k) {
  const d = dayDiff(k);
  if (d === 0) return 'today';
  if (d === 1) return 'tomorrow';
  if (d > 1) return 'in ' + d + ' days';
  return 'passed';
}
