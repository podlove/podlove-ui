import { audio } from '../src/index.js';
import { attatchStream } from '../src/hls.js';

import { registerActions } from './src/actions.js';
import { registerEvents } from './src/events.js';
import { registerInputs } from './src/inputs.js';

const sources = [
  {
    src: 'https://st01.sslstream.dlf.de/dlf/01/128/mp3/stream.mp3?aggregator=web',
    type: 'audio/mp3'
  }
];

export default () => {
  const myAudio = attatchStream(audio(sources));

  registerEvents(myAudio);
  registerActions(myAudio);
  registerInputs(myAudio);
};
