import { get } from 'lodash-es';
import { connect, props } from '../src/index.js';
import {
  loadButton,
  playButton,
  pauseButton,
  muteButton,
  unmuteButton,
  restartButton
} from './src/actions.js';
import { volumeInput, rateInput, progressBar } from './src/inputs.js';
import { log } from './src/console.js';

export default () => {
  const connector = connect.audio();

  const load = () =>
    connector.load([
      {
        src: '/audio-files/example.m4a',
        type: 'audio/mp4'
      },
      {
        src: './audio-files/example.mp3',
        type: 'audio/mp3'
      },
      {
        src: './audio-files/example.ogg',
        type: 'audio/pgg'
      }
    ]);

  // actions
  loadButton?.addEventListener('click', () => load());
  playButton?.addEventListener('click', () => connector.actions.play());
  pauseButton?.addEventListener('click', () => connector.actions.pause());
  muteButton?.addEventListener('click', () => connector.actions.mute());
  unmuteButton?.addEventListener('click', () => connector.actions.unmute());
  restartButton?.addEventListener('click', () => {
    connector.actions.pause();
    connector.actions.setPlaytime(0);
    connector.actions.play();
  });

  // inputs
  volumeInput?.addEventListener('change', (event) => {
    const value = get(event, ['target', 'value']);
    connector.actions.setVolume(value);
  });
  rateInput?.addEventListener('change', (event) => {
    const value = get(event, ['target', 'value']);
    connector.actions.setRate(value);
  });
  progressBar.addEventListener('change', (event) => {
    const value = get(event, ['target', 'value'], 0);
    connector.actions.setPlaytime(value * 250);
  });

  // Props
  const renderProps = () => {
    const element = document.getElementById('props');
    const playerProperties = props(connector.mediaElement);

    while (element?.firstChild) {
      element.removeChild(element.firstChild);
    }

    Object.keys(playerProperties).map((key: any) => {
      const propNode = document.createElement('tr');
      propNode.innerHTML = `<td>${key}</td><td>${get(playerProperties, key)}</td>`;
      element?.appendChild(propNode);
    });
  };

  // Events
  const onEvent = (event: any) => {
    log(event);
    renderProps();
  };
  connector.events.onLoaded(onEvent('loaded'));
  connector.events.onLoading(onEvent('loading'));
  connector.events.onBuffering(onEvent('buffering'));
  connector.events.onBufferChange(onEvent('buffer changed'));
  connector.events.onPause(onEvent('paused'));
  connector.events.onPlay(onEvent('playing'));
  connector.events.onPlaytimeUpdate(onEvent('playtime'));
  connector.events.onError(onEvent('error'));
  connector.events.onEnd(onEvent('end'));
  connector.events.onRateChange(onEvent('rate changed'));
  connector.events.onDurationChange(onEvent('duration changed'));
  connector.events.onVolumeChange(onEvent('volume changed'));
  connector.events.onFilterUpdate(onEvent('filter updated'));
  connector.events.onPlaytimeUpdate((value: number | undefined) => {
    if (typeof value !== 'undefined' && progressBar) {
      progressBar.value = (value / 250).toString();
    }
  });
};
