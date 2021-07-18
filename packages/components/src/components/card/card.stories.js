import Card from './Card.vue'
import * as defaults from 'defaults'

export default {
  title: 'Card',
  component: Card,
};

const Template = (args, { argTypes }) => ({
  components: { Card },
  props: Object.keys(argTypes),
  template: `
  <card
  :headerColor="headerColor"
  :backgroundColor="backgroundColor"
  >
    <span style="color: white" slot="header">Header</span>
    <div>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    </div>
  </card>
  `
});

export const Default = Template.bind({});

Default.args = {
  headerColor: defaults.background,
  backgroundColor: '#efefef'
};
