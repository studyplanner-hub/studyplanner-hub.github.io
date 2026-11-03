/* Tasks page: filters, the task list and the add-task form.
   Needs: state.js. */
'use strict';

/* ---------- tasks ---------- */
function byDue(a, b) {
  if (a.done !== b.done) return a.done ? 1 : -1;
  const da = a.due || '9999', db = b.due || '9999';
  if (da !== db) return da < db ? -1 : 1;
  return PR[a.pri] - PR[b.pri];
}
function matches(t, f) {
  const diff = t.due ? dayDiff(t.due) : null;
  switch (f) {
    case 'open': return !t.done;
    case 'today': return !t.done && diff === 0;
    case 'week': return !t.done && !!t.due && inWeek(t.due);
    case 'overdue': return !t.done && diff !== null && diff < 0;
    case 'done': return t.done;
    default: return true;
  }
}
function taskRow(t) {
  const diff = t.due ? dayDiff(t.due) : null;
  const late = !t.done && diff !== null && diff < 0;
  const cb = h('input', {
    type: 'checkbox', id: 'cb-' + t.id, checked: t.done, 'aria-label': 'Done: ' + t.title,
    onchange: () => {
      t.done = cb.checked;
      t.doneAt = t.done ? todayKey() : null;
      save(); render();
    }
  });
  return h('li', { class: 'task' + (t.done ? ' is-done' : '') },
    cb,
    h('div', null,
      h('label', { class: 'task-title', for: 'cb-' + t.id }, t.title),
      h('div', { class: 'task-meta' },
        chip(t.subject),
        t.due ? h('span', { class: 'due' + (late ? ' late' : diff === 0 ? ' now' : '') }, fmtDue(t.due)) : null,
        t.est > 0 ? h('span', { class: 'est' }, fmtMin(t.est)) : null)),
    h('span', { class: 'pri pri-' + t.pri }, PRI[t.pri]),
    h('button', {
      class: 'icon-btn', type: 'button', 'aria-label': 'Delete task: ' + t.title, title: 'Delete',
      onclick: () => removeWithUndo('tasks', t, 'Task')
    }, '×'));
}

function viewTasks() {
  const msg = h('p', { class: 'msg', role: 'status' });
  const title = h('input', { type: 'text', id: 't-title', placeholder: 'What needs doing?', autocomplete: 'off' });
  const sub = subjectSelect('t-subject', state.subjects[0] ? state.subjects[0].id : '', true);
  const due = h('input', { type: 'date', id: 't-due', value: todayKey() });
  const pri = h('select', { id: 't-pri' },
    h('option', { value: 'high' }, 'High'), h('option', { value: 'med', selected: true }, 'Medium'), h('option', { value: 'low' }, 'Low'));
  pri.value = 'med';
  const est = h('input', { type: 'number', id: 't-est', min: '5', max: '600', step: '5', placeholder: '60' });
  const form = h('form', { class: 'panel form', novalidate: true },
    field('Task', 't-title', title, 'wide'),
    field('Subject', 't-subject', sub),
    field('Due date', 't-due', due),
    field('Priority', 't-pri', pri),
    field('Estimate (minutes)', 't-est', est),
    h('button', { class: 'btn', type: 'submit' }, 'Add task'),
    msg);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = title.value.trim();
    if (!name) { fieldError(msg, title, 'Enter a task title.'); return; }
    // The estimate is optional, but if given it must be 5–600 minutes.
    // (min/max on the input are not enforced because the form uses novalidate.)
    const mins = est.value === '' ? 0 : Math.round(Number(est.value));
    if (est.value !== '' && !(mins >= 5 && mins <= 600)) {
      fieldError(msg, est, 'Estimate must be between 5 and 600 minutes.'); return;
    }
    state.tasks.push({
      id: uid(), title: name, subject: sub.value, due: due.value || '', pri: pri.value,
      est: mins, done: false, doneAt: null
    });
    save(); render(); toast('Task added');
  });

  const filters = [['open', 'Open'], ['today', 'Due today'], ['week', 'This week'], ['overdue', 'Overdue'], ['done', 'Done'], ['all', 'All']];
  const chips = h('div', { class: 'chips-row', role: 'group', 'aria-label': 'Filter tasks' },
    filters.map((f) => h('button', {
      type: 'button', class: 'filter', 'aria-pressed': String(taskFilter === f[0]),
      onclick: () => { taskFilter = f[0]; render(); }
    }, f[1], h('span', null, String(state.tasks.filter((t) => matches(t, f[0])).length)))));

  const list = state.tasks.filter((t) => matches(t, taskFilter)).sort(byDue);
  const empties = {
    open: 'Nothing open. Add a task above.', today: 'Nothing due today.', week: 'Nothing due this week.',
    overdue: 'No overdue tasks.', done: 'No completed tasks yet.', all: 'No tasks yet.'
  };
  return h('div', { class: 'stack' }, form, chips,
    h('section', { class: 'panel' },
      list.length ? h('ul', { class: 'tasks' }, list.map(taskRow)) : h('p', { class: 'empty' }, empties[taskFilter])));
}
