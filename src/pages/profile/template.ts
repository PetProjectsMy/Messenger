export default `
      <main class="profile-page">
        <header class="profile-form-header">
          <div class="image-section">
            {{{ avatarImage }}}
          </div>
          <div class="name-section">
            <span class="user-id">ID: {{ userID }}</span>
          </div>
        </header>
        {{{ profileDataForm }}}
        <nav class="profile-nav-section">
          {{{ changeDataButton }}}
          <a class="change-password" href="#app">Изменить пароль</a>
          {{{ homeButton }}}
        </nav>
      </main>
`;
