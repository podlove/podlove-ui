# Pure HTML5 Audio Driver
[![npm version](https://badge.fury.io/js/%40podlove%2Fmedia-backend.svg)](https://badge.fury.io/js/%40podlove%2Fmedia-backend.svg)
[![Standard Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpodlove%2Fmedia-backend.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpodlove%2Fmedia-backend?ref=badge_shield)

Opinionated low level functional bindings to control html5 audio

## Constraints (or what you won't find here)
- Full functional audio player with controls and all the fuzz, instead you should use [mediaelement](https://github.com/mediaelement/mediaelement)
- Support for multiple sounds and ambient control, instead you should use [howler.js](https://github.com/goldfire/howler.js)
- No WebAudio, instead you should use [pizzicato](https://github.com/alemangui/pizzicato)

## Features (or what you will find here)
- Full control over the audio element
- Functional bindings to all necessary events
- Composability for all audio actions
- Helper functions to get relevant audio element properties
- Written in vanilla es6 with only one dependency to [ramda](https://github.com/ramda/ramda)

## Installation

`npm install media-backend` or `yarn add media-backend`

## Usage

### Creating an AudioElement

If you have already an audio element defined, good for you, skip this and use the dom reference. Otherwise you can use this helper, the helper will create an audio element without controls, preloading and loops:

```javascript
import { audio } from '@podlove/media-backend'

const myAudioElement = audio([{
  url: 'audio-files/example.m4a',
  mimeType: 'audio/mp4'
}, {
  url: 'audio-files/example.mp3',
  mimeType: 'audio/mp3'
}, {
  url: 'audio-files/example.ogg',
  mimeType: 'audio/ogg'
}])
```

`mimeType` is needed so the browser can decide what source is appropriated to use.

### Interacting with the audio element

All audio element actions are curried and accept as their first parameter the audio element. Also each action returns the audio element:

```javascript
import { compose } from 'ramda'
import { play, setPlaytime } from '@podlove/media-backend/actions'

const setPlaytimeAndPlay = compose(play, setAudioPlaytime)(myAudioElement)
// Sets the playtime to 50 seconds and plays the audio
setPlaytimeAndPlay(50)
```

For convenience also a `action` composer is available:

```javascript
import { actions } from '@podlove/media-backend'

const audioActions = actions(myAudioElement)

audioActions.load()
audioActions.play()
audioActions.pause()
audioActions.setPlaytime(50)
audioActions.setRate(1.5)
audioActions.mute()
audioActions.unmute()
```

#### Available Actions:

| _Function_    | _Action_                                                  | parameters               |
|---------------|-----------------------------------------------------------|--------------------------|
| `play`        | Safeplays the audio, initiates load if not already loaded | void                     |
| `pause`       | pauses the audio                                          | void                     |
| `load`        | loads the audio                                           | void                     |
| `mute`        | mutes the audio                                           | void                     |
| `unmute`      | unmutes the audio                                         | void                     |
| `setRate`     | sets the play rate                                        | number: [0.5 ... 4]      |
| `setPlaytime` | sets the current play time                                | number: [0 ... duration] |


### Reacting to audio events

All audio events are curried and accept as their first parameter the audio element. The second parameter is always the callback function. Each event returns a different set of audio properties, depending on the event scope:

```javascript
import { onPlay } from '@podlove/media-backend/events'

const playEvent = onPlay(myAudioElement)

playEvent(console.log) // similar to onPlay(myAudioElement, console.log)
/**
* Will log audio properties on audio play:
* {
*  duration,
*  buffered,
*  volume,
*  state,
*  playtime,
*  ended,
*  rate,
*  muted,
*  src,
*  paused,
*  playing
* }
*/
```

For convenience also a `events` composer is available:

```javascript
import { events } from '@podlove/media-backend'

const audioEvents = events(myAudioElement)

audioEvents.onLoading(console.log)
audioEvents.onLoaded(console.log)
audioEvents.onReady(console.log)
audioEvents.onPlay(console.log)
audioEvents.onPause(console.log)
audioEvents.onBufferChange(console.log)
audioEvents.onBuffering(console.log)
audioEvents.onPlaytimeUpdate(console.log)
audioEvents.onVolumeChange(console.log)
audioEvents.onError(console.log)
audioEvents.onDurationChange(console.log)
audioEvents.onRateChange(console.log)
audioEvents.onEnd(console.log)
```

#### Available Events:

| _Function_          | _Event_                                               | _Original_        | _Callback Payload_                                                      | _Once_  |
|---------------------|-------------------------------------------------------|-------------------|-------------------------------------------------------------------------|---------|
| `onLoading`         | When browser starts audio loading                     | `progress`        | All props                                                               | `true`  |
| `onLoaded`          | When browser loaded the entire file                   | `canplaythrough`  | All props                                                               | `true`  |
| `onReady`           | When browser has enough data to play                  | `canplay`         | All props                                                               | `false` |
| `onPlay`            | When browser starts playing audio                     | `play`            | All props                                                               | `false` |
| `onPause`           | When browser pauses audio                             | `pause`           | All props                                                               | `false` |
| `onEnd`             | When browser reaches end of audio                     | `ended`           | All props                                                               | `false` |
| `onBufferChange`    | When browser buffered a new audio segment             | `progress`        | buffered segments                                                       | `false` |
| `onBuffering`       | When browser waits for audio segments to play         | `waiting`         | All props                                                               | `false` |
| `onPlaytimeUpdate`  | When currentTime of audio changes                     | `timeupdate`      | playtime                                                                | `false` |
| `onVolumeChange`    | When volume of audio changes                          | `volumechange`    | volume                                                                  | `false` |
| `onError`           | When an error occurred while playing the audio        | `error`           | `NETWORK_NO_SOURCE`, `NETWORK_EMPTY`, `NETWORK_LOADING`, `MEDIA_ERROR` | `false` |
| `onDurationChange`  | When browser has new information on audio duration    | `durationchange`  | duration                                                                | `false` |
| `onRateChange`      | When browser detects a change in audio playback rate  | `ratechange`      | rate                                                                    | `false` |
| `onFilterUpdate`    | When a filter has been changed                        | `filterUpdated`   | All props                                                               | `false` |

### Audio Element Properties

Multiple different functions are provided to give you easy access to audio element properties. Initially most of them are undefined:

```javascript

import { volume } from '@podlove/media-backend/props'

isPlaying(myAudioElement) // Will return false
```

For convenience also a composed version is available giving you all available properties:

```javascript
import { props } from '@podlove/media-backend/props'

props(myAudioElement)
/**
* {
*  duration,
*  buffered,
*  volume,
*  state,
*  playtime,
*  ended,
*  rate,
*  muted,
*  src,
*  paused,
*  playing
* }
*/
```

#### Available Properties:

| _Function_  | _Description_                                     | _Return Value_                                                                                | _Initial Value_ |
|-------------|---------------------------------------------------|-----------------------------------------------------------------------------------------------|-----------------|
| `duration`  | Duration of audio in seconds                      | number                                                                                        | `undefined`     |
| `buffered`  | Buffered audio segments start and end in seconds  | [[number, number], ...]                                                                       | `[]`            |
| `volume`    | Audio volume                                      | number: [0...1]                                                                               | `undefined`     |
| `state`     | Network State                                     | `HAVE_NOTHING`, `HAVE_METADATA`, `HAVE_CURRENT_DATA`, `HAVE_FUTURE_DATA`, `HAVE_ENOUGH_DATA`  | `undefined`     |
| `playtime`  | Current audio playtime position in sconds         | number                                                                                        | `undefined`     |
| `ended`     | Indicates if audio has ended                      | boolean                                                                                       | `undefined`     |
| `rate`      | Audio playback rate                               | number: [0.5 ... 4]                                                                           | `undefined`     |
| `muted`     | Indicates if audio is muted                       | boolean                                                                                       | `undefined`     |
| `src`       | Used audio source                                 | string                                                                                        | `undefined`     |
| `paused`    | Indicates if audio is paused                      | boolean                                                                                       | `undefined`     |
| `channels`  | Available audio channels                          | number                                                                                        | `undefined`     |
| `playing`   | Indicates if audio is playing                     | boolean                                                                                       | `false`         |


## Handled HTML5 Quirks and Limitations (the nasty part :/)

HTML5 audio was a needed addition to get rid of the flash hell. Although it is already multiple years implemented in all the different browsers each implementation has it's flaws. If you want to dive deeper into the topic I recommend you the [following article](https://24ways.org/2010/the-state-of-html5-audio).

### Play Action

Using the `play` action will give you a safe function that surpresses most of the errors. One source is that older browsers doesn't implement `audio.play()` as a promise. Also there is a race condition between `play` and `pause` that needs to be `.catch`ed.

### Playtime (CurrentTime)

In Safari and mobile Safari it isn't possible to set the `currentTime` before loading the audio. You can set it but it won't mutate the audio `currentTime` value. `media-backend` therefore uses a custom `playtime` attribute that is synced wit the `currentTime`.

### Mobile Environments

To `play` audio on mobile devices you have to trigger use a direct user interaction to trigger the audio. Also `volume` is not available on mobile devices.

## Legacy Browser Support (IE11)

In case you need IE11 support you have to provide some polyfills in your application. Have a look at the [test polyfills](test/polyfills.js) to see a working example.

## Publishing

Run `npm publish:prepare` move to the `dist/` folder and run `npm publish --public`


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpodlove%2Fmedia-backend.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpodlove%2Fmedia-backend?ref=badge_large)
