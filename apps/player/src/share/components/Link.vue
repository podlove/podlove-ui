<template lang="pug">
  div.copy-link#tab-share--share-link
    input-group
      tooltip(:negative="negative" :content="$t('MESSAGES.COPIED')" trigger="click" @click="copyLink" slot="button")
        button-component.truncate
          span(aria-hidden="true") {{ $t('SHARE.ACTIONS.COPY') }}
          span.visually-hidden {{ $t('A11Y.COPY_SHARE_LINK') }}

      input-text#tab-share--share-link--input(slot="input" :disabled="true" :value="link")
</template>

<script>
  import { mapState } from 'redux-vuex'
  import copy from 'copy-to-clipboard'
  import { InputGroup, InputText, Button as ButtonComponent, Tooltip } from '@podlove/components'
  import { addQueryParameter } from '@podlove/utils/url'
  import { toHumanTime } from '@podlove/utils/time'

  import buttonColor from 'directives/button-color'
  import inputColor from 'directives/input-color'

  import select from 'store/selectors'

  export default {
    data: mapState({
      content: select.share.content,
      chapter: select.chapters.current,
      showLink: select.show.link,
      episodeLink: select.episode.link,
      playtime: select.playtime,
      negative: select.styles.negative,
      link: select.share.link
    }),

    methods: {
      copyLink() {
        copy(this.link)
      }
    },

    components: {
      InputGroup,
      ButtonComponent: buttonColor(ButtonComponent),
      InputText: inputColor(InputText),
      Tooltip
    }
  }
</script>
