import InputGroup from './InputGroup'
import ButtonComponent from '../button'
import InputText from '../input-text'
import Icon from '../icons'


export default {
  title: 'InputGroup',
  component: InputGroup,
};

const Template = (args, { argTypes }) => ({
  components: { InputGroup, ButtonComponent, InputText, Icon },
  props: Object.keys(argTypes),
  template: `
  <input-group>
    <button-component slot="button"><icon type="copy" /></button-component>
    <input-text value="My Input text value" slot="input"></input-text>
  </input-group>
  `
});

export const Default = Template.bind({});
