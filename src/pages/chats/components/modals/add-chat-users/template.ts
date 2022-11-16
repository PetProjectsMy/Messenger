export default `
    <div class="modal-content">
      <section class="users-data-input-section">
        <div class="idenrifierss-input-section">
          {{{ usersIdenifiersInput }}}
        </div>
      </section>
      
      <section class="submit-button-section">
        {{{ submitButton }}}
      </section>

      <section claas="api-response-status">
        {{#if apiResponseSuccess}}
          <span class="api-success"> {{apiResponseSuccess}} </span>
        {{/if}}
        {{#if apiResponseError}}
          <span class="api-error"> {{apiResponseError}} </span>
        {{/if}}
      </section>
    </div>
`;
