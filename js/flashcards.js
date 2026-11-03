/* Flashcards page: decks, study sessions with spaced repetition (Leitner
   boxes), and the add-card form. Needs: state.js. */
'use strict';

/* ---------- flashcards ---------- */
let cardDeck = '*';
let study = null;
const deckName = (id) => { const p = state.plans.find((x) => x.id === id); return p ? p.name : 'General'; };
function dueCards(deck) {
  const tk = todayKey();
  return state.cards.filter((c) => c.due <= tk && (deck === '*' || c.planId === deck));
}

function studyPanel(paint) {
  // If the chosen deck's plan was deleted, fall back to all decks
  // (otherwise the dropdown shows blank and no cards appear).
  if (cardDeck !== '*' && cardDeck !== '' && !state.plans.some((p) => p.id === cardDeck)) cardDeck = '*';
  const decks = [['*', 'All decks'], ['', 'General']].concat(state.plans.map((p) => [p.id, p.name]));
  const sel = h('select', { id: 'c-deck', 'aria-label': 'Deck to study' }, decks.map((d) => h('option', { value: d[0] }, d[1])));
  sel.value = cardDeck;
  sel.addEventListener('change', () => { cardDeck = sel.value; study = null; paint(); });
  const head = h('div', { class: 'panel-head' }, h('h2', null, 'Study'), h('div', { style: 'min-width:180px;max-width:100%' }, sel));
  const inDeck = state.cards.filter((c) => cardDeck === '*' || c.planId === cardDeck);
  const due = dueCards(cardDeck);

  if (!study) {
    if (!inDeck.length) return h('div', null, head, h('p', { class: 'empty' }, 'No cards in this deck yet. Add one below.'));
    const start = (ids) => { study = { queue: ids.map((c) => c.id), i: 0, flipped: false, right: 0, wrong: 0 }; paint(); };
    const next = inDeck.map((c) => c.due).sort()[0];
    return h('div', null, head,
      h('p', null, due.length
        ? due.length + ' of ' + inDeck.length + ' cards due today.'
        : 'You are caught up. The next review is ' + fmtDueInline(next) + '.'),
      h('div', { class: 'row', style: 'margin-top:12px' },
        h('button', { class: 'btn', type: 'button', disabled: !due.length, onclick: () => start(due) }, 'Study due cards'),
        h('button', { class: 'btn btn-ghost', type: 'button', onclick: () => start(inDeck) }, 'Review all ' + inDeck.length)));
  }

  if (study.i >= study.queue.length) {
    const total = study.right + study.wrong;
    return h('div', null, head,
      h('div', { class: 'qcard' },
        h('div', { class: 'q' }, 'Session complete'),
        h('p', null, study.right + ' of ' + total + ' remembered. Cards you missed come back tomorrow.')),
      h('div', { class: 'row', style: 'margin-top:12px' },
        h('button', { class: 'btn', type: 'button', onclick: () => { study = null; render(); } }, 'Done')));
  }

  const card = state.cards.find((c) => c.id === study.queue[study.i]);
  const rate = (ok) => {
    if (card) {
      card.box = ok ? Math.min(5, card.box + 1) : 1;
      card.due = key(addDays(new Date(), INTERVALS[card.box]));
      state.reviewLog[todayKey()] = (state.reviewLog[todayKey()] || 0) + 1;
    }
    if (ok) study.right++; else study.wrong++;
    study.i++; study.flipped = false;
    save(); paint();
  };
  if (!card) { study.i++; return studyPanel(paint); }
  const pct = (study.i / study.queue.length) * 100;
  const show = h('button', { class: 'btn', type: 'button', onclick: () => { study.flipped = true; paint(); } }, 'Show answer');
  const out = h('div', null, head,
    h('div', { class: 'goal-top', style: 'margin-bottom:8px' },
      h('span', { class: 'mono' }, 'Card ' + (study.i + 1) + ' of ' + study.queue.length),
      card.topic ? h('span', { class: 'tag' }, card.topic) : null),
    h('div', { class: 'track', style: '--c:var(--accent);margin-bottom:12px' }, h('div', { class: 'fill', style: 'width:' + pct + '%' })),
    h('div', { class: 'qcard' },
      h('div', { class: 'q' }, card.q),
      study.flipped ? h('div', { class: 'a' }, card.a) : null),
    h('div', { class: 'row', style: 'margin-top:12px' },
      study.flipped
        ? [h('button', { class: 'btn btn-ghost', type: 'button', onclick: () => rate(false) }, 'Missed it'),
          h('button', { class: 'btn', type: 'button', onclick: () => rate(true) }, 'Got it')]
        : show));
  setTimeout(() => { if (!study.flipped) show.focus(); }, 0);
  return out;
}

function viewFlashcards() {
  const wrap = h('div', { class: 'stack' });
  const slot = h('section', { class: 'panel' });
  const paint = () => slot.replaceChildren(studyPanel(paint));
  paint();

  const msg = h('p', { class: 'msg', role: 'status' });
  const deck = h('select', { id: 'a-deck' }, h('option', { value: '' }, 'General'), state.plans.map((p) => h('option', { value: p.id }, p.name)));
  if (cardDeck !== '*') deck.value = cardDeck;
  const topic = h('input', { type: 'text', id: 'a-topic', placeholder: 'Optional, e.g. Hash Tables', autocomplete: 'off' });
  const q = h('textarea', { id: 'a-q', rows: '3', placeholder: 'What is the time complexity of binary search?' });
  const a = h('textarea', { id: 'a-a', rows: '3', placeholder: 'O(log n), because each step halves the range.' });
  const form = h('form', { class: 'panel form', novalidate: true },
    field('Deck', 'a-deck', deck), field('Topic', 'a-topic', topic),
    field('Question', 'a-q', q, 'wide'), field('Answer', 'a-a', a, 'wide'),
    h('button', { class: 'btn', type: 'submit' }, 'Add card'), msg);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!q.value.trim() || !a.value.trim()) { fieldError(msg, q.value.trim() ? a : q, 'Write both a question and an answer.'); return; }
    state.cards.push({ id: uid(), planId: deck.value, topic: topic.value.trim(), q: q.value.trim(), a: a.value.trim(), box: 1, due: todayKey() });
    save(); render(); toast('Card added');
  });

  const list = h('details', { class: 'panel' },
    h('summary', { style: 'cursor:pointer;font-weight:600' }, 'All cards (' + state.cards.length + ')'),
    state.cards.length
      ? h('ul', { class: 'rows', style: 'margin-top:10px' }, state.cards.map((c) => h('li', null,
        h('span', { class: 'grow' }, c.q),
        h('span', { class: 'tag' }, deckName(c.planId)),
        h('span', { class: 'mono' }, 'Box ' + c.box + ' · ' + fmtDueInline(c.due)),
        h('button', {
          class: 'icon-btn', type: 'button', 'aria-label': 'Delete card: ' + c.q, title: 'Delete',
          onclick: () => removeWithUndo('cards', c, 'Card')
        }, '×'))))
      : h('p', { class: 'empty' }, 'No cards yet.'));

  wrap.append(slot, form, list);
  return wrap;
}
