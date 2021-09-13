import InputGroup from './InputGroup'
import ButtonComponent from '../button'
import InputText from '../input-text'
import Icon from '../icons'

export default {
  title: 'InputGroup',
  component: InputGroup
}

const Template = (args) => ({
  components: { InputGroup, ButtonComponent, InputText, Icon },
  setup() {
    return { args }
  },
  template: `
  <input-group>
    <template #button>
      <button-component><icon type="copy" /></button-component>
    </template>
    <template #input>
      <input-text value="My Input text value"></input-text>
    </template>
  </input-group>
  `
})

export const Default = Template.bind({})
