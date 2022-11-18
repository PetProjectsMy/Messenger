export default `
  <section class="chat-display-section">
    <div class="messages-display-section">
      <ul class="messages-list">
        {{{ messagesList }}}
      </ul>      
      {{#if chatAbsenceWarning }}
        <h1 class="message-placeholder"> {{ chatAbsenceWarning }}</h1>
      {{/if}}
    </div>
  </section>;
`;
