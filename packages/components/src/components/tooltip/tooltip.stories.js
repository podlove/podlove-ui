import Tooltip from './Tooltip.vue'

export default {
  title: 'Tooltip',
  component: Tooltip
}

const Template = (args) => ({
  components: { Tooltip },
  setup() {
    return { args }
  },
  template: `
    <div style="height: 150px; position: relative; display: flex; align-items: center; justify-content: center;">
      <tooltip v-bind="args">
        <span>Tooltip trigger</span>
      </tooltip>
    </div>
  `
})

export const Default = Template.bind({})

Default.args = {
  content: 'Tooltip Content',
  color: '#fff',
  background: '#000'
}

Default.argTypes = {
  onClick: {
    action: 'clickAction'
  },
  placement: {
    options: ['auto', 'top', 'right', 'bottom', 'left'],
    defaultValue: 'bottom',
    control: {
      type: 'select'
    }
  },
  trigger: {
    options: ['hover', 'click'],
    defaultValue: 'hover',
    control: {
      type: 'select'
    }
  }
}
