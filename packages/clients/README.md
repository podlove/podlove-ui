# Client Package

## List of Podcast Clients active

| id                    | name                | app  | service  | android | ios | osx | windows | unix | web |
|-----------------------|---------------------|------|----------|---------|-----|-----|---------|------|-----|
| `antenna-pod`         | Antenna Pod         |  ☑   | ☐        | ☑       | ☐   | ☐   | ☐       | ☐    | ☐   |
| `apple-podcasts`      | Apple Podcasts      |  ☑   | ☑        | ☐       | ☑   | ☑   | ☐       | ☐    | ☑   |
| `beyond-pod`          | BeyondPod           |  ☑   | ☐        | ☑       | ☐   | ☐   | ☐       | ☐    | ☐   |
| `castbox`             | Castbox             |  ☐   | ☑        | ☐       | ☐   | ☐   | ☐       | ☐    | ☑   |
| `castro`              | Castro              |  ☐   | ☑        | ☐       | ☑   | ☐   | ☐       | ☐    | ☐   |
| `clementine`          | Clementine          |  ☑   | ☐        | ☐       | ☐   | ☐   | ☐       | ☐    | ☑   |
| `deezer`              | Deezer              |  ☐   | ☑        | ☐       | ☐   | ☐   | ☐       | ☐    | ☑   |
| `downcast`            | Downcast            |  ☑   | ☐        | ☐       | ☑   | ☑   | ☐       | ☐    | ☐   |
| `google-podcasts`     | Google Podcasts     |  ☑   | ☑        | ☑       | ☐   | ☐   | ☐       | ☐    | ☑   |
| `gpodder`             | gPodder             |  ☑   | ☑        | ☐       | ☐   | ☐   | ☑       | ☑    | ☑   |
| `i-catcher`           | iCatcher            |  ☑   | ☐        | ☐       | ☑   | ☐   | ☐       | ☐    | ☐   |
| `instacast`           | Instacast           |  ☑   | ☐        | ☐       | ☑   | ☑   | ☐       | ☐    | ☐   |
| `instacast`           | Instacast           |  ☑   | ☐        | ☐       | ☑   | ☑   | ☐       | ☐    | ☐   |
| `overcast`            | Overcast            |  ☑   | ☐        | ☐       | ☑   | ☐   | ☐       | ☐    | ☐   |
| `player-fm`           | Player.fm           |  ☑   | ☑        | ☑       | ☐   | ☐   | ☐       | ☐    | ☑   |
| `pocket-casts`        | PocketCasts         |  ☑   | ☑        | ☑       | ☑   | ☐   | ☐       | ☐    | ☑   |
| `pod-grasp`           | PodGrasp            |  ☑   | ☐        | ☐       | ☑   | ☑   | ☐       | ☐    | ☐   |
| `podcast-republic`    | Podcast Republic    |  ☑   | ☐        | ☑       | ☐   | ☐   | ☐       | ☐    | ☐   |
| `podcat`              | Podcat              |  ☑   | ☐        | ☐       | ☑   | ☐   | ☐       | ☐    | ☐   |
| `podcat`              | Podcat              |  ☑   | ☐        | ☐       | ☑   | ☐   | ☐       | ☐    | ☐   |
| `podscout`            | Podscout            |  ☑   | ☐        | ☐       | ☐   | ☐   | ☑       | ☐    | ☐   |
| `rss`                 | RSS                 |  ☐   | ☑        | ☐       | ☐   | ☐   | ☐       | ☐    | ☑   |
| `rss-radio`           | RSSRadio            |  ☑   | ☐        | ☐       | ☑   | ☐   | ☐       | ☐    | ☐   |
| `soundcloud`          | Soundcloud          |  ☐   | ☑        | ☐       | ☐   | ☐   | ☐       | ☐    | ☑   |
| `spotify`             | Spotify             |  ☐   | ☑        | ☐       | ☐   | ☐   | ☐       | ☐    | ☑   |
| `stitcher`            | Stitcher            |  ☐   | ☑        | ☐       | ☐   | ☐   | ☐       | ☐    | ☑   |
| `youtube`             | Youtube             |  ☐   | ☑        | ☐       | ☐   | ☐   | ☐       | ☐    | ☑   |

## Usage

```javascript
import clients from '@podlove/clients'
import { type, platform } from '@podlove/clients/types'

clients() // will return all clients

// Additive filtering for id, title (match), type and platform
clients({ id: 'apple-podcasts', title: 'Apple', type: type.service, platform: platform.web })
/**
 * [{
    title: 'Apple Podcasts',
    scheme: id => `https://podcasts.apple.com/podcast/${id}`,
    platform: platform.web,
    type: type.service,
    icon
 * }] 
 * / 
```
