/* Schedule page: the weekly timetable grid and the add-block form.
   Needs: state.js. */
'use strict';

/* ---------- schedule ---------- */
function blockEl(b, top, height) {
  const s = subj(b.subject);
  return h('div', {
    class: 'block', style: '--c:' + (s ? 'var(--s' + s.color + ')' : 'var(--muted)') + ';top:' + top + 'px;height:' + height + 'px',
    title: (b.label || 'Study block') + ', ' + b.start + ' to ' + b.end + (s ? ', ' + s.name : '')
  },
    h('span', { class: 'bt' }, b.start + '–' + b.end),
    h('strong', null, b.label || (s ? s.name : 'Study block')),
    b.label && s ? h('span', { class: 'bs' }, s.name) : null,
    h('button', {
      class: 'x', type: 'button', 'aria-label': 'Remove ' + (b.label || 'block') + ' on ' + DAYS_LONG[b.day],
      onclick: () => removeWithUndo('blocks', b, 'Block')
    }, '×'));
}

function viewSchedule() {
  const ws = weekStart();
  const tdy = new Date().getDay();
  const hours = [];
  for (let i = H0; i < H1; i++) hours.push(i);

  const head = h('div', { class: 'tt-head' }, h('div'),
    DAYS.map((d, i) => h('div', { class: 'tt-day' + (i === tdy ? ' today' : '') },
      h('span', null, d), h('b', null, String(addDays(ws, i).getDate())))));
  const times = h('div', { class: 'tt-times' }, hours.map((hr) => h('span', null, pad(hr) + ':00')));
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const cols = DAYS.map((_, i) => {
    const col = h('div', { class: 'tt-col' + (i === tdy ? ' today' : '') + (i >= 5 ? ' weekend' : ''), style: 'height:' + (H1 - H0) * RH + 'px' });
    state.blocks.filter((b) => b.day === i).forEach((b) => {
      const top = ((toMin(b.start) - H0 * 60) / 60) * RH;
      const ht = Math.max(24, ((toMin(b.end) - toMin(b.start)) / 60) * RH - 2);
      col.append(blockEl(b, top + 1, ht));
    });
    if (i === tdy && nowMin >= H0 * 60 && nowMin < H1 * 60) {
      col.append(h('div', { class: 'now-line', style: 'top:' + ((nowMin - H0 * 60) / 60) * RH + 'px', 'aria-hidden': 'true' }));
    }
    return col;
  });
  const grid = h('div', { class: 'tt' }, head, h('div', { class: 'tt-body' }, times, cols));

  const msg = h('p', { class: 'msg', role: 'status' });
  const day = h('select', { id: 'b-day' }, DAYS_LONG.map((d, i) => h('option', { value: String(i) }, d)));
  day.value = String(tdy);
  const start = h('input', { type: 'time', id: 'b-start', value: '09:00' });
  const end = h('input', { type: 'time', id: 'b-end', value: '10:30' });
  const sub = subjectSelect('b-subject', state.subjects[0] ? state.subjects[0].id : '', true);
  const label = h('input', { type: 'text', id: 'b-label', placeholder: 'Lecture, Lab, Study', autocomplete: 'off' });
  const form = h('form', { class: 'panel form', novalidate: true },
    field('Day', 'b-day', day), field('Starts', 'b-start', start), field('Ends', 'b-end', end),
    field('Subject', 'b-subject', sub), field('Label', 'b-label', label),
    h('button', { class: 'btn', type: 'submit' }, 'Add block'), msg);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!start.value || !end.value) { fieldError(msg, start.value ? end : start, 'Choose a start and end time.'); return; }
    const a = toMin(start.value), z = toMin(end.value);
    if (z <= a) { fieldError(msg, end, 'The end time must be after the start time.'); return; }
    if (a < H0 * 60 || z > H1 * 60) { fieldError(msg, a < H0 * 60 ? start : end, 'Blocks must fall between ' + pad(H0) + ':00 and ' + pad(H1) + ':00.'); return; }
    const d = Number(day.value);
    const clash = state.blocks.find((b) => b.day === d && a < toMin(b.end) && z > toMin(b.start));
    if (clash) { fieldError(msg, start, 'That overlaps ' + (clash.label || 'another block') + ' (' + clash.start + '–' + clash.end + ').'); return; }
    state.blocks.push({ id: uid(), day: d, start: start.value, end: end.value, subject: sub.value, label: label.value.trim() });
    save(); render(); toast('Block added');
  });

  // On a phone the week is wider than the screen and scrolls sideways.
  // Once it is on the page, scroll so today's column is in view (on a wide
  // screen there is nothing to scroll, so this does nothing).
  const wrap = h('div', { class: 'tt-wrap' }, grid);
  requestAnimationFrame(() => {
    const todayCol = wrap.querySelector('.tt-day.today');
    if (todayCol && wrap.scrollWidth > wrap.clientWidth) {
      const col = todayCol.getBoundingClientRect(), box = wrap.getBoundingClientRect();
      wrap.scrollLeft += (col.left - box.left) - (box.width - col.width) / 2;
    }
  });

  return h('div', { class: 'stack' },
    h('section', { class: 'panel' },
      h('div', { class: 'panel-head' }, h('h2', null, 'This week')),
      wrap,
      h('p', { class: 'legend-note' }, 'Weeks run Sunday to Saturday. Friday and Saturday are shaded as the weekend. The red line marks the current time.')),
    form);
}
