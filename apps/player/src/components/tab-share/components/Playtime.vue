<template>
  <input-checkbox
    data-test="tab-share--playtime"
    :label="t('SHARE.PLAYTIME', { playtime: toHumanTime(state.playtime) })"
    :value="state.content === 'time'"
    :color="state.color"
    :border-color="state.color"
    :background="state.background"
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
  color: select.theme.brandDark,
  background: select.theme.alt
});
const dispatch = injectStore().dispatch;

const toggleContent = () => {
  if (state.content === 'time') {
    return dispatch(selectContent('episode'));
  }

  return dispatch(selectContent('time'));
};
</script>
