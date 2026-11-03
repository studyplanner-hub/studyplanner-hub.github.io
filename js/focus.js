/* Focus page: the Pomodoro timer, session logging and timer settings.
   Needs: state.js. */
'use strict';

/* ---------- focus timer ---------- */
const CIRC = 2 * Math.PI * 96;
const timer = { mode: 'focus', remaining: state.settings.focus * 60000, running: false, endAt: 0, count: 0 };
const dur = (m) => state.settings[m] * 60000;
const MODE_LABEL = { focus: 'Focus', short: 'Short break', long: 'Long break' };
let actx = null;
function ensureAudio() {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
  } catch (e) { /* ignore */ }
}
function beep() {
  try {
    if (!actx) return;
    [0, 0.25, 0.5].forEach((o) => {
      const os = actx.createOscillator(), g = actx.createGain();
      os.frequency.value = 880; g.gain.value = 0.08;
      os.connect(g); g.connect(actx.destination);
      os.start(actx.currentTime + o); os.stop(actx.currentTime + o + 0.15);
    });
  } catch (e) { /* ignore */ }
}
function paintTimer() {
  const t = $('#tm-time');
  if (!t) return;
  const total = dur(timer.mode);
  const left = timer.running ? Math.max(0, timer.endAt - Date.now()) : timer.remaining;
  const sec = Math.ceil(left / 1000);
  t.textContent = pad(Math.floor(sec / 60)) + ':' + pad(sec % 60);
  $('#tm-ring').style.strokeDashoffset = String(CIRC * (1 - (total ? (total - left) / total : 0)));
  $('#tm-start').textContent = timer.running ? 'Pause' : (left < total ? 'Resume' : 'Start');
  $('#tm-mode-label').textContent = MODE_LABEL[timer.mode];
  document.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === timer.mode)));
}
function setMode(m) {
  timer.mode = m; timer.running = false; timer.remaining = dur(m);
  paintTimer();
}
function startPause() {
  if (timer.running) {
    timer.remaining = Math.max(0, timer.endAt - Date.now());
    timer.running = false;
  } else {
    if (timer.remaining <= 0) timer.remaining = dur(timer.mode);
    timer.endAt = Date.now() + timer.remaining;
    timer.running = true;
    ensureAudio();
  }
  paintTimer();
}
function completeTimer() {
  timer.running = false; timer.remaining = 0;
  beep();
  let nextMode = 'focus';
  if (timer.mode === 'focus') {
    state.sessions.push({ id: uid(), subject: focusSubject, min: state.settings.focus, date: todayKey() });
    save();
    timer.count++;
    nextMode = timer.count % 4 === 0 ? 'long' : 'short';
    toast('Focus session logged: ' + state.settings.focus + ' minutes');
  } else {
    toast('Break over. Ready for the next session.');
  }
  setMode(nextMode);
  if (view === 'focus' || view === 'overview') render();
}
setInterval(() => {
  if (!timer.running) return;
  if (timer.endAt - Date.now() <= 0) completeTimer(); else paintTimer();
}, 250);

function viewFocus() {
  const ring = h('div', { class: 'ring' });
  ring.innerHTML = '<svg viewBox="0 0 220 220" aria-hidden="true"><circle cx="110" cy="110" r="96" fill="none" stroke="var(--line)" stroke-width="10"/>' +
    '<circle id="tm-ring" cx="110" cy="110" r="96" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round" ' +
    'stroke-dasharray="' + CIRC + '" stroke-dashoffset="' + CIRC + '" transform="rotate(-90 110 110)"/></svg>';
  ring.append(h('div', { class: 'ring-text' }, h('div', { id: 'tm-time' }, '25:00'), h('div', { id: 'tm-mode-label' }, 'Focus')));

  const subjSel = subjectSelect('f-subject', focusSubject, true);
  subjSel.addEventListener('change', () => { focusSubject = subjSel.value; });

  const len = (m, label) => {
    const i = h('input', { type: 'number', id: 'len-' + m, min: '1', max: '120', value: state.settings[m] });
    i.addEventListener('change', () => {
      const v = Math.min(120, Math.max(1, Math.round(Number(i.value) || state.settings[m])));
      i.value = String(v);
      state.settings[m] = v; save();
      if (!timer.running && timer.mode === m) timer.remaining = dur(m);
      paintTimer();
    });
    return field(label, 'len-' + m, i);
  };

  const timerCard = h('section', { class: 'panel timer' },
    h('div', { class: 'seg', role: 'group', 'aria-label': 'Timer mode' },
      ['focus', 'short', 'long'].map((m) => h('button', { type: 'button', 'data-mode': m, 'aria-pressed': 'false', onclick: () => setMode(m) }, MODE_LABEL[m]))),
    ring,
    h('div', { class: 'row' },
      h('button', { class: 'btn', id: 'tm-start', type: 'button', onclick: startPause }, 'Start'),
      h('button', { class: 'btn btn-ghost', type: 'button', onclick: () => setMode(timer.mode) }, 'Reset'),
      h('button', { class: 'btn btn-ghost', type: 'button', onclick: () => { if (timer.mode === 'focus') { setMode('short'); } else { setMode('focus'); } } }, 'Skip')),
    field('Studying', 'f-subject', subjSel),
    h('div', { class: 'lengths' }, len('focus', 'Focus (min)'), len('short', 'Short (min)'), len('long', 'Long (min)')));

  const todaySessions = state.sessions.filter((s) => s.date === todayKey());
  const totalToday = todaySessions.reduce((a, s) => a + s.min, 0);
  const mmsg = h('p', { class: 'msg', role: 'status' });
  const mSub = subjectSelect('m-subject', focusSubject, true);
  const mMin = h('input', { type: 'number', id: 'm-min', min: '1', max: '600', placeholder: '45' });
  const manual = h('form', { class: 'form', novalidate: true },
    field('Subject', 'm-subject', mSub), field('Minutes', 'm-min', mMin),
    h('button', { class: 'btn btn-ghost', type: 'submit' }, 'Log time'), mmsg);
  manual.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = Math.round(Number(mMin.value));
    if (!v || v < 1) { fieldError(mmsg, mMin, 'Enter the minutes you studied.'); return; }
    state.sessions.push({ id: uid(), subject: mSub.value, min: v, date: todayKey() });
    save(); render(); toast('Logged ' + fmtMin(v));
  });

  const side = h('div', { class: 'stack' },
    h('section', { class: 'panel' },
      h('div', { class: 'panel-head' }, h('h2', null, 'Today'), h('span', { class: 'mono' }, fmtMin(totalToday) + ' studied')),
      todaySessions.length
        ? h('ul', { class: 'rows' }, todaySessions.map((s) => h('li', null,
          h('span', { class: 'grow' }, fmtMin(s.min)), chip(s.subject),
          h('button', {
            class: 'icon-btn', type: 'button', 'aria-label': 'Delete ' + fmtMin(s.min) + ' session', title: 'Delete',
            onclick: () => removeWithUndo('sessions', s, 'Session')
          }, '×'))))
        : h('p', { class: 'empty' }, 'No sessions yet today. Start the timer to log one.')),
    h('section', { class: 'panel' },
      h('div', { class: 'panel-head' }, h('h2', null, 'Studied away from the timer?')),
      manual));

  const out = h('div', { class: 'grid-2' }, timerCard, side);
  setTimeout(paintTimer, 0);
  return out;
}
