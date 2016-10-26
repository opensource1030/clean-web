module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
  },
  env: {
    browser: true,
    node: true,
  },

  // using AirBnB's sensible rules
  extends: 'airbnb-base',

  // required to lint *.vue files
  plugins: [
    'html',
  ],
};
