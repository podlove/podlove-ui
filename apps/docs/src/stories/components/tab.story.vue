<script setup lang="ts">
import { ref } from 'vue';
import { TabHeader, TabHeaderItem, TabBody, InfoIcon } from '@podlove/components';
import { burntSienna, charcoal, persianGreen, sandyBrown } from '../colors.js';

const color = ref(sandyBrown);
const colorActive = ref(burntSienna);
const background = ref(charcoal);
const backgroundActive = ref(persianGreen);

const activeTab = ref('futurama');

const style = ref({
  '--podlove-component--tab-header-item--color': color,
  '--podlove-component--tab-header-item--color-active': colorActive,
  '--podlove-component--tab-header-item--background': background,
  '--podlove-component--tab-body--background': background,
  '--podlove-component--tab-header-item--background-active': backgroundActive
});

function selectTab(tab) {
  activeTab.value = tab;
}
</script>

<template>
  <Story title="Components/Tab" auto-props-disabled>
    <div class="text-white" :style="style">
      <tab-header>
        <tab-header-item
          name="futurama"
          :active="activeTab === 'futurama'"
          display="native"
          :index="0"
          @click="selectTab('futurama')"
        >
          <template #icon><info-icon /></template>
          <template #title><span>futurama</span></template>
        </tab-header-item>
        <tab-header-item
          name="dexter"
          :active="activeTab === 'dexter'"
          display="native"
          :index="0"
          @click="selectTab('dexter')"
        >
          <template #icon><info-icon /></template>
          <template #title><span>dexter</span></template>
        </tab-header-item>
      </tab-header>
      <tab-body
        v-if="activeTab === 'futurama'"
        ref="info"
        :active="activeTab === 'futurama'"
        name="futurama"
        :aria-selected="activeTab === 'futurama'"
      >
        <h1>Goodbye, friends. I never thought I'd die like this. But I always really hoped.</h1>
        <p>
          Large bet on myself in round one. Oh, how I wish I could believe or understand that!
          There's only one reasonable course of action now: kill Flexo! You guys go on without me!
          I'm going to go… look for more stuff to steal!
        </p>
        <p>
          Also Zoidberg. That could be 'my' beautiful soul sitting naked on a couch.
          <strong> If I could just learn to play this stupid thing.</strong>
          <em> Ah, the 'Breakfast Club' soundtrack!</em> I can't wait til I'm old enough to feel
          ways about stuff!
        </p>
        <h2>With gusto.</h2>
        <p>
          No argument here. Can we have Bender Burgers again? Ah, the 'Breakfast Club' soundtrack! I
          can't wait til I'm old enough to feel ways about stuff! I'll get my kit! You mean while
          I'm sleeping in it?
        </p>
        <ol>
          <li>
            And so we say goodbye to our beloved pet, Nibbler, who's gone to a place where I, too,
            hope one day to go. The toilet.
          </li>
          <li>This is the worst part. The calm before the battle.</li>
          <li>She also liked to shut up!</li>
        </ol>
      </tab-body>

      <tab-body
        v-if="activeTab === 'dexter'"
        ref="info"
        :active="activeTab === 'dexter'"
        name="dexter"
        :aria-selected="activeTab === 'dexter'"
      >
        <h1>
          I've lived in darkness a long time. Over the years my eyes adjusted until the dark became
          my world and I could see.
        </h1>
        <p>
          I will not kill my sister. I will not kill my sister. I will not kill my sister. I've
          lived in darkness a long time. Over the years my eyes adjusted until the dark became my
          world and I could see. I'm Dexter, and I'm not sure what I am.
        </p>
        <p>
          I'm Dexter, and I'm not sure what I am. <strong> I like seafood.</strong>
          <em> This man is a knight in shining armor.</em> Makes me a … scientist.
        </p>
        <h2>You look…perfect.</h2>
        <p>
          I've lived in darkness a long time. Over the years my eyes adjusted until the dark became
          my world and I could see. Under normal circumstances, I'd take that as a compliment. Under
          normal circumstances, I'd take that as a compliment.
        </p>
        <ol>
          <li>
            I've lived in darkness a long time. Over the years my eyes adjusted until the dark
            became my world and I could see.
          </li>
          <li>Makes me a … scientist.</li>
          <li>I love Halloween. The one time of year when everyone wears a mask … not just me.</li>
        </ol>
      </tab-body>
    </div>

    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="colorActive" title="Color Active" />
      <HstColor v-model="background" title="Background" />
      <HstColor v-model="backgroundActive" title="Background Active" />
    </template>
  </Story>
</template>
