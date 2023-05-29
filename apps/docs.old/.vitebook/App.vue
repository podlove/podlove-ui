<script>
import './global.css';

export async function configureApp(app) {
  app.config.compilerOptions.isCustomElement = (tag) => ignoredComponents.includes(tag);
}
</script>

<script setup>
const { component } = defineProps({
  component: Object
});
</script>

<template>
  <component :is="component" />
</template>
