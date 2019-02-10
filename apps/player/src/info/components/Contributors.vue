<template lang="pug">
  div.contributors(v-if="contributors.length > 0")
    h3.title {{ $t('INFO.ON_AIR') }}
    ul.list#tab-info--contributors
      li.contributor(v-for="(contributor, index) in contributors" :key="index")
        img.shadowed.avatar(:src="contributor.avatar" title="contributor.name" :alt="$t('A11Y.CONTRIBUTOR_COVER', { name: contributor.name })")
        span.name {{ contributor.name }}
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  data: mapState({
    contributors: select.contributors
  })
}
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .contributors {
    .list {
      display: flex;
      flex-wrap: wrap;
    }

    .contributor {
      display: flex;
      width: 33%;
      padding: ($padding / 2);
      overflow: hidden;
      align-items: center;
    }

    .avatar {
      border-radius: 4px;
      width: $info-contributor-avatar-size;
      height: auto;
      margin: $margin / 4;
    }

    .name {
      display: block;
      margin: $margin / 4;
    }
  }

  @media screen and (max-width: $width-m) {
    .contributors {
      .contributor {
        width: 100%;
      }
    }
  }

  @media screen and (min-width: $width-m) and (max-width: $width-l) {
    .contributors {
      .contributor {
        width: 50%;
      }
    }
  }

</style>
