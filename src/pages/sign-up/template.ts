export default `
<main class="sign-up-page">
  <form class="sign-up-form">
    <legend>
      <h1>Sign Up</h1>
    </legend>
    <fieldset class="form-fields">
      {{{ emailField }}}
      {{{ emailError }}}
      {{{ loginField }}}
      {{{ loginError }}}
      {{{ firstNameField }}}
      {{{ firstNameError }}}
      {{{ secondNameField }}}
      {{{ secondNameError }}}
      {{{ phoneField }}}
      {{{ phoneError }}}
      {{{ passwordField }}}
      {{{ passwordError }}}
      {{{ passwordRepeatField }}}
      {{{ passwordRepeatError }}}
      <div class="submit-button-section">
        {{{ submitButton }}}
      </div>
    </fieldset>
  </form>
  <nav class="form-links">
    <div class="sign-in-link-section">
      {{{ signInLink }}}
    </div>
    <div class="index-page-link-section">
      {{{ homeButton }}}
    </div>
  </nav>
</main>
`;
