import './style.css';
import { defineSetupVue3 } from '@histoire/plugin-vue';
import ColorPicker from './components/ColorPicker.vue';

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.component('HstColor', ColorPicker);
});
