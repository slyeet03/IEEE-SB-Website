// eslint-disable-next-line no-undef
/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true, // This allows the use of Node.js global variables and modules
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // Add any specific rules here
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    'react/prop-types': 'off', // If you're not using PropTypes
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

// eslint-disable-next-line no-undef
module.exports = config;

