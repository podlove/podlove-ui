import { type, platform, client } from '../types.js';
import icon from './icon.svg';

export default [
  client({
    title: 'RSS',
    scheme: (feed) => feed,
    platform: platform.web,
    type: type.service,
    icon
  })
];
