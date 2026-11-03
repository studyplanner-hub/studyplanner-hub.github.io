/* Study Plans page: generating plans from topics, filtering, progress,
   and the "today from your plans" panel. Needs: state.js. */
'use strict';

/* ---------- study plans ---------- */
let planFilter = { q: '', level: '', status: '' };
const openPlans = new Set();
const planDate = (p, day) => key(addDays(parseKey(p.start), day - 1));
function planProgress(p) {
  let done = 0, total = 0;
  p.data.forEach((d) => d.topics.forEach((t) => { total++; if (t.done) done++; }));
  return { done, total };
}
function setTopic(tp, on) {
  tp.done = on;
  tp.doneAt = on ? todayKey() : null;
  save(); render();
}
function topicCheck(tp) {
  const cb = h('input', { type: 'checkbox', id: 'tp-' + tp.id, checked: tp.done, 'aria-label': 'Done: ' + splitTopic(tp.name)[0] });
  cb.addEventListener('change', () => setTopic(tp, cb.checked));
  return cb;
}
// A subject from the Subjects page and a topic list are linked by having the
// same name (not case-sensitive), e.g. subject "Calculus II" uses the topic
// list saved as "calculus ii".
const sameName = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();
const topicsFor = (s) => state.custom.find((c) => sameName(c.name, s.name)) || null;

// The plan generator's dropdown values:
//   s:<id>  a subject from the Subjects page (uses its linked topic list)
//   b:<key> a ready-made topic list (BUILTIN)
//   c:<id>  a topic list not linked to any subject
// Returns { name, desc, data } where data holds the topics per level, or
// data: null for a subject that has no topics yet.
function planSource(val) {
  if (val.indexOf('s:') === 0) {
    const s = subj(val.slice(2));
    if (!s) return null;
    const t = topicsFor(s);
    return t
      ? { name: s.name, desc: 'Your subject, using the topics you added for it.', data: t }
      : { name: s.name, desc: s.name + ' has no topics yet. Add them in “Add topics for a subject” below, then come back here.', data: null };
  }
  if (val.indexOf('b:') === 0) {
    const k = val.slice(2), b = BUILTIN[k];
    return b ? { name: k, desc: b.name + '. ' + b.desc, data: b } : null;
  }
  const c = state.custom.find((x) => 'c:' + x.id === val);
  return c ? { name: c.name, desc: 'Your own topic list.', data: c } : null;
}
// The generator's current choice, kept while you move around the page.
let planPick = '';
function planText(p) {
  const lines = [p.name + ' – ' + p.days + ' day' + (p.days === 1 ? '' : 's') + ', ' + p.hours + ' h per day'];
  p.data.forEach((d) => {
    lines.push('', 'Day ' + d.day + ' (' + fmtDate(planDate(p, d.day)) + ')');
    d.topics.forEach((t) => lines.push('  [' + (t.done ? 'x' : ' ') + '] ' + t.name + ' (' + (Math.round(t.hours * 10) / 10) + ' h)'));
  });
  return lines.join('\n');
}
function copyText(text, host) {
  const fallback = () => {
    const old = host.querySelector('.copybox');
    if (old) old.remove();
    const ta = h('textarea', { class: 'copybox', rows: '8', readonly: true, 'aria-label': 'Plan text' });
    ta.value = text;
    host.append(ta);
    ta.select();
    toast('Select the text and copy it');
  };
  try {
    navigator.clipboard.writeText(text).then(() => toast('Plan copied'), fallback);
  } catch (e) { fallback(); }
}
function planMatches(p) {
  const q = planFilter.q.trim().toLowerCase();
  if (q && p.name.toLowerCase().indexOf(q) < 0 &&
    !p.data.some((d) => d.topics.some((t) => t.name.toLowerCase().indexOf(q) >= 0))) return false;
  if (planFilter.level && p.level !== planFilter.level) return false;
  const pr = planProgress(p);
  if (planFilter.status === 'active' && pr.done >= pr.total) return false;
  if (planFilter.status === 'done' && pr.done < pr.total) return false;
  return true;
}
function planCard(p) {
  const pr = planProgress(p);
  const pct = pr.total ? (pr.done / pr.total) * 100 : 0;
  const det = h('details', { class: 'plan', open: openPlans.has(p.id) });
  det.addEventListener('toggle', () => { if (det.open) openPlans.add(p.id); else openPlans.delete(p.id); });
  det.append(h('summary', null,
    h('div', { class: 'plan-top' },
      h('h3', null, p.name),
      h('span', { class: 'tag' }, p.days + ' day' + (p.days === 1 ? '' : 's') + ' · ' + p.hours + ' h/day'),
      h('span', { class: 'mono' }, pr.done + ' of ' + pr.total + ' topics')),
    h('div', { class: 'track', style: '--c:var(--accent)', role: 'img', 'aria-label': Math.round(pct) + ' percent complete' },
      h('div', { class: 'fill', style: 'width:' + pct + '%' }))));
  const body = h('div', { class: 'plan-body' });
  p.data.forEach((d) => {
    const date = planDate(p, d.day);
    const dn = d.topics.filter((t) => t.done).length;
    body.append(h('div', null,
      h('div', { class: 'pday-head' },
        h('span', null, 'Day ' + d.day),
        h('span', { class: 'mono' }, DAYS[parseKey(date).getDay()] + ' ' + fmtDate(date)),
        dayDiff(date) === 0 ? h('span', { class: 'tag' }, 'Today') : null,
        h('span', { class: 'mono' }, dn + ' of ' + d.topics.length + ' done')),
      h('ul', { class: 'rows' }, d.topics.map((t) => {
        const parts = splitTopic(t.name);
        return h('li', null,
          topicCheck(t),
          h('label', { class: 'grow', for: 'tp-' + t.id }, parts[0], parts[1] ? h('span', { class: 'sub' }, parts[1]) : null),
          h('span', { class: 'mono' }, (Math.round(t.hours * 10) / 10) + ' h'));
      }))));
  });
  const actions = h('div', { class: 'row' },
    h('button', { class: 'btn btn-ghost', type: 'button', onclick: () => copyText(planText(p), body) }, 'Copy as text'),
    confirmBtn('Delete plan', () => {
      state.plans = state.plans.filter((x) => x !== p);
      state.cards.forEach((c) => { if (c.planId === p.id) c.planId = ''; });
      openPlans.delete(p.id);
      save(); render(); toast('Plan deleted');
    }));
  body.append(actions);
  det.append(body);
  return det;
}

