/* The subject catalogue picker, used on Study Plans and Subjects.

   Four controls work together so it is quick to find one of ~90 subjects:
     Search      - every word typed must appear in a subject's name,
                   college, department, description or topics
                   ("fourier" finds Signals & Systems and DSP)
     College     - Engineering, Computer Science, IT, Business, or all
     Department  - the departments of the chosen college
     Subject     - the matching subjects, grouped by department
   Needs: topics.js (COLLEGES, BUILTIN), utils.js (h), state.js (field). */
'use strict';

// All the topics of a list as one string, for searching.
const topicText = (t) => t ? LEVELS.map((l) => (t[l] || []).join(' ')).join(' ') : '';
const collegeShort = (name) => (COLLEGES.find((c) => c.name === name) || {}).short || name;

/* Builds the picker. Options:
     prefix    id prefix for the controls, e.g. "p" -> p-find, p-subject
     label     label for the subject dropdown (default "Subject")
     extra     choices listed above the catalogue, e.g. your own subjects:
               [{ group, value, label, find }]; shown only when no college
               is chosen, because they do not belong to one
     value     the choice to start on
     onChange  called with the chosen value whenever it changes
   Returns { nodes, select }: nodes go into a form, select is the subject
   dropdown (its value is "b:<key>" for a catalogue subject). */
function catalogPicker(o) {
  const p = o.prefix;
  const catalogue = Object.keys(BUILTIN).map((k) => {
    const b = BUILTIN[k];
    return { college: b.college, dept: b.department, value: 'b:' + k, label: b.name,
      find: [k, b.name, b.college, b.department, b.desc, topicText(b)].join(' ') };
  });
  const extra = o.extra || [];

  const find = h('input', { type: 'search', id: p + '-find', placeholder: 'e.g. circuits, marketing, Fourier…', autocomplete: 'off' });
  const college = h('select', { id: p + '-college' },
    h('option', { value: '' }, 'All colleges'), COLLEGES.map((c) => h('option', { value: c.name }, c.short)));
  const dept = h('select', { id: p + '-dept' });
  const found = h('p', { class: 'muted-note', id: p + '-found', 'aria-live': 'polite' });
  const sub = h('select', { id: p + '-subject' });

  function fillDepts() {
    const c = COLLEGES.find((x) => x.name === college.value);
    dept.replaceChildren(h('option', { value: '' }, 'All'),
      // "..." spreads the list: replaceChildren takes elements, not an array.
      ...(c ? c.departments : []).map((d) => h('option', { value: d }, d)));
    dept.disabled = !c;
  }

  function fill() {
    const words = find.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const matches = (c) => words.every((w) => c.find.toLowerCase().includes(w));
    const inScope = catalogue.filter((c) => (!college.value || c.college === college.value) && (!dept.value || c.dept === dept.value));
    const shownExtra = college.value ? [] : extra.filter(matches);
    const shownCat = inScope.filter(matches);
    const keep = sub.value;
    sub.replaceChildren();
    // Your own choices first, then one group per department. With "All
    // colleges" the group name includes the college, e.g. "Engineering – Civil Engineering".
    [...new Set(shownExtra.map((c) => c.group))].forEach((g) => sub.append(h('optgroup', { label: g },
      shownExtra.filter((c) => c.group === g).map((c) => h('option', { value: c.value }, c.label)))));
    const groupOf = (c) => (college.value ? '' : collegeShort(c.college) + ' – ') + c.dept;
    [...new Set(shownCat.map(groupOf))].forEach((g) => sub.append(h('optgroup', { label: g },
      shownCat.filter((c) => groupOf(c) === g).map((c) => h('option', { value: c.value }, c.label)))));

    // Keep the current choice if it is still listed and still a best match;
    // otherwise pick the best match: a name containing the whole search
    // ("power electronics" -> Power Electronics), then a name containing
    // every word, then a match found only in the topics.
    const shown = shownExtra.concat(shownCat);
    const phrase = words.join(' ');
    const rank = (c) => c.label.toLowerCase().includes(phrase) ? 0 : words.every((w) => c.label.toLowerCase().includes(w)) ? 1 : 2;
    const best = shown.slice().sort((a, b) => rank(a) - rank(b))[0];
    if (best && shown.some((c) => c.value === keep && rank(c) <= rank(best))) sub.value = keep;
    else if (best) sub.value = best.value;

    const total = inScope.length + (college.value ? 0 : extra.length);
    found.textContent = !words.length ? total + ' subjects' + (college.value ? ' in ' + (dept.value || college.value) : '') + '. Type to search by name or topic.'
      : shown.length ? shown.length + ' of ' + total + ' subjects match.'
      : 'No subjects match “' + find.value.trim() + '”. Try another word or college.';
    found.classList.toggle('desc-warn', !!words.length && !shown.length);
  }

  const changed = () => { if (o.onChange) o.onChange(sub.value); };
  college.addEventListener('change', () => { fillDepts(); fill(); changed(); });
  dept.addEventListener('change', () => { fill(); changed(); });
  find.addEventListener('input', () => { fill(); changed(); });
  // Enter in the search box should not submit the form around it.
  find.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
  sub.addEventListener('change', changed);

  fillDepts();
  fill();
  if (o.value && [...sub.options].some((x) => x.value === o.value)) sub.value = o.value;

  return {
    select: sub,
    nodes: [
      field('Search subjects', p + '-find', find, 'wide'),
      field('College', p + '-college', college),
      field('Department', p + '-dept', dept),
      h('div', { class: 'field wide' }, found),
      field(o.label || 'Subject', p + '-subject', sub, 'wide')
    ]
  };
}
