import StepperButton from './StepperButton.vue'

export default {
  title: 'StepperButton',
  component: StepperButton,
};

const Template = (args, { argTypes }) => ({
  components: { StepperButton },
  props: Object.keys(argTypes),
  template: `
  <stepper-button
    :type="type"
    :color="color"
    @click="onClick"
  >
  </stepper-button>
  `
});

export const Default = Template.bind({});

Default.args = {
  color: '#000'
};

Default.argTypes = {
  onClick: {
    action: 'clickAction'
  },
  type: {
    options: ['forward', 'backwards'],
    defaultValue: 'forward',
    control: { type: 'select' }
  }
}
