const config = {
  "./**/*.ts": ["yarn run lint:code"],
  "./**/.less": ["yarn run lint:styles"],
};

module.exports = config;
