/* Subjects page: subjects with weekly goals, and exam dates.
   Needs: state.js. */
'use strict';

/* ---------- subjects & exams ---------- */
function viewSubjects() {
  const msg = h('p', { class: 'msg', role: 'status' });
  // As you type, the box suggests the ready-made subjects (from topics.js).
  // Picking one means Study Plans already has topics for it.
  const suggestions = h('datalist', { id: 'builtin-subjects' },
    FIELDS.flatMap((f) => Object.keys(BUILTIN).filter((k) => BUILTIN[k].field === f).map((k) => h('option', { value: BUILTIN[k].name }, f))));
  const name = h('input', { type: 'text', id: 'sub-name', placeholder: 'e.g. Circuit Analysis, Marketing…', autocomplete: 'off', list: 'builtin-subjects' });
  const goal = h('input', { type: 'number', id: 'sub-goal', min: '0', max: '40', step: '0.5', value: '4' });
  const sw = h('div', { class: 'swatches', role: 'radiogroup', 'aria-label': 'Subject color' });
  COLOR_NAMES.forEach((cn, i) => {
    sw.append(h('label', { style: '--c:var(--s' + i + ')' },
      h('input', { type: 'radio', name: 'sub-color', value: String(i), 'aria-label': cn, checked: i === state.subjects.length % 6 }),
      h('span')));
  });
  const subForm = h('form', { class: 'panel form', novalidate: true },
    field('Subject name', 'sub-name', name, 'wide'), suggestions,
    field('Weekly goal (hours)', 'sub-goal', goal),
    h('div', { class: 'field' }, h('span', { style: 'font-size:12.5px;font-weight:600;color:var(--muted)' }, 'Color'), sw),
    h('button', { class: 'btn', type: 'submit' }, 'Add subject'), msg);
  subForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = name.value.trim();
    if (!n) { fieldError(msg, name, 'Enter a subject name.'); return; }
    const sel = subForm.querySelector('input[name="sub-color"]:checked');
    const s = { id: uid(), name: n, color: sel ? Number(sel.value) : 0, goal: Math.max(0, Number(goal.value) || 0) };
    state.subjects.push(s);
    if (!focusSubject) focusSubject = s.id;
    save(); render(); toast('Subject added');
  });

  const list = h('section', { class: 'panel' },
    h('div', { class: 'panel-head' }, h('h2', null, 'Your subjects')),
    state.subjects.length
      ? state.subjects.map((s) => {
        const openN = state.tasks.filter((t) => !t.done && t.subject === s.id).length;
        return h('div', { class: 'subj' },
          h('div', null, chip(s.id), h('p', { class: 'mono', style: 'margin-top:4px' }, openN + ' open task' + (openN === 1 ? '' : 's'))),
          goalBar(s),
          confirmBtn('Delete', () => {
            state.subjects = state.subjects.filter((x) => x !== s);
            state.blocks = state.blocks.filter((b) => b.subject !== s.id);
            state.exams = state.exams.filter((x) => x.subject !== s.id);
            state.tasks.forEach((t) => { if (t.subject === s.id) t.subject = ''; });
            state.sessions.forEach((x) => { if (x.subject === s.id) x.subject = ''; });
            if (focusSubject === s.id) focusSubject = state.subjects[0] ? state.subjects[0].id : '';
            save(); render(); toast('Subject deleted');
          }));
      })
      : h('p', { class: 'empty' }, 'No subjects yet. Add your first course above.'));

  const emsg = h('p', { class: 'msg', role: 'status' });
  const eTitle = h('input', { type: 'text', id: 'e-title', placeholder: 'Midterm, Quiz 1, Final', autocomplete: 'off' });
  const eSub = subjectSelect('e-subject', state.subjects[0] ? state.subjects[0].id : '', true);
  const eDate = h('input', { type: 'date', id: 'e-date', value: key(addDays(new Date(), 7)) });
  const examForm = h('form', { class: 'form', novalidate: true },
    field('Exam', 'e-title', eTitle), field('Subject', 'e-subject', eSub), field('Date', 'e-date', eDate),
    h('button', { class: 'btn', type: 'submit' }, 'Add exam'), emsg);
  examForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!eTitle.value.trim() || !eDate.value) { fieldError(emsg, eTitle.value.trim() ? eDate : eTitle, 'Enter an exam name and a date.'); return; }
    state.exams.push({ id: uid(), title: eTitle.value.trim(), subject: eSub.value, date: eDate.value });
    save(); render(); toast('Exam added');
  });
  const exams = state.exams.slice().sort((a, b) => (a.date < b.date ? -1 : 1));
  const examPanel = h('section', { class: 'panel' },
    h('div', { class: 'panel-head' }, h('h2', null, 'Exams')),
    examForm,
    exams.length
      ? h('ul', { class: 'rows', style: 'margin-top:12px' }, exams.map((x) => h('li', null,
        h('span', { class: 'grow' }, x.title), chip(x.subject),
        h('span', { class: 'mono' }, fmtDate(x.date) + ' · ' + countdown(x.date)),
        h('button', {
          class: 'icon-btn', type: 'button', 'aria-label': 'Delete exam: ' + x.title, title: 'Delete',
          onclick: () => removeWithUndo('exams', x, 'Exam')
        }, '×'))))
      : h('p', { class: 'empty', style: 'margin-top:12px' }, 'No exams yet.'));

  return h('div', { class: 'stack' }, subForm, h('div', { class: 'grid-2' }, list, examPanel));
}
