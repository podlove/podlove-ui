import { compose, when, curry, has, and } from 'ramda';

import { dispatchEvent } from './utils.js';
import { connectBuffer } from './media-context.js';

const hasAudioContext = and(has('audioContext'), has('audioBuffer'));

const channelGain = curry((channels, node) => {
  const gainNode = node.audioContext.createGain();

  gainNode.channelCount = channels;
  gainNode.channelCountMode = 'explicit';
  gainNode.channelInterpretation = 'speakers';
  gainNode.gain.value = 1;

  return connectBuffer(gainNode, node);
});

const mono = when(hasAudioContext, compose(dispatchEvent('filterUpdated'), channelGain(1)));

const stereo = when(hasAudioContext, compose(dispatchEvent('filterUpdated'), channelGain(2)));

export { mono, stereo };
