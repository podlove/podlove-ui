import StepperButton from './StepperButton.vue'

export default {
  title: 'StepperButton',
  component: StepperButton
}

const Template = (args) => ({
  components: { StepperButton },
  setup() {
    return { args }
  },
  template: `
  <stepper-button v-bind="args"></stepper-button>
  `
})

export const Default = Template.bind({})

Default.args = {
  color: '#000'
}

Default.argTypes = {
  onForward: {
    action: 'clickAction'
  },
  onBackwards: {
    action: 'clickAction'
  },
  type: {
    options: ['forward', 'backwards'],
    defaultValue: 'forward',
    control: { type: 'select' }
  }
}
