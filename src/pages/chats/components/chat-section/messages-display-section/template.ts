export default `
  <section class="chat-display-section">
    <div class="messages-display-section">
      {{{ messagesList }}}  
      
      {{#if chatAbsenceWarning }}
        <h1 class="message-placeholder"> {{ chatAbsenceWarning }}</h1>
      {{/if}}
    </div>
  </section>;
`;
