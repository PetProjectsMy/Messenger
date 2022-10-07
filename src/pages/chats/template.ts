export const chatElementTemplate = `
<li class="chat-field">
<div class="avatar-section">
  {{{ avatarImage }}}
</div>
<div class="message-section">
  {{{ message }}}
</div>
</li>
`;

export const chatsPageTemplate = `
<div class="chats-page">
  <nav class="navigation-section">
    <header class="navigation-section-header">
      <div class="home-button-section">
        {{{ homeButton }}}
      </div>
      <div class="search-section">
        <input type="text" placeholder="Поиск">
      </div>
    </header>
    <ul class="chats-list">
      {{{ chats }}}
    </ul>
  </nav>
  <main class="main-section">
    <header class="main-section-header">
      <div class="avatar-section">
        {{{ avatarImage }}}
      </div>
      <div class="info-section">
        <span class="contact-name">Contact Name</span>
      </div>
    </header>
    <section class="chat-display-section">
      <div class="messages-display-area">
        <h1 class="message-placeholder">CHATTING AREA</h1>
      </div>
    </section>
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
