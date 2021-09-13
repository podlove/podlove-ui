import ButtonComponent from './Button.vue'
import * as defaults from 'defaults'

export default {
  title: 'Button',
  component: ButtonComponent
}

const Template = (args) => ({
  components: { ButtonComponent },
  setup() {
    return { args }
  },
  template: `
    <button-component
    v-bind="args"
    >{{ text }}</button-component>
  `
})

export const Default = Template.bind({})

Default.args = {
  textColor: defaults.color,
  backgroundColor: defaults.background,
  borderColor: defaults.highlight,
  href: 'href',
  disabled: false,
  text: 'Button Text'
}
