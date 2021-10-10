import ChapterButton from './ChapterButton.vue'

export default {
  title: 'ChapterButton',
  component: ChapterButton
}

const Template = (args) => ({
  components: { ChapterButton },
  setup() {
    return { args }
  },
  template: `
  <chapter-button v-bind="args"></chapter-button>
  `
})

export const Default = Template.bind({})

Default.args = {
  color: '#000'
}

Default.argTypes = {
  onNext: {
    action: 'next'
  },
  onPrevious: {
    action: 'previous'
  },
  type: {
    defaultValue: 'next',
    options: ['next', 'previous'],
    control: { type: 'select' }
  }
}
