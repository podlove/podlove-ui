import ChapterButton from './ChapterButton.vue'

export default {
  title: 'ChapterButton',
  component: ChapterButton,
};

const Template = (args, { argTypes }) => ({
  components: { ChapterButton },
  props: Object.keys(argTypes),
  template: `
  <chapter-button
    :type="type"
    :color="color"
    @click="onClick"
  >
  </chapter-button>
  `
});

export const Default = Template.bind({});

Default.args = {
  color: '#000',
};

Default.argTypes = {
  onClick: {
    action: 'clicked'
  },
  type: {
    defaultValue: 'next',
    options: ['next', 'previous'],
    control: { type: 'select' }
  },
}
