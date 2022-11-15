export default `
  <main class="login-page">
    <form class="login-form">
      <legend>
        <h1>Login</h1>
      </legend>
      <fieldset class="form-fields">
        {{{ loginField }}}
        {{{ loginError }}}
        {{{ passwordField }}}
        {{{ passwordError }}}
        <div class="submit-button-section">
          {{{ submitButton }}}
        </div>
      </fieldset>
    </form>
  <nav class="form-links">
    <div class="sign-up-link-section">
      {{{ signUpLink }}}
    </div>
    <div class="index-page-link-section">
      {{{ homeButton }}}
    </div>
  </nav>
</main>

`;
