import { video } from '../src/index.js';
import { attatchStream } from '../src/hls.js';

import { registerActions } from './src/actions.js';
import { registerEvents } from './src/events.js';
import { registerInputs } from './src/inputs.js';

export default () => {
  const myVideo = attatchStream(
    video({
      src: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
      type: 'application/x-mpegURL'
    })
  );

  document.getElementById('media-node')?.appendChild(myVideo);

  registerEvents(myVideo);
  registerActions(myVideo);
  registerInputs(myVideo);
};
