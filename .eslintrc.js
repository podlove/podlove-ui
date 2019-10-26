module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
    'cypress/globals': true
  },
  plugins: ['jest', 'cypress'],
  extends: ['@vue/prettier', 'plugin:vue/recommended'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'require-yield': ['warn'],
    'prettier/prettier': ['error'],
    'vue/no-v-html': 0,
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/no-shared-component-data': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/html-self-closing': 0,
    'generator-star-spacing': 0
  }
}
