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
            md:mb-0 md:mr-8
            w-1/5
          "
        >
          <img
            :src="state.poster"
            :title="state.title"
            :width="150"
            :height="150"
            class="rounded block shadow-lg border border-complementary-700"
          />
        </div>
        <div class="flex flex-col items-center md:block w-4/5">
          <h1
            v-if="state.description"
            class="text-complementary-900 text-2xl text-center md:text-left lg:text-3xl mb-1 font-light"
          >
            {{ state.description }}
          </h1>
          <p
            v-if="state.summary"
            class="text-complementary-800 hidden md:block lg:text-xl w-10/12 md:text-lg font-extralight"
          >
            {{ state.summary }}
          </p>
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
