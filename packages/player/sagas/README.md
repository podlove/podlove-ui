# Player Sagas

> Isolated side effects for the player lifecycle based on [redux-saga](https://github.com/redux-saga/redux-saga)

## Available Sagas

### Lifecycle

Parses provided configuration and emits the `READY` event.

```javascript
import sagas from '@podlove/player-sagas'
import lifecycleSaga from '@podlove/player-sagas/lifecycle'

sagas.run(
  lifecycleSaga
)
```

### Runtime

Parses the player runtime (browser, client, ...) and emits `SET_RUNTIME`.

```javascript
import sagas from '@podlove/player-sagas'
import runtimeSaga from '@podlove/player-sagas/runtime'

sagas.run(
  runtimeSaga
)
```

### Player

Connects the media actions (start, stop, scrub, ...) to the html5 audio/video api.

```javascript
import sagas from '@podlove/player-sagas'
import playerSaga from '@podlove/player-sagas/player'

sagas.run(
  playerSaga({ selectMedia: selectors.media, selectPlaytime: selectors.playtime })
)
```

### Components

Shows/Hides components depending on the player state.

```javascript
import sagas from '@podlove/player-sagas'
import componentsSaga from '@podlove/player-sagas/components'

sagas.run(
  componentsSaga
)
```

### Chapters

Applies needed side effects when interacting with playtime/chapters.

```javascript
import sagas from '@podlove/player-sagas'
import chaptersSaga from '@podlove/player-sagas/chapters'

sagas.run(
  chaptersSaga({
    selectDuration: selectors.duration,
    selectPlaytime: selectors.playtime,
    selectCurrentChapter: selectors.chapters.current,
    selectChapterList: selectors.chapters.list
  })
)
```

### Quantiles

Creates quantiles for already listened sections.

```javascript
import sagas from '@podlove/player-sagas'
import quantilesSaga from '@podlove/player-sagas/quantiles'

sagas.run(
  quantilesSaga
)
```

### Version

Reads the Player Version and dispatches it to the store.

```javascript
import sagas from '@podlove/player-sagas'
import versionSaga from '@podlove/player-sagas/version'

sagas.run(
  versionSaga({ version })
)
```

### Transcripts

Applies needed side effects when interacting with playtime/transcripts.

```javascript
import sagas from '@podlove/player-sagas'
import transcriptsSaga from '@podlove/player-sagas/transcripts'

sagas.run(
  transcriptsSaga({ selectChapters: selectors.chapters.list, selectSpeakers: selectors.contributors })
)
```
