import { audio } from '../src/index.js';
import { attatchStream } from '../src/hls.js';

import { registerActions } from './src/actions.js';
import { registerEvents } from './src/events.js';
import { registerInputs } from './src/inputs.js';

const sources = [
  {
    src: 'https://mcdn.br.de/br/hf/b5/master.m3u8',
    title: 'HLS Stream',
    type: 'application/x-mpegURL'
  }
];

export default () => {
  const myAudio = attatchStream(audio(sources));

  registerEvents(myAudio);
  registerActions(myAudio);
  registerInputs(myAudio);
};
