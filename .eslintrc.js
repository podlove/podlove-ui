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
    'jest/globals': true
  },
  plugins: ['jest'],
  extends: [
    'prettier',
    'prettier/standard',
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'require-yield': ['warn'],
    'prettier/prettier': ['error'],
    'vue/no-v-html': 'warning',
    'vue/component-name-in-template-casing': 'kebab-case',
    'vue/no-shared-component-data': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-self-closing': 'off',
    'generator-star-spacing': ['error', 'both']
  }
}
