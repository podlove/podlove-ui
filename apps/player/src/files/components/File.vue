<template lang="pug">
  div.file
    file-icon(:type="icon" aria-hidden="true")
    div.file-meta.truncate
      div.file-type.truncate {{ file.title }}
      div.file-info.truncate
        span.file-size(v-if="file.size") {{ toMegabyte(file.size) }} MB
        span(v-if="file.size") ⋅
        span.file-ending(v-if="file.mimeType") {{ file.mimeType }}

    div.file-actions
      tooltip(:negative="negative" :content="$t('MESSAGES.COPIED')" trigger="click" @click="copyUrl")
        button-component.file-action(variant="light")
          icon(type="link" aria-hidden="true")
          span.visually-hidden {{ $t('A11Y.COPY_FILE', file) }}

      button-component.file-action(:href="file.url" type="link" download)
        span.file-action-text(aria-hidden="true") {{ $t('FILES.ACTIONS.DOWNLOAD') }}
        span.file-action-icon(aria-hidden="true")
          icon(type="download")
        span.visually-hidden {{ $t('A11Y.DOWNLOAD_FILE', file) }}
</template>

<script>
  import { mapState } from 'redux-vuex'
  import copy from 'copy-to-clipboard'
  import { Button as ButtonComponent, Icon, Tooltip } from '@podlove/components'
  import { toMegabyte } from '@podlove/utils/math'
  import buttonColor from 'directives/button-color'

  import select from 'store/selectors'

  import FileIcon from './FileIcon'

  export default {
    data: mapState({
      negative: select.styles.negative
    }),

    props: {
      icon: {
        type: String
      },
      file: {
        type: Object,
        default: () => ({
          title: null,
          size: null,
          mimeType: null,
          url: null
        })
      }
    },

    methods: {
      toMegabyte,
      copyUrl() {
        copy(this.file.url)
      }
    },

    components: {
      ButtonComponent: buttonColor(ButtonComponent),
      Tooltip,
      FileIcon,
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .file {
    display: flex;
    margin-bottom: 1em;

    &:last-child {
      margin-bottom: 0;
    }

    .file-info {
      opacity: 0.8;
    }

    .file-type {
      font-weight: 500;
    }

    .file-meta {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: calc(100% - #{$files-icon-width} - #{$files-actions-width} - #{$margin});
      line-height: 1.2em;
      margin-left: $margin;
    }

    .file-actions {
      display: flex;
      justify-content: flex-end;
      width: $files-actions-width;
      margin-left: $margin * 2;

      .file-action-text {
        display: block;
      }

      .file-action-icon {
        display: none;
      }

      .file-input-button {
        margin-left: 1em;
      }

      .file-action {
        margin-left: $margin;
      }
    }
  }


  @media screen and (max-width: $width-m) {
    .file-file {
      .file-icon {
        display: none;
      }

      .file-meta {
        width: calc(100% - #{$files-icon-width * 2});
        margin-left: 0;
      }

      .file-actions {
        .file-action-text {
          display: none;
        }

        .file-action-icon {
          display: block;
        }
      }
    }
  }
</style>
