/* eslint no-undef: 0 */
import Vue from 'vue/dist/vue.esm'

// Store
import store from './src/store'

// Translations
import VueI18n from 'vue-i18n'
import translations from './lang'
Vue.use(VueI18n)

// Tooltip
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

// Components
import components from './src/components'

// Mixins
import registerMixins from './src/mixins'
registerMixins(Vue)

// Use public path from application
__webpack_public_path__ = window.resourceBaseUrl || '/'

window.PODLOVE_STORE = store

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: translations
})

new Vue({
  el: '#app',
  components,
  i18n
})
