/* Starts the app. Each page says which view it shows with
   <body data-view="...">; render() draws that view into <main id="view">.
   Loaded last, because it needs every view file above. */
'use strict';

/* ---------- routing & render ---------- */
const RENDER = {
  overview: viewOverview, tasks: viewTasks, plans: viewPlans, schedule: viewSchedule,
  flashcards: viewFlashcards, focus: viewFocus, subjects: viewSubjects
};
function render() {
  $('#today-label').textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  $('#view').replaceChildren(RENDER[view]());
  document.querySelectorAll('.tabs a').forEach((a) => {
    if (a.dataset.view === view) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}
// Each HTML page says which view it shows with <body data-view="...">.
function route() {
  const v = document.body.dataset.view;
  view = VIEWS.indexOf(v) >= 0 ? v : 'overview';
  render();
}

// auth.js is already sending logged-out visitors to the login page, so only
// draw the page for a logged-in user.
if (Auth.currentUser()) route();
