/* The "More" menu in the phone bottom bar (a <details> element, so it opens
   and closes without JavaScript). This file adds the expected extras:
   it closes when you tap outside it, press Escape, or pick a link.
   Loaded on every page that has the main navigation. Needs: nothing. */
'use strict';

(function () {
  const more = document.querySelector('.nav-more');
  if (!more) return;
  document.addEventListener('click', (e) => {
    if (more.open && !more.contains(e.target)) more.open = false;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && more.open) {
      more.open = false;
      more.querySelector('summary').focus();
    }
  });
  more.addEventListener('click', (e) => {
    if (e.target.closest('a')) more.open = false;
  });
})();
