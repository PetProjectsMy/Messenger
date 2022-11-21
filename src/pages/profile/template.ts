export default `
      <main class="profile-page">
        {{{ header }}}
        {{{ profileDataForm }}}
        <nav class="profile-nav-section">
          <section class="data-change-section">
            <div>
              {{{ changeDataButton }}}
            </div>
            <div>
              <a class="change-password" href="#app">Изменить пароль</a>
            </div>
          </section>
          <section class="home-button-section">
            <div>
              {{{ homeButton }}}
            </div>
          </section>
          
          {{{ avatarUploadForm }}}
        </nav>
      </main>
`;
