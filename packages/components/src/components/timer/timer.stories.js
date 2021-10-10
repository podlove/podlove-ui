import Timer from './Timer.vue'

export default {
  title: 'Timer',
  component: Timer
}

const Template = (args) => ({
  components: { Timer },
  setup() {
    return { args }
  },
  template: `
  <timer v-bind="args"></timer>
  `
})

export const Default = Template.bind({})

Default.args = {
  time: 5 * 60 * 1000,
  color: '#000',
  remaining: false
}
