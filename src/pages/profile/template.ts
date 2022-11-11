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
          <section class="data-change-buttons">
            <div>
              {{{ changeDataButton }}}
            </div>
            <div>
              <a class="change-password" href="#app">Изменить пароль</a>
            </div>
          </section>
          <section class="home-button-section">
            {{{ homeButton }}}
          </section>
          <section class="avatar-change-section">
            <form class="avatar-change-form">
              <div class="browse-button-section">
                <input type="file"  accept="image/*" style="display:none;">
                <button type="button" id="upload-avatar">
                  upload avatar
                </button>
              </div>
              <div class="submit-button-section">
                <input type="submit" value="submit">
              </div>
            </form> 
          </section>
        </nav>
      </main>
`;
