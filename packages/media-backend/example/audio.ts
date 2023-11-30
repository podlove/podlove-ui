import { audio } from '../src/index.js';

import { registerActions } from './src/actions.js';
import { registerEvents } from './src/events.js';
import { registerInputs } from './src/inputs.js';
import { registerFilters } from './src/filters.js';

export default () => {
  const myAudio = audio([
    {
      src: './audio-files/example.m4a',
      type: 'audio/mp4'
    },
    {
      src: './audio-files/example.mp3',
      type: 'audio/mp3'
    },
    {
      src: './audio-files/example.ogg',
      type: 'audio/ogg'
    }
  ]);

  registerEvents(myAudio);
  registerActions(myAudio);
  registerInputs(myAudio);
  registerFilters(myAudio);
};
