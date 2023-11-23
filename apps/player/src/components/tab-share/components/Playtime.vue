<template>
  <input-checkbox
    class="podlove-player--tab-share--share-playtime"
    data-test="tab-share--share-playtime"
    :label="t('SHARE.PLAYTIME', { playtime: toHumanTime(state.playtime) })"
    :value="state.content === 'time'"
    @select="toggleContent"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { InputCheckbox } from '@podlove/components';
import { selectContent } from '@podlove/player-actions/share';
import { toHumanTime } from '@podlove/utils/time';
import { mapState, injectStore } from 'redux-vuex';

import select from '../../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  playtime: select.playtime,
  content: select.share.content,
});

const dispatch = injectStore().dispatch;

const toggleContent = () => {
  if (state.content === 'time') {
    return dispatch(selectContent('episode'));
  }

  return dispatch(selectContent('time'));
};
</script>

<style lang="postcss" scoped>
.podlove-player--tab-share--share-playtime {
  --podlove-component--checkbox--color: var(--podlove-player--tab-share--share-playtime--color);
  --podlove-component--checkbox--background: var(--podlove-player--tab-share--share-playtime--background);
  --podlove-component--checkbox--border: var(--podlove-player--tab-share--share-playtime--border);
}
</style>
