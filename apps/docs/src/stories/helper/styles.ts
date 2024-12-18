import { Ref } from 'vue';

export const inlineStyles = (input: Ref<{ [key: string]: string }>) =>
  `\n` + Object.entries(input.value)
    .map(([key, value]) => `${key}: ${value}`)
    .join(';\n');
