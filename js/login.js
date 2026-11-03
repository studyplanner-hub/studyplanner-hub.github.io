/* Login page: check the form, verify the password, then go to the page the
   user was trying to open (or the overview). */
(function () {
  'use strict';

  const form = document.getElementById('login-form');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const remember = document.getElementById('remember');
  const button = form.querySelector('button[type="submit"]');

  Validate.clearOnInput(form);

  // Arrived here from a protected page? Say why.
  if (new URLSearchParams(location.search).has('next')) {
    document.getElementById('login-reason').textContent = 'Please log in to open that page.';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const ok = Validate.run(form, [
      [email, 'Enter your email address.', (v) => v.trim() !== ''],
      [email, 'Enter an email like name@example.com.', Validate.isEmail],
      [password, 'Enter your password.', (v) => v !== '']
    ]);
    if (!ok) return;

    button.disabled = true;
    button.textContent = 'Logging in…';
    const result = await Auth.login(email.value, password.value, remember.checked);
    if (result.ok) {
      location.href = Auth.nextPage();
      return;
    }
    button.disabled = false;
    button.textContent = 'Log in';
    password.value = '';
    Validate.setFormError(form, result.error);
    password.focus();
  });
})();
