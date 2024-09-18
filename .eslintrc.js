module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.VUE_APP_PRODUCTION === 'live' ? 'warn' : 'off',
    'no-debugger': process.env.VUE_APP_PRODUCTION === 'live' ? 'warn' : 'off',
    'linebreak-style': ['error', 'windows'],
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-unused-components': 'off',
    'linebreak-style': 'off',
  },
};
