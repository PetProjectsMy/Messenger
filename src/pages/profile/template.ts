export default `
      <main class="profile-data-form">
        <header class="profile-form-header">
          <div class="image-section">
            {{{ avatarImage }}}
          </div>
          <div class="name-section">
            <span class="user-name">username</span>
          </div>
        </header>
        <ul class="profile-data-fields">
            {{{ profileDataFields }}}
        </ul>
        <nav class="profile-nav-section">
          {{{ changeDataButton }}}
          <a class="change-password" href="#app">Изменить пароль</a>
          {{{ homeButton }}}
        </nav>
      </main>
`;
