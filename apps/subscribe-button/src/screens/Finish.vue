<template>
  <div class="p-6 mobile:p-4 mobile:text-xl max-w-xl w-full max-h-full bg-white">
    <div class="mb-6 mobile:mb-4 flex justify-between items-center rounded-sm">
      <button class="text-xl flex items-center" :title="$t('A11Y.BACK')" @click="back">
        <icon aria-hidden="true" type="arrow-to-left" class="mr-2" />
        <span>{{ $t('BACK_TO_LIST') }}</span>
      </button>
      <button :title="$t('A11Y.CLOSE')" @click="close">
        <icon aria-hidden="true" type="close" />
      </button>
    </div>
    <divider class="mb-6" :color="state.shadeBase"></divider>
    <finish-card class="text-base" />
  </div>
</template>

<script>
import { injectStore, mapState } from 'redux-vuex'
import Icon from '@podlove/components/icons'
import Divider from '@podlove/components/divider'
import FinishCard from 'components/finish-card'
import * as select from 'store/selectors'
import * as overlay from '@podlove/button-actions/overlay'
import * as list from '@podlove/button-actions/list'

export default {
  components: {
    Icon,
    Divider,
    FinishCard
  },
  setup() {
    return {
      state: mapState({
        shadeBase: select.theme.shadeBase
      }),
      dispatch: injectStore().dispatch
    }
  },
  methods: {
    close() {
      this.dispatch(overlay.hide())
    },
    back() {
      this.dispatch(list.show())
    }
  }
}
</script>
