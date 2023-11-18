import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Image from './Image.vue';

const props = {
  url: 'http://foo.bar',
  alt: 'alternative title'
}

describe('Image', () => {
  describe('component', () => {
    test('should be a Vue instance', async () => {
      const wrapper = await mount(Image, { props });
      expect(wrapper.vm).toBeTruthy();
    });
  });

  describe('props', () => {
    test('should render', async () => {
      const wrapper = await mount(Image, { props });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
