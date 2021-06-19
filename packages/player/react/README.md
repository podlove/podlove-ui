# @podlove/player-react

> React wrapper for @podlove/web-player

## Installation

- Run `npm i @podlove/player-react`

## Usage

```jsx
import { PodloveWebPlayer } from '@podlove/player-react';

<PodloveWebPlayer 
episode="https://backend.podlovers.org/wp-json/podlove-web-player/shortcode/publisher/60" 
config="https://backend.podlovers.org/wp-json/podlove-web-player/shortcode/config/podlovers/theme/default" />
```

## Properties

- `episode`: Episode metadata as file reference or as plain object, see [episode docs](https://docs.podlove.org/podlove-web-player/v5/configuration#episode)
- `config`: Config metadata as file reference or as plain object, see [config docs](https://docs.podlove.org/podlove-web-player/v5/configuration#config)
- `base`: (Optional) player resource base, will fallback to the cdn if not provided
- `variant`: (Optional) player template variant, see [templating docs](https://docs.podlove.org/podlove-web-player/v5/templating/getting-started#variants)
- `playtime`: (Optional) initial playtime in milliseconds
- `tab`: (Optional) initial tab in milliseconds

## Callbacks
- `onLoaded`: (Optional) callback hook that gets called with the player store, see [runtime API](https://docs.podlove.org/podlove-web-player/v5/extensions/runtime-api)

## Children
Provided children will be parsed as [player templates](https://docs.podlove.org/podlove-web-player/v5/templating/components/root):

```jsx
<PodloveWebPlayer 
episode="https://backend.podlovers.org/wp-json/podlove-web-player/shortcode/publisher/60" 
config="https://backend.podlovers.org/wp-json/podlove-web-player/shortcode/config/podlovers/theme/default">
<root style="max-width:950px;min-width:260px;" class="p-4 flex justify-center">
  <play-button></play-button>
</root>
</PodloveWebPlayer>
```
