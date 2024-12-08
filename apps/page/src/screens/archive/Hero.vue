<template>
  <header-container>
    <div class="lg:w-app flex font-light items-center flex-col mt-6">
      <div class="flex flex-col items-center md:items-start md:flex-row">
        <div
          v-if="state.poster"
          class="
            flex
            landing-poster
            items-center
            justify-center
            sm:items-start
            mb-4
            md:mb-0 md:mr-8 md:mt-1
            w-1/5
          "
        >
          <div
            :style="{backgroundImage: `url(${state.poster})`}"
            class="shadow-lg border rounded border-complementary-800 w-[150px] h-[150px] bg-cover"
          ></div>
        </div>
        <div class="flex flex-col items-center md:block w-4/5">
          <template  v-if="state.description">
            <h1
              v-html="state.description"
              class="text-complementary-900 text-2xl text-center md:text-left lg:text-3xl font-light line-clamp-2 mb-2"
            ></h1>
          </template>
          <template v-if="state.summary">
            <p
            v-html="state.summary"
            class="text-complementary-800 hidden md:line-clamp-5 lg:text-xl md:text-lg font-extralight"
            ></p>
          </template>
        </div>
      </div>
    </div>
  </header-container>
</template>

<script setup lang="ts">
import { mapState } from 'redux-vuex';
import { selectors } from '../../logic';
import HeaderContainer from '../../components/HeaderContainer.vue';

const state = mapState({
  poster: selectors.podcast.poster,
  title: selectors.podcast.title,
  description: selectors.podcast.description,
  summary: selectors.podcast.summary
});
</script>
