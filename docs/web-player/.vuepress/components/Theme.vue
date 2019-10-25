<template>
  <div class="container">
    <podlove-web-player :episode="episode" :config="config" @ready="onReady" />
    <ClientOnly v-if="initialized">
      <h3>Tokens</h3>
      <div class="row">
        <div class="column">
          <token
            class="token"
            v-for="(name, index) in tokenList"
            :name="name"
            :color="token(name)"
            :active="selected === name"
            @select="select"
            :key="index"
          />
        </div>
        <div class="column">
          <picker class="picker" v-model="tokens[selected]" />
        </div>
      </div>
      <h4>Json</h4>
      <div class="editor">
        <json-editor :json="json" @update="setJson" height="250px" />
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import { propOr, pathOr } from 'ramda'
import { Sketch } from 'vue-color'
import { json } from '@podlove/utils/request'
import { SET_THEME } from '@podlove/player-actions/types'

import PodloveWebPlayer from './PodloveWebPlayer'
import JsonEditor from './JsonEditor'
import Token from './Token'

export default {
  props: ['episode', 'config'],
  name: 'ColorPicker',
  data() {
    return {
      store: null,
      initialized: false,
      selected: 'brand',
      tokens: {
        brand: null,
        brandDark: null,
        brandDarkest: null,
        brandLightest: null,
        shadeDark: null,
        shadeBase: null,
        contrast: null,
        alt: null
      }
    }
  },
  components: {
    picker: Sketch,
    PodloveWebPlayer,
    Token,
    JsonEditor
  },
  methods: {
    onReady(store) {
      this.store = store
    },

    updateTokens(tokens) {
      Object.keys(tokens).forEach(token => {
        this.tokens[token] = tokens[token]
      })
    },

    setJson(json) {
      const tokens = pathOr({}, ['theme', 'tokens'], json)
      this.updateTokens(tokens)
    },

    token(tok) {
      const token = propOr('#fff', tok, this.tokens)

      if (token.hex8) {
        return token.hex8
      }

      return token
    },

    select(token) {
      this.selected = token
    },

    updatePlayer() {
      this.store &&
        this.store.dispatch({
          type: SET_THEME,
          payload: {
            version: 5,
            theme: {
              tokens: {
                brand: this.token('brand'),
                brandDark: this.token('brandDark'),
                brandDarkest: this.token('brandDarkest'),
                brandLightest: this.token('brandLightest'),
                shadeDark: this.token('shadeDark'),
                shadeBase: this.token('shadeBase'),
                contrast: this.token('contrast'),
                alt: this.token('alt')
              }
            }
          }
        })
    }
  },
  computed: {
    tokenList() {
      return Object.keys(this.tokens)
    },

    json() {
      return {
        theme: {
          tokens: {
            brand: this.token('brand'),
            brandDark: this.token('brandDark'),
            brandDarkest: this.token('brandDarkest'),
            brandLightest: this.token('brandLightest'),
            shadeDark: this.token('shadeDark'),
            shadeBase: this.token('shadeBase'),
            contrast: this.token('contrast'),
            alt: this.token('alt')
          }
        }
      }
    }
  },
  async mounted() {
    const { tokens } = await json(this.config).then(propOr({ tokens: {} }, 'theme'))
    this.updateTokens(tokens)

    this.initialized = true
  },
  watch: {
    tokens: {
      deep: true,
      handler() {
        this.updatePlayer()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.row,
.editor {
  margin-bottom: 1.5em;
}

.token {
  margin-bottom: 0.5em;
}
</style>

