export default `
  <section class="chat-display-section">
    <div class="messages-display-section">
      {{#if userHasAnyChats}}
      {{else}}
        <h1 class="message-placeholder">NO CHATS CREATED</h1>
      {{/if}}
    </div>
  </section>;
`;
