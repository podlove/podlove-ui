import Timer from './Timer.vue'

export default {
  title: 'Timer',
  component: Timer
}

const Template = (args, { argTypes }) => ({
  components: { Timer },
  props: Object.keys(argTypes),
  template: `
  <timer
      :time="time"
      :color="color"
    >
    </timer>
  `
})

export const Default = Template.bind({})

Default.args = {
  time: 5 * 60 * 1000,
  color: '#000'
}
