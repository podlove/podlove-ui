import Tooltip from './Tooltip.vue'

export default {
  title: 'Tooltip',
  component: Tooltip,
};

const Template = (args, { argTypes }) => ({
  components: { Tooltip },
  props: Object.keys(argTypes),
  template: `
    <div style="height: 150px; display: flex; align-items: center; justify-content: center;">
      <tooltip :content="content" :trigger="trigger" :color="color" :background="background" :placement="placement" @click="onClick">
        <span>Tooltip trigger</span>
      </tooltip>
    </div>
  `
});

export const Default = Template.bind({});

Default.args = {
  content: 'Tooltip Content',
  color: '#fff',
  background: '#000',
};

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