function viewPlans() {
  const wrap = h('div', { class: 'stack' });

  // Your subjects first, then the ready-made lists, then any topic lists
  // whose name does not match a subject.
  const sub = h('select', { id: 'p-subject' });
  if (state.subjects.length) {
    sub.append(h('optgroup', { label: 'Your subjects' }, state.subjects.map((s) =>
      h('option', { value: 's:' + s.id }, s.name + (topicsFor(s) ? '' : ' (no topics yet)')))));
  }
  sub.append(h('optgroup', { label: 'Ready-made topic lists' }, Object.keys(BUILTIN).map((k) =>
    h('option', { value: 'b:' + k }, k + ' – ' + BUILTIN[k].name))));
  const loose = state.custom.filter((c) => !state.subjects.some((s) => sameName(s.name, c.name)));
  if (loose.length) {
    sub.append(h('optgroup', { label: 'Other topic lists' }, loose.map((c) => h('option', { value: 'c:' + c.id }, c.name))));
  }
  // Start on the last choice; otherwise the first subject that has topics;
  // otherwise the first ready-made list.
  const firstReady = state.subjects.find(topicsFor);
  sub.value = planSource(planPick) ? planPick : (firstReady ? 's:' + firstReady.id : 'b:' + Object.keys(BUILTIN)[0]);
  const level = h('select', { id: 'p-level' }, LEVELS.map((l) => h('option', { value: l }, l)));
  const days = h('input', { type: 'number', id: 'p-days', min: '1', max: '30', value: '3' });
  const hours = h('input', { type: 'number', id: 'p-hours', min: '0.5', max: '12', step: '0.5', value: '2' });
  const start = h('input', { type: 'date', id: 'p-start', value: todayKey() });
  const desc = h('p', { class: 'muted-note' });
  // Shows what the chosen list is. For a subject with no topics, also opens
  // the topics form below with the subject's name filled in.
  const paintDesc = () => {
    const s = planSource(sub.value);
    desc.textContent = s ? s.desc : '';
    desc.classList.toggle('desc-warn', !!(s && !s.data));
    if (s && !s.data) offerTopics(s.name);
  };
  sub.addEventListener('change', () => { planPick = sub.value; paintDesc(); });
  const msg = h('p', { class: 'msg', role: 'status' });
  const gen = h('form', { class: 'panel form', novalidate: true },
    field('Subject', 'p-subject', sub, 'wide'),
    h('div', { class: 'field wide' }, desc),
    field('Level', 'p-level', level),
    field('Days', 'p-days', days),
    field('Hours per day', 'p-hours', hours),
    field('Start date', 'p-start', start),
    h('button', { class: 'btn', type: 'submit' }, 'Generate plan'), msg);
  gen.addEventListener('submit', (e) => {
    e.preventDefault();
    const src = planSource(sub.value);
    const n = Math.round(Number(days.value)), hr = Number(hours.value);
    if (!src) { fieldError(msg, sub, 'Choose a subject.'); return; }
    if (!src.data) {
      offerTopics(src.name);
      fieldError(msg, sub, src.name + ' has no topics yet. Add them in “Add topics for a subject” below first.');
      return;
    }
    if (!(n >= 1 && n <= 30)) { fieldError(msg, days, 'Days must be between 1 and 30.'); return; }
    if (!(hr >= 0.5 && hr <= 12)) { fieldError(msg, hours, 'Hours per day must be between 0.5 and 12.'); return; }
    if (!start.value) { fieldError(msg, start, 'Choose a start date.'); return; }
    if (!(src.data[level.value] || []).length) { fieldError(msg, level, 'This subject has no topics at the ' + level.value + ' level.'); return; }
    const plan = makePlan(src.data, src.name, level.value, n, hr, start.value);
    state.plans.unshift(plan);
    openPlans.add(plan.id);
    save(); render();
    toast('Plan created for ' + plan.days + (plan.days === 1 ? ' day' : ' days'));
  });

  const cMsg = h('p', { class: 'msg', role: 'status' });
  // The name box suggests your subjects (a <datalist>), so topics are easy
  // to link to the right one.
  const names = h('datalist', { id: 'subject-names' }, state.subjects.map((s) => h('option', { value: s.name })));
  const cName = h('input', { type: 'text', id: 'c-name', placeholder: 'e.g. Linear Algebra', autocomplete: 'off', list: 'subject-names' });
  const cAreas = LEVELS.map((l) => h('textarea', { id: 'c-' + l, rows: '5', placeholder: 'One topic per line' }));
  const custom = h('form', { class: 'form', novalidate: true },
    field('Subject name', 'c-name', cName, 'wide'),
    LEVELS.map((l, i) => field(l + ' topics', 'c-' + l, cAreas[i])),
    h('button', { class: 'btn btn-ghost', type: 'submit' }, 'Save subject'), cMsg);
  custom.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = cName.value.trim();
    if (!n) { fieldError(cMsg, cName, 'Enter a subject name.'); return; }
    // Saving under a name that already has topics replaces them, so each
    // subject has one topic list.
    const existing = state.custom.find((x) => sameName(x.name, n));
    const c = existing || { id: uid(), name: n };
    const topics = {};
    let count = 0;
    LEVELS.forEach((l, i) => {
      topics[l] = cAreas[i].value.split('\n').map((x) => x.trim()).filter(Boolean);
      count += topics[l].length;
    });
    if (!count) { fieldError(cMsg, cAreas[0], 'Add at least one topic.'); return; }
    Object.assign(c, topics);
    if (!existing) state.custom.push(c);
    // Pre-select it in the generator: the matching subject if there is one.
    const s = state.subjects.find((x) => sameName(x.name, n));
    planPick = s ? 's:' + s.id : 'c:' + c.id;
    save(); render(); toast('Topics saved for ' + n + '. It is selected in the plan generator above.');
  });
  const customList = state.custom.length
    ? h('ul', { class: 'rows', style: 'margin-top:12px' }, state.custom.map((c) => h('li', null,
      h('span', { class: 'grow' }, c.name),
      h('span', { class: 'mono' }, LEVELS.map((l) => c[l].length).join(' / ') + ' topics'),
      confirmBtn('Delete', () => { state.custom = state.custom.filter((x) => x !== c); save(); render(); }))))
    : null;
  const customPanel = h('details', { class: 'panel' },
    h('summary', { style: 'cursor:pointer;font-weight:600' }, 'Add topics for a subject'),
    h('p', { class: 'muted-note', style: 'margin:8px 0 12px' }, 'Use the same name as a subject on the Subjects page to link them. Topics per level, one per line. Add details after " - ", like "Arrays - indexing and sorting".'),
    names, custom, customList);

  // Opens the topics form for a subject that has none yet, with its name
  // filled in (only if the box is empty, so typing is never overwritten).
  function offerTopics(name) {
    customPanel.open = true;
    if (!cName.value.trim()) cName.value = name;
  }
  paintDesc();

  const q = h('input', { type: 'text', id: 'pf-q', placeholder: 'Search plans and topics…', value: planFilter.q, autocomplete: 'off' });
  const lv = h('select', { id: 'pf-level' }, h('option', { value: '' }, 'All levels'), LEVELS.map((l) => h('option', { value: l }, l)));
  lv.value = planFilter.level;
  const stt = h('select', { id: 'pf-status' },
    h('option', { value: '' }, 'All plans'), h('option', { value: 'active' }, 'In progress'), h('option', { value: 'done' }, 'Completed'));
  stt.value = planFilter.status;
  const slot = h('div', { class: 'plans' });
  const paintList = () => {
    const list = state.plans.filter(planMatches);
    slot.replaceChildren(...(list.length
      ? list.map(planCard)
      : [h('p', { class: 'panel empty' }, state.plans.length ? 'No plans match those filters.' : 'No plans yet. Generate your first one above.')]));
  };
  q.addEventListener('input', () => { planFilter.q = q.value; paintList(); });
  lv.addEventListener('change', () => { planFilter.level = lv.value; paintList(); });
  stt.addEventListener('change', () => { planFilter.status = stt.value; paintList(); });
  paintList();
  const bar = h('div', { class: 'filters' },
    field('Search', 'pf-q', q), field('Level', 'pf-level', lv), field('Status', 'pf-status', stt));

  wrap.append(gen, customPanel, bar, slot);
  return wrap;
}

