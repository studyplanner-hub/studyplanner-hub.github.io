/* Register page: check the form, create the account, then open the planner. */
(function () {
  'use strict';

  const form = document.getElementById('register-form');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirm = document.getElementById('confirm');
  const showPassword = document.getElementById('show-password');
  const button = form.querySelector('button[type="submit"]');

  Validate.clearOnInput(form);

  // "Show passwords" switches both password boxes between hidden and plain text.
  showPassword.addEventListener('change', function () {
    const type = showPassword.checked ? 'text' : 'password';
    password.type = type;
    confirm.type = type;
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // stay on this page; JavaScript handles the form

    const ok = Validate.run(form, [
      [name, 'Enter your name.', (v) => v.trim() !== ''],
      [name, 'Name must be 2 to 50 characters.', (v) => v.trim().length >= 2 && v.trim().length <= 50],
      [email, 'Enter your email address.', (v) => v.trim() !== ''],
      [email, 'Enter an email like name@example.com.', Validate.isEmail],
      [password, 'Enter a password.', (v) => v !== ''],
      [password, 'Password must be at least 8 characters.', (v) => v.length >= 8],
      [password, 'Password needs at least one letter and one number.', (v) => /[A-Za-z]/.test(v) && /\d/.test(v)],
      [confirm, 'Type your password again.', (v) => v !== ''],
      [confirm, 'Passwords do not match.', (v) => v === password.value]
    ]);
    if (!ok) return;

    // Hashing is asynchronous, so disable the button to stop double submits.
    button.disabled = true;
    button.textContent = 'Creating account…';
    const result = await Auth.register(name.value, email.value, password.value);
    if (result.ok) {
      location.href = 'index.html';
      return;
    }
    button.disabled = false;
    button.textContent = 'Create account';
    if (result.field === 'email') {
      Validate.setError(email, result.error);
      email.focus();
    } else {
      Validate.setFormError(form, result.error);
    }
  });
})();
