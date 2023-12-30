<template>
  <div>
    TEST! {{ test }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

  const test = ref(0);

  setInterval(() => {
    test.value = test.value + 1;
  }, 1000);
</script>
