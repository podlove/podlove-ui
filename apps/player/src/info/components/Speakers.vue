<template lang="pug">
  <div class="contributors" v-if="contributors.length > 0">
      <h3 class="title">{{ $t('INFO.ON_AIR') }}</h3>
      <ul class="list" id="tab-info--contributors">
        <li class="contributor" v-for="(contributor, index) in contributors" v-bind:key="index">
          <img :src="contributor.avatar" class="shadowed avatar" :title="contributor.name" :alt="$t('A11Y.CONTRIBUTOR_COVER', { name: contributor.name })"/>
          <span class="name">{{ contributor.name }}</span>
        </li>
      </ul>
    </div>
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/select'

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
