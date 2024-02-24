import { type, platform, client } from '../types.js';
import { removeHttps } from '../helper.js';
import icon from './icon.svg';

export default [
  client({
    title: 'Player.fm',
    scheme: (feed) => `https://player.fm/subscribe?id=${encodeURIComponent(removeHttps(feed))}`,
    install: 'https://play.google.com/store/apps/details?id=fm.player',
    platform: platform.android,
    type: type.app,
    icon
  }),
  client({
    title: 'Player.fm',
    scheme: (feed) => `https://player.fm/subscribe?id=${encodeURIComponent(removeHttps(feed))}`,
    install: 'https://player.fm/',
    platform: platform.web,
    type: type.service,
    icon
  })
];
