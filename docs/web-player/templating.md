---
navigation: 5
---

# Templating

Podlove Web Player 5 has a build in templating engine based on Vue component rendering in combination with the [tailwind css framework](https://tailwindcss.com/). Each player part is available as an isolated component with an automatic store binding.

## Variants

Based on this template engine, the player provides three different layouts out of the box. Each variant can be defined via the `data-variant` attribute on the targeted dom element.

```javascript
// HTML
<div id="variant-xl" data-variant="xl"></div>
<div id="variant-l" data-variant="l"></div>
<div id="variant-m" data-variant="m"></div>

// Javascript
podlovePlayer('#variant-xl', 'fixtures/episode.json', 'fixtures/config.json');
podlovePlayer('#variant-l', 'fixtures/episode.json', 'fixtures/config.json');
podlovePlayer('#variant-m', 'fixtures/episode.json', 'fixtures/config.json');
```

### Variant XL (default)

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json" variant="xl" />

### Variant L

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json" variant="l" />

### Variant M

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json" variant="m" />

## Custom Templating

Podlove Web Player grants you access to the complete player dom with state bound components. Instead of using a predefined variant you can provide a template either via the `data-template` attribute or inline as part of the target dom. While creating a custom template keep in mind that the used player components still adhere their styles from the selected theme. Also if you aren't familiar yet with [tailwind css framework](https://tailwindcss.com/) or it's concept around responsive design, make sure to read the basic introduction. It is a fairly simple framework that should enable rapid player templating.

### Root Node

> A custom player template lives in a root node that grants the access to tailwind classes and custom fonts. Since it is the first node in the player it is recommended to add min and max width boundaries.

#### Example

```html
<root style="max-width:950px;min-width:260px;" class="p-4 flex justify-center">
  <play-button></play-button>
</root>
```

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;" class="p-4 flex justify-center rounded">
    <play-button></play-button>
  </root>
</podlove-web-player>

### Episode Data

> Information related to the episode

| _name_             | _attributes_ | _use case_                   |
| ------------------ | ------------ | ---------------------------- |
| `episode-title`    | -            | display the episode title    |
| `episode-subtitle` | -            | display the episode subtitle |

#### Example

```html
<root style="max-width:950px;min-width:260px;" class="p-4 flex justify-center">
  <episode-title></episode-title>
  <episode-subtitle></episode-subtitle>
</root>
```

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;" class="p-4">
    <episode-title></episode-title>
    <episode-subtitle></episode-subtitle>
  </root>
</podlove-web-player>

### Show Data

> Information related to the show.

#### Component

| _name_       | _attributes_ | _use case_             |
| ------------ | ------------ | ---------------------- |
| `show-title` | -            | display the show title |

#### Example

```html
<root style="max-width:950px;min-width:260px;" class="p-4 flex justify-center">
  <show-title></show-title>
</root>
```

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;" class="p-4 flex justify-center">
    <show-title></show-title>
  </root>
</podlove-web-player>

### Poster

> Poster visual that is context sensitive. It will display either the show cover, episode or the chapter cover

#### Component

| _name_   | _attributes_ | _use case_                        |
| -------- | ------------ | --------------------------------- |
| `poster` | -            | displays the show/episode/chapter |

#### Example

```html
<root style="max-width:950px;min-width:260px;" class="p-4 flex justify-center">
  <poster class="w-48 h-48"></poster>
</root>
```

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;" class="p-4 flex justify-center">
    <poster class="w-48 h-48"></poster>
  </root>
</podlove-web-player>

### Audio Controls

> Controls to play/pause, scrub, tune up/down or play the audio faster/slower.

| _name_           | _attributes_                   | _use case_                                           |
| ---------------- | ------------------------------ | ---------------------------------------------------- |
| `play-button`    | _variant:_ `simple`, `details` | displays a play button                               |
| `progress-bar`   | -                              | displays the progress bar to slide through the audio |
| `speed-control`  | -                              | displays the speed control toggle                    |
| `step-backward`  | -                              | displays a stepper that jumps 15 seconds back        |
| `step-forward`   | -                              | displays a stepper that jumps 30 seconds ahead       |
| `volume-control` | -                              | displays a toggle and slider to change the volume    |

#### Example

```html
<root style="max-width:950px;min-width:260px;" class="p-4 flex justify-center">
  <div class="flex items-center justify-between">
    <div class="block">
      <speed-control class="flex items-center"></speed-control>
    </div>

    <div class="flex">
      <step-backward class="mx-2 block"></step-backward>
      <play-button variant="simple" class="mx-2 block"></play-button>
      <step-forward class="mx-2 block"></step-forward>
    </div>

    <div class="block">
      <volume-control class="flex items-center"></volume-control>
    </div>
  </div>
  <div class="flex items-center">
    <progress-bar></progress-bar>
  </div>
</root>
```

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;" class="p-4">
    <div class="flex items-center justify-between">
      <div class="block">
        <speed-control class="flex items-center"></speed-control>
      </div>
      <div class="flex">
        <step-backward class="mx-2 block"></step-backward>
        <play-button variant="simple" class="mx-2 block"></play-button>
        <step-forward class="mx-2 block"></step-forward>
      </div>
      <div class="block">
        <volume-control class="flex items-center"></volume-control>
      </div>
    </div>
    <div class="flex items-center">
      <progress-bar></progress-bar>
    </div>
  </root>
</podlove-web-player>

### Chapter Controls

> Controls that are related to episode chapters.

| _name_             | _attributes_ | _use case_                           |
| ------------------ | ------------ | ------------------------------------ |
| `chapter-next`     | -            | displays the next chapter button     |
| `chapter-previous` | -            | displays the previous chapter button |
| `current-chapter`  | -            | displays the current chapter titlte  |

#### Example

```html
<root style="max-width:950px;min-width:260px;" class="p-4 flex">
  <chapter-previous class="mr-2 block"></chapter-previous>
  <chapter-next class="mr-2 block"></chapter-next>
  <current-chapter class="mx-2 block"></current-chapter>
</root>
```

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;" class="p-4 flex">
    <chapter-previous class="mr-2 block"></chapter-previous>
    <chapter-next class="mr-2 block"></chapter-next>
    <current-chapter class="mx-2 block"></current-chapter>
  </root>
</podlove-web-player>

### Tabs

> Components that are related to episode chapters. Available tabs: chapters, files, playlist, share, shownotes, transcripts.

| _name_            | _attributes_     | _use case_                                      |
| ----------------- | ---------------- | ----------------------------------------------- |
| `tab`             | _name:_ tab name | tab enclosure that applies the visibility state |
| `tab-trigger`     | -                | displays a toggle to show/hide a tab            |
| `tab-chapters`    | -                | displays the chapters tab                       |
| `tab-files`       | -                | displays the files tab                          |
| `tab-playlist`    | -                | displays the playlist tab                       |
| `tab-share`       | -                | displays the share tab                          |
| `tab-shownotes`   | -                | displays the shownotes tab                      |
| `tab-transcripts` | -                | displays the transcripts tab                    |
| `tab-overflow`    | -                | displays a tab overflow transition              |

#### Example

```html
<root style="max-width:950px;min-width:260px;">
  <div class="flex justify-between pt-4 px-4">
      <div class="flex mobile:w-full tablet:w-3/12 desktop:w-3/12 justify-between">
        <tab-trigger tab="chapters">
          <icon type="chapter"></icon>
        </tab-trigger>
        <tab-trigger tab="transcripts">
          <icon type="transcripts"></icon>
        </tab-trigger>
        <tab-trigger tab="files">
          <icon type="download"></icon>
        </tab-trigger>
        <tab-trigger tab="playlist">
          <icon type="playlist"></icon>
        </tab-trigger>
        <tab-trigger tab="share">
          <icon type="share"></icon>
        </tab-trigger>
      </div>
      <subscribe-button class="mt-1 mobile:hidden tablet:flex"></subscribe-button>
    </div>
  </div>
  <div class="w-full relative overflow-hidden">
    <tab name="chapters">
      <tab-chapters></tab-chapters>
    </tab>
    <tab name="transcripts">
      <tab-transcripts></tab-transcripts>
    </tab>
    <tab name="files">
      <tab-files></tab-files>
    </tab>
    <tab name="playlist">
      <tab-playlist></tab-playlist>
    </tab>
    <tab name="share">
      <tab-share></tab-share>
    </tab>
    <tab-overflow></tab-overflow>
  </div>
</root>
```

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;">
    <div class="flex justify-between pt-4 px-4">
        <div class="flex mobile:w-full tablet:w-3/12 desktop:w-3/12 justify-between">
          <tab-trigger tab="chapters">
            <icon type="chapter"></icon>
          </tab-trigger>
          <tab-trigger tab="transcripts">
            <icon type="transcripts"></icon>
          </tab-trigger>
          <tab-trigger tab="files">
            <icon type="download"></icon>
          </tab-trigger>
          <tab-trigger tab="playlist">
            <icon type="playlist"></icon>
          </tab-trigger>
          <tab-trigger tab="share">
            <icon type="share"></icon>
          </tab-trigger>
        </div>
        <subscribe-button class="mt-1 mobile:hidden tablet:flex"></subscribe-button>
      </div>
    </div>
    <div class="w-full relative overflow-hidden">
      <tab name="chapters">
        <tab-chapters></tab-chapters>
      </tab>
      <tab name="transcripts">
        <tab-transcripts></tab-transcripts>
      </tab>
      <tab name="files">
        <tab-files></tab-files>
      </tab>
      <tab name="playlist">
        <tab-playlist></tab-playlist>
      </tab>
      <tab name="share">
        <tab-share></tab-share>
      </tab>
      <tab-overflow></tab-overflow>
    </div>
  </root>
</podlove-web-player>

### Timers

> Components that show the current playtime or duration.

| _name_           | _attributes_ | _use case_                            |
| ---------------- | ------------ | ------------------------------------- |
| `timer-current`  | -            | displays the current episode playtime |
| `timer-duration` | -            | displays the episode duration         |

#### Example

```html
<root style="max-width:950px;min-width:260px;">
  <div class="flex w-full">
    <progress-bar></progress-bar>
  </div>
  <div class="flex w-full justify-between -mt-2">
    <div class="w-3/12 text-left">
      <timer-current class="text-sm"></timer-current>
    </div>
    <div class="w-3/12 text-right">
      <timer-duration class="text-sm"></timer-duration>
    </div>
  </div>
</root>
```

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;" class="p-4">
    <div class="flex w-full">
      <progress-bar></progress-bar>
    </div>
    <div class="flex w-full justify-between -mt-2">
      <div class="w-3/12 text-left">
        <timer-current class="text-sm"></timer-current>
      </div>
      <div class="w-3/12 text-right">
        <timer-duration class="text-sm"></timer-duration>
      </div>
    </div>
  </root>
</podlove-web-player>

### Context Sensitive Components

> Components that show/hide other components based on a specific appication state

| _name_       | _attributes_                          | _use case_                     |
| ------------ | ------------------------------------- | ------------------------------ |
| `play-state` | _on:_ `initialize`, `active`, `ended` | play state conditional closure |

#### Example

```html
<root style="max-width:950px;min-width:260px;" class="p-4 flex items-center">
  <play-button></play-button>
  <div class="p-4">
    <play-state on="initialize"><span>On Initialize</span></play-state>
    <play-state on="active"><span>On Active</span></play-state>
    <play-state on="ended"><span>On Ended</span></play-state>
  </div>
</root>
```

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;" class="p-4 flex items-center">
    <play-button></play-button>
    <div class="p-4">
      <play-state on="initialize"><span>On Initialize</span></play-state>
      <play-state on="active"><span>On Active</span></play-state>
      <play-state on="ended"><span>On Ended</span></play-state>
    </div>
  </root>
</podlove-web-player>

### Subscribe Button

> Complete subscribe button modal with toggle. Is only displayed if a feed and podcast clients are defined

| _name_             | _attributes_ | _use case_                           |
| ------------------ | ------------ | ------------------------------------ |
| `subscribe-button` | -            | displays the subscribe-button toggle |

#### Example

```html
<root style="max-width:950px;min-width:260px;" class="p-4 flex justify-center">
  <subscribe-button></subscribe-button>
</root>
```

<podlove-web-player episode="fixtures/episode.json" config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;" class="p-4 flex justify-center">
    <subscribe-button></subscribe-button>
  </root>
</podlove-web-player>

### Error Handling

> Error overlay that handles issues with configuration, network issues or media issues. It is only displayed if an error happens

| _name_  | _attributes_ | _use case_                 |
| ------- | ------------ | -------------------------- |
| `error` | -            | displays the error overlay |

#### Example

```html
<root style="max-width:950px;min-width:260px;" class="p-4 flex justify-center h-64">
  <error></error>
</root>
```

<podlove-web-player config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;" class="p-4 flex justify-center h-64">
    <error></error>
  </root>
</podlove-web-player>

### Localized Data

> The player is localized in 4 different languages. Depending on the browser locale the matching locale is selected. If no matching locale was found english is selected.

Localization files:

* [german](https://github.com/podlove/podlove-ui/blob/development/apps/player/lang/de.json)
* [english](https://github.com/podlove/podlove-ui/blob/development/apps/player/lang/en.json)
* [esperanto](https://github.com/podlove/podlove-ui/blob/development/apps/player/lang/en.json)
* [french](https://github.com/podlove/podlove-ui/blob/development/apps/player/lang/fr.json)

#### Example
```html
<root style="max-width:950px;min-width:260px;" class="p-4 flex justify-center h-64">
  {{ $t('PLAYER.PLAY_EPISODE') }}
</root>
```

<podlove-web-player config="fixtures/config.json">
  <root v-pre style="max-width:950px;min-width:260px;" class="p-4 flex justify-center">
    {{ $t('PLAYER.PLAY_EPISODE') }}
  </root>
</podlove-web-player>


### Full Example

<code-sandbox id="player-templating-73ixe" title="Templating" view />
