import Vue from 'vue'
import App from './src'
import store from './src/store'

// window.PODLOVE_STORE = store;

console.log(store)
new Vue({
  // i18n,
  el: document.getElementsByTagName('subscribe-button')[0],
  render: h => h(App)
})