function planTodayPanel() {
  const tk = todayKey();
  const items = [];
  state.plans.forEach((p) => p.data.forEach((d) => {
    const date = planDate(p, d.day);
    d.topics.forEach((tp) => { if (!tp.done && date <= tk) items.push({ p, tp, date }); });
  }));
  items.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  const shown = items.slice(0, 5);
  const dueCardsN = dueCards('*').length;
  return h('section', { class: 'panel' },
    h('div', { class: 'panel-head' }, h('h2', null, 'From your study plans'), h('a', { href: 'plans.html' }, 'All plans')),
    shown.length
      ? h('ul', { class: 'rows' }, shown.map((it) => {
        const parts = splitTopic(it.tp.name);
        return h('li', null,
          topicCheck(it.tp),
          h('label', { class: 'grow', for: 'tp-' + it.tp.id }, parts[0], h('span', { class: 'sub' }, it.p.name)),
          it.date < tk ? h('span', { class: 'late-tag' }, 'Behind') : h('span', { class: 'mono' }, 'Today'));
      }))
      : h('p', { class: 'empty' }, state.plans.length ? 'Nothing left from your plans for today.' : 'No plans yet. Generate one in Study Plans.'),
    items.length > shown.length ? h('p', { class: 'muted-note' }, (items.length - shown.length) + ' more topics due or behind.') : null,
    dueCardsN ? h('p', { class: 'muted-note', style: 'margin-top:8px' }, h('a', { href: 'flashcards.html', style: 'color:var(--accent);font-weight:600' }, dueCardsN + ' flashcard' + (dueCardsN === 1 ? '' : 's') + ' due'), ' for review.') : null);
}
