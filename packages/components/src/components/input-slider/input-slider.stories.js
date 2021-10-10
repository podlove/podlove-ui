import InputSlider from './InputSlider.vue'
import * as defaults from 'defaults'

export default {
  title: 'InputSlider',
  component: InputSlider
}

const Template = (args) => ({
  components: { InputSlider },
  setup() {
    return { args }
  },
  template: `
  <div style="width: 350px; margin: 20px;">
    <input-slider v-bind="args"></input-slider>
  </div>
  `
})

export const Default = Template.bind({})

Default.args = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  borderColor: defaults.background,
  background: defaults.color,
  progressColor: defaults.highlight,
  pins: [
    {
      value: 0,
      label: '0x'
    },
    {
      value: 0.25,
      label: '25x'
    },
    {
      value: 0.5,
      label: '50x'
    },
    {
      value: 0.75,
      label: '75x'
    },
    {
      value: 1,
      label: '100x'
    }
  ]
}

Default.argTypes = {
  onChange: {
    action: 'changeAction'
  },
  onInput: {
    action: 'inputAction'
  },
  onDblClick: {
    action: 'dblClickAction'
  }
}
