export default `
  <div class="submit-button-section">
    {{{ submitButton }}}
    {{#if uploadingStatus }}
      <span>{{ uploadingStatus }}</span>
    {{/if}}
  </div>
`;
