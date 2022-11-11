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
        </nav>
      </main>
`;

const a = `
<section class="avatar-change-section">
<form class="avatar-change-form">
  <div>
    <input id="avatar" type="file" name="avatar" accept="image/*">
  </div>
  <div>
    <input type="submit" value="submit">
  </div>
</form> 
</section>
`;
