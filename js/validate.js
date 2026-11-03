/* Form validation helpers shared by the register, login and contact pages.

   The forms use the "novalidate" attribute, which turns off the browser's
   built-in error bubbles, so all checking happens here in JavaScript. That
   lets every page show the same style of message under the field it is about.

   Each input has an error paragraph next to it whose id is the input's id
   plus "-error", for example <input id="email"> and <p id="email-error">. */
var Validate = (function () {
  'use strict';

  // Something@something.something, with no spaces. Good enough to catch
  // typing mistakes; only sending an email can prove an address is real.
  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  // Shows a message under the input and marks the input as invalid, which
  // screen readers announce and the CSS outlines in red.
  function setError(input, message) {
    const box = document.getElementById(input.id + '-error');
    if (box) box.textContent = message;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input) {
    const box = document.getElementById(input.id + '-error');
    if (box) box.textContent = '';
    input.removeAttribute('aria-invalid');
  }

  function clearAll(form) {
    form.querySelectorAll('input, select, textarea').forEach(clearError);
    const formError = form.querySelector('.form-error');
    if (formError) formError.textContent = '';
  }

  // Message about the whole form, not one field (e.g. "Email or password is
  // incorrect").
  function setFormError(form, message) {
    const box = form.querySelector('.form-error');
    if (box) box.textContent = message;
  }

  // Runs a list of checks. Each check is [input, message, testFunction].
  // Every failing field gets its message; focus moves to the first one.
  // Returns true when everything passes.
  function run(form, checks) {
    clearAll(form);
    let first = null;
    checks.forEach(function (c) {
      const input = c[0], message = c[1], passes = c[2];
      if (input.getAttribute('aria-invalid') === 'true') return; // one message per field
      if (!passes(input.value)) {
        setError(input, message);
        if (!first) first = input;
      }
    });
    if (first) first.focus();
    return !first;
  }

  // Clear a field's error as soon as the user starts fixing it.
  function clearOnInput(form) {
    form.addEventListener('input', function (e) {
      if (e.target.getAttribute('aria-invalid') === 'true') clearError(e.target);
    });
  }

  return {
    isEmail: isEmail,
    setError: setError,
    clearAll: clearAll,
    setFormError: setFormError,
    run: run,
    clearOnInput: clearOnInput
  };
})();
