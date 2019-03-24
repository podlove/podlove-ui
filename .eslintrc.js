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
    node: true
  },
  extends: ['@vue/prettier', 'plugin:vue/recommended'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'require-yield': ['warn'],
    'prettier/prettier': ['error'],
    'generator-star-spacing': ['error', 'both'],
    'vue/no-v-html': 'warning',
    'vue/component-name-in-template-casing': 'kebab-case',
    'vue/no-shared-component-data': 'off'
  }
}
