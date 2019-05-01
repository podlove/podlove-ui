import Vue from 'vue'
import { head } from 'ramda'
import { App, i18n } from './player'

new Vue({
  i18n,
  el: head(document.getElementsByTagName('podlove-player')),
  render: h => h(App)
})
