<template>
  <div class="m-6 p-6 mobile:p-4 max-w-xl w-full max-h-full bg-white overflow-y-auto rounded-sm">
    <div class="mb-6 mobile:mb-4 flex justify-between items-center">
      <h1 class="tablet:text-2xl mobile:text-xl" :style="font">
        {{ $t('SUBSCRIBE') }}
      </h1>
      <button @click="close">
        <icon type="close" />
      </button>
    </div>
    <divider class="mb-6" :color="shadeBase"></divider>
    <client-list @click="finish" />
  </div>
</template>

<script>
import { mapState } from 'redux-vuex'
import { Icon, Divider } from '@podlove/components'
import { compose } from 'ramda'
import ClientList from 'components/client-list'
import store from 'store'
import * as select from 'store/selectors'
import * as overlay from '@podlove/button-actions/overlay'
import * as finishCard from '@podlove/button-actions/finish-card'

export default {
  components: {
    Icon,
    Divider,
    ClientList
  },
  data: mapState({
    font: select.theme.fontCi,
    shadeBase: select.theme.shadeBase
  }),
  methods: {
    close: compose(store.dispatch, overlay.hide),
    finish: compose(store.dispatch, finishCard.show)
  }
}
</script>
