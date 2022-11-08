export default `
  <main class="error-page">
    <div class="error-code-section">
      <h1 class="error-code">{{ errorCode }}</h1>
    </div>
    <div class="error-description-section">
      <div class="error-description">{{ errorDescription }}</div>
    </div>
    <div class="return-link-section">
      {{{ homeButton }}}
    </div> 
  </main>
`;
