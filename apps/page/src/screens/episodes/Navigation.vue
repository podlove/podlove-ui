<template>
  <div
    ref="navigation"
    class="w-full bottom-0 h-16 flex mt-0"
    :class="{ 'fixed top-0 z-40': docked, absolute: !docked }"
  >
    <div
      class="h-20 relative w-full flex items-center justify-center"
      :class="{ 'bg-white -mb-4': !docked, 'bg-transparent': docked }"
    >
      <span class="w-full absolute top-0 left" v-if="!docked"></span>
    </div>

    <div
      class="text-complementary-900 h-16 flex justify-center items-center py-4 px-8 w-full"
      :class="{ 'bg-primary-900 rounded-b': docked }"
    >
      <!-- Summary -->
      <button
        class="mx-4 font-light flex items-center overflow-visible"
        @click="scrollTo('summary')"
      >
        <summary-icon class="mr-3" />
        <span class="uppercase hidden md:block">{{ t('EPISODE.SUMMARY') }}</span>
      </button>
      <!-- Shownotes -->
      <button
        class="mx-4 font-light flex items-center overflow-visible"
        @click="scrollTo('shownotes')"
        v-if="shownotes"
      >
        <shownotes-icon class="mr-3" />
        <span class="uppercase hidden md:block">{{ t('EPISODE.SHOWNOTES') }}</span>
      </button>
      <!-- Timeline -->
      <button
        class="mx-4 font-light flex items-center justify-center overflow-visible"
        @click="scrollTo('timeline')"
      >
        <timeline-icon class="mr-3" />
        <span class="uppercase hidden md:block">{{ t('EPISODE.TIMELINE') }}</span>
      </button>
      <!-- Discuss -->
      <button
        v-if="discuss"
        class="mx-4 font-light flex items-center overflow-visible"
        @click="scrollTo('discuss')"
      >
        <discuss-icon class="mr-3" />
        <span class="uppercase hidden md:block">{{ t('EPISODE.DISCUSS') }}</span>
      </button>
    </div>

    <div class="h-20 relative w-full -mb-4" :class="{ 'bg-white -mb-4': !docked }">
      <span class="w-full absolute top-0 right" v-if="!docked"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import scrollIntoView from 'scroll-into-view-if-needed'
import { TimelineIcon, SummaryIcon, ShownotesIcon, DiscussIcon } from '@podlove/components';
import { onMounted } from 'vue';
import { throttle } from 'lodash-es';
import { useTranslations } from '@podlove/utils/translate';

const t = useTranslations();

defineProps<{
  shownotes: boolean;
  discuss: boolean;
  timeline: boolean;
}>()

const navigation: Ref<HTMLElement | null>  = ref(null);

const docked = ref(false);

const handleScroll = () => {
  const height = navigation.value?.clientHeight || 0
  const top = navigation.value?.offsetTop || 0
  const scroll = window.scrollY
  docked.value = scroll > height + top + 100
}

const scrollTo = (id: string) => {
  const node = document.getElementById(id)
  node && scrollIntoView(node, { behavior: 'smooth', scrollMode: 'always', block: 'start' })
}

onMounted(() => {
  handleScroll()
    window && window.addEventListener('scroll', throttle(handleScroll, 100))
})
</script>

<style scoped>

.docked {
  transition: z-index 300ms;
}
</style>
