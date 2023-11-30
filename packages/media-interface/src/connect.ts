import { attatchStream } from './hls.js';
import { audio as createAudioElement } from './audio.js';
import { events as mediaEvents } from './events.js';
import { actions as mediaActions } from './actions.js';
import { MediaAction, MediaElement, MediaEvent, MediaSource } from './types.js';

const ACTIONS: MediaAction[] = [
  'play',
  'pause',
  'load',
  'setPlaytime',
  'mute',
  'unmute',
  'setVolume',
  'setRate'
];

const EVENTS: MediaEvent[] = [
  'onLoading',
  'onLoaded',
  'onPause',
  'onBufferChange',
  'onEnd',
  'onPlaytimeUpdate',
  'onLiveSyncUpdate',
  'onVolumeChange',
  'onError',
  'onDurationChange',
  'onRateChange',
  'onPlay',
  'onBuffering',
  'onReady',
  'onFilterUpdate'
];

export const audio = () => {
  const facade = {
    load,
    mediaElement: null as unknown as MediaElement,
    actions: ACTIONS.reduce(
      (result, action) => ({
        ...result,
        [action]: () => {}
      }),
      {}
    ) as { [key in MediaAction]: Function },
    events: EVENTS.reduce(
      (result, event) => ({
        ...result,
        [event]: (handler: Function) => recievers[event].push(handler)
      }),
      {}
    ) as { [key in MediaEvent]: Function }
  };

  const recievers = EVENTS.reduce(
    (result, event: MediaEvent) => ({
      ...result,
      [event]: []
    }),
    {}
  ) as { [key in MediaEvent]: Function[] };

  function load(sources: MediaSource[]) {
    // remove media element
    facade.mediaElement && facade.mediaElement.parentNode?.removeChild(facade.mediaElement);

    ACTIONS.forEach((action) => {
      facade.actions[action] = connect(sources, action);
    });
  }

  function connect(sources: MediaSource[], action: MediaAction) {
    return (params = []) => {
      // create a new media element
      (facade as any).mediaElement = createAudioElement(sources);

      attatchStream(facade.mediaElement);

      // connect the events to existing recievers
      const eventEmitters = mediaEvents(facade.mediaElement);

      EVENTS.forEach((name) =>
        recievers[name].forEach((receiver) => eventEmitters[name](receiver as any))
      );

      // update actions to new media element
      const actionEmitters = mediaActions(facade.mediaElement);

      ACTIONS.forEach((name) => (facade.actions[name] = actionEmitters[name]));

      // call initial action
      action && facade.actions[action].call(null, params);
    };
  }

  return facade;
};

export type ConnectInterface = ReturnType<typeof audio>;
