/* Subjects page: add subjects from the college catalogue (or type your
   own), weekly goals, and exam dates.
   Needs: state.js, catalog.js, plans.js (builtinKey). */
'use strict';

/* ---------- subjects & exams ---------- */
function viewSubjects() {
  // 1. Add from the catalogue: pick college -> department -> subject. The
  //    subject keeps the catalogue name, so Study Plans finds its topics.
  const cmsg = h('p', { class: 'msg', role: 'status' });
  const picker = catalogPicker({ prefix: 'cat', label: 'Subject to add' });
  const cGoal = h('input', { type: 'number', id: 'cat-goal', min: '0', max: '40', step: '0.5', value: '4', inputmode: 'decimal' });
  const catForm = h('form', { class: 'panel form', novalidate: true },
    h('h2', { class: 'form-title wide' }, 'Add a subject from your college'),
    picker.nodes,
    field('Weekly goal (hours)', 'cat-goal', cGoal),
    h('button', { class: 'btn', type: 'submit' }, 'Add to my subjects'), cmsg);
  catForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const b = BUILTIN[(picker.select.value || '').slice(2)];
    if (!b) { fieldError(cmsg, picker.select, 'Choose a subject from the list.'); return; }
    if (state.subjects.some((s) => sameName(s.name, b.name))) { fieldError(cmsg, picker.select, b.name + ' is already in your subjects.'); return; }
    const s = { id: uid(), name: b.name, color: state.subjects.length % 6, goal: Math.max(0, Number(cGoal.value) || 0) };
    state.subjects.push(s);
    if (!focusSubject) focusSubject = s.id;
    save(); render(); toast(b.name + ' added');
  });

  // 2. Or type your own subject (one that is not in the catalogue).
  const msg = h('p', { class: 'msg', role: 'status' });
  const name = h('input', { type: 'text', id: 'sub-name', placeholder: 'e.g. Arabic Literature', autocomplete: 'off' });
  const goal = h('input', { type: 'number', id: 'sub-goal', min: '0', max: '40', step: '0.5', value: '4' });
  const sw = h('div', { class: 'swatches', role: 'radiogroup', 'aria-label': 'Subject color' });
  COLOR_NAMES.forEach((cn, i) => {
    sw.append(h('label', { style: '--c:var(--s' + i + ')' },
      h('input', { type: 'radio', name: 'sub-color', value: String(i), 'aria-label': cn, checked: i === state.subjects.length % 6 }),
      h('span')));
  });
  const subForm = h('form', { class: 'form', novalidate: true },
    field('Subject name', 'sub-name', name, 'wide'),
    field('Weekly goal (hours)', 'sub-goal', goal),
    h('div', { class: 'field' }, h('span', { style: 'font-size:12.5px;font-weight:600;color:var(--muted)' }, 'Color'), sw),
    h('button', { class: 'btn', type: 'submit' }, 'Add subject'), msg);
  subForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = name.value.trim();
    if (!n) { fieldError(msg, name, 'Enter a subject name.'); return; }
    if (state.subjects.some((s) => sameName(s.name, n))) { fieldError(msg, name, n + ' is already in your subjects.'); return; }
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
        // Catalogue subjects show where they come from, e.g. "Engineering · Civil Engineering".
        const b = BUILTIN[builtinKey(s.name)];
        return h('div', { class: 'subj' },
          h('div', null, chip(s.id),
            b ? h('p', { class: 'subj-where' }, collegeShort(b.college) + ' · ' + b.department) : null,
            h('p', { class: 'mono', style: 'margin-top:4px' }, openN + ' open task' + (openN === 1 ? '' : 's'))),
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

  const ownPanel = h('details', { class: 'panel' },
    h('summary', { class: 'summary-btn' }, 'Not in the list? Type your own subject'),
    h('div', { style: 'margin-top:14px' }, subForm));

  return h('div', { class: 'stack' }, catForm, ownPanel, h('div', { class: 'grid-2' }, list, examPanel));
}
