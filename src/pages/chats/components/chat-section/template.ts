export default `
  <main class="chats-page-main-section">
    {{{ headerSection }}}
    {{{ messagesDisplayArea }}}
    <section class="message-input-section">
      <div class="attachment-block">
        <button class="attachment-button"></button>
      </div>
      <div class="input-block">
        <input type="text" name="message" placeholder="Сообщение">
      </div>
      <div class="submit-block">
        <button type="submit" class="send-button"></button>
      </div>
    </section>
  </main>
`;
