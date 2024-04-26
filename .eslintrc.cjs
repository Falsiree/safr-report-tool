/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-promise-reject-errors': 'off',
    'prefer-regex-literals': 'off',
    'quote-props': ['warn', 'as-needed'],
    'semi': 'never',

    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  }
}