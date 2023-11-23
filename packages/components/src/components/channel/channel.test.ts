import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EmbedChannel from './EmbedChannel.vue';
import FacebookChannel from './FacebookChannel.vue';
import LinkChannel from './LinkChannel.vue';
import LinkedinChannel from './LinkedinChannel.vue';
import MailChannel from './MailChannel.vue';
import PinterestChannel from './PinterestChannel.vue';
import RedditChannel from './RedditChannel.vue';
import TwitterChannel from './TwitterChannel.vue';
import WhatsAppChannel from './WhatsAppChannel.vue';
import XingChannel from './XingChannel.vue';

const props = {
  link: 'http://foo.bar',
  subject: 'test subject',
  text: 'test text',
  a11y: 'test a11y',
  poster: 'http://foo.bar/test.jpg',
  filled: false
};

const components = {
  embed: EmbedChannel,
  facebook: FacebookChannel,
  link: LinkChannel,
  linkedin: LinkedinChannel,
  mail: MailChannel,
  pinterest: PinterestChannel,
  reddit: RedditChannel,
  twitter: TwitterChannel,
  whatsApp: WhatsAppChannel,
  xing: XingChannel
};

describe('Channel', () => {
  Object.entries(components).forEach(([channel, component]) => {
    describe(channel, () => {
      test('should be a Vue instance', async () => {
        const wrapper = await mount(component, { props });
        expect(wrapper.vm).toBeTruthy();
      });

      test('should render the channel', async () => {
        const wrapper = await mount(component, { props });

        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });
});
