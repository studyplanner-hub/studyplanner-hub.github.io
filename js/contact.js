/* Contact page: check the form, store the message in localStorage, and list
   the messages sent from this browser.

   Storage: sp-messages  [ { id, name, email, topic, message, sentAt } ] */
(function () {
  'use strict';

  const MESSAGES_KEY = 'sp-messages';
  const TOPICS = { question: 'General question', bug: 'Report a bug', idea: 'Suggest a feature' };

  const form = document.getElementById('contact-form');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const topic = document.getElementById('topic');
  const message = document.getElementById('message');
  const count = document.getElementById('message-count');
  const success = document.getElementById('contact-success');
  const list = document.getElementById('sent-list');

  function readMessages() {
    try { return JSON.parse(localStorage.getItem(MESSAGES_KEY)) || []; } catch (e) { return []; }
  }

  // Logged-in users do not need to type their name and email again.
  const user = Auth.currentUser();
  if (user) {
    name.value = user.name;
    email.value = user.email;
  }

  // Live character counter under the message box.
  function updateCount() {
    count.textContent = message.value.length + ' / 1000 characters';
  }
  message.addEventListener('input', updateCount);

  // Newest first. textContent (not innerHTML) is used for everything the
  // user typed, so text like <script> is shown as plain text, never run.
  // Only the logged-in user's own messages are listed, so on a shared
  // computer one person cannot read what another person sent.
  function renderList() {
    list.replaceChildren();
    const empty = function (text) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = text;
      list.append(li);
    };
    if (!user) { empty('Log in to see the messages you have sent.'); return; }
    const messages = readMessages().filter((m) => m.email === user.email);
    if (!messages.length) { empty('No messages yet.'); return; }
    messages.slice().reverse().forEach(function (m) {
      const li = document.createElement('li');
      const head = document.createElement('p');
      head.className = 'sent-head';
      head.textContent = TOPICS[m.topic] + ' · ' + new Date(m.sentAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
      const body = document.createElement('p');
      body.textContent = m.message;
      li.append(head, body);
      list.append(li);
    });
  }

  Validate.clearOnInput(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    success.textContent = '';

    const ok = Validate.run(form, [
      [name, 'Enter your name.', (v) => v.trim() !== ''],
      [email, 'Enter your email address.', (v) => v.trim() !== ''],
      [email, 'Enter an email like name@example.com.', Validate.isEmail],
      [topic, 'Choose a topic.', (v) => v !== ''],
      [message, 'Write your message.', (v) => v.trim() !== ''],
      [message, 'Message must be at least 10 characters.', (v) => v.trim().length >= 10]
    ]);
    if (!ok) return;

    const messages = readMessages();
    messages.push({
      id: Date.now().toString(36),
      name: name.value.trim(),
      email: Auth.normEmail(email.value),
      topic: topic.value,
      message: message.value.trim(),
      sentAt: new Date().toISOString()
    });
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch (err) {
      Validate.setFormError(form, 'Could not save your message. Storage may be full or blocked.');
      return;
    }

    // Keep name and email for the next message; clear the rest.
    topic.value = '';
    message.value = '';
    updateCount();
    success.textContent = 'Thanks, ' + name.value.trim() + '. Your message has been sent.';
    renderList();
  });

  renderList();
})();
