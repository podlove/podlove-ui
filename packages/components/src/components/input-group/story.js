import InputGroup from '.'
import ButtonComponent from '../button'
import InputText from '../input-text'
import Icon from '../icons'

export default () => ({
  components: { InputGroup, ButtonComponent, InputText, Icon },
  template: `
    <input-group>
      <button-component slot="button"><icon type="copy" /></button-component>
      <input-text value="My Input text value" slot="input"></input-text>
    </input-group>`,
})
