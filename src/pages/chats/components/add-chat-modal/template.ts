export default `
  <div class="modal">
    <div class="modal-content">
      <section class="title-input-section">
        {{{ chattTitleInput }}}
      </section>

      <section class="title-input-section">
        {{{ createChatButton }}}
      </section>

      {{#if apiResponseSuccess}}
        <span class="api-success"> {{apiResponseSuccess}} </span>
      {{/if}}
      {{#if apiResponseError}}
        <span class="api-error"> {{apiResponseError}} </span>
      {{/if}}

      {{{ closeButton }}}
    </div>
  </div>;
`;
