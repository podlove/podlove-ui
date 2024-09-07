import { flowRight as compose } from 'lodash-es';
import { dispatchEvent } from './utils.js';
import { connectBuffer } from './media-context.js';
import { curry, has } from 'lodash-es';

const hasAudioContext = (input: any): boolean =>  has(input, 'audioContext') && has(input, 'audioBuffer');

const channelGain = curry((channels, node) => {
  const gainNode = node.audioContext.createGain();

  gainNode.channelCount = channels;
  gainNode.channelCountMode = 'explicit';
  gainNode.channelInterpretation = 'speakers';
  gainNode.gain.value = 1;

  return connectBuffer(gainNode, node);
});

const mono = (input: any) => {
  if (!hasAudioContext(input)) {
    return input;
  }

  return compose(dispatchEvent('filterUpdated'), channelGain(1))
}

const stereo = (input: any) => {
  if (!hasAudioContext(input)) {
    return input;
  }

  return compose(dispatchEvent('filterUpdated'), channelGain(2))
}

export { mono, stereo };
