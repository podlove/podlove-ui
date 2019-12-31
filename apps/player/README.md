# Podlove Player

> State Bound Building Blocks to create Podcast Player UIs

## Architecture

![Architecture](architecture.svg)

## Available Components

| *name*              | *properties*                          | *use case*                                            |
| --------------------|---------------------------------------|-------------------------------------------------------|
| `chapter-next`      | -                                     | jump to next chapter                                  |
| `chapter-previous`  | -                                     | jump to previous chapter                              |
| `current-chapter`   | -                                     | current chapter                                       |
| `divider`           | -                                     | visual divider                                        |
| `episode-title`     | -                                     | episode title                                         |
| `error`             | -                                     | error overlay                                         |
| `play-button`       | _variant:_ `simple`, `details`        | play button with states                               |
| `play-state`        | _on:_ `initialize`, `active`, `ended` | play state conditional closure                        |
| `poster`            | -                                     | show, episode or chapter cover                        |
| `progress-bar`      | -                                     | episode progress with chapter and progress indicators |
| `root`              | -                                     | font and theme closure element                        |
| `show-title`        | -                                     | show title                                            |
| `speed-control`     | -                                     | audio speed stepper                                   |
| `step-backward`     | -                                     | 15 seconds back stepper                               |
| `step-forward`      | -                                     | 30 seconds forward stepper                            |
| `subscribe-button`  | -                                     | subscribe button trigger                              |
| `tab`               | _name:_ tab name                      | conditional tab closure                               |
| `tab-chapters`      | -                                     | chapters tab element                                  |
| `tab-files`         | -                                     | files tab element                                     |
| `tab-overflow`      | -                                     | tab bottom transition                                 |
| `tab-playlist`      | -                                     | playlist tab element                                  |
| `tab-share`         | -                                     | share tab element                                     |
| `tab-shownotes`     | -                                     | shownotes tab element                                 |
| `tab-title`         | -                                     | tab title with close button                           |
| `tab-transcripts`   | -                                     | title tab element                                     |
| `tab-trigger`       | -                                     | trigger element for tabs                              |
| `timer-current`     | -                                     | timer with current playtime                           |
| `timer-duration`    | -                                     | timer with duration left                              |
| `volume-control`    | -                                     | volume control                                        |

## Getting Started

### Development

1. Bootstrap the player package: `lerna bootstrap --hoist`
2. Run the development mode: `npm run dev`
3. Open your browser on `http://localhost:9000` to get started

### Building

1. Make sure that the dependencies are up to date: `lerna bootstrap --hoist`
2. Run the build step: `npm run build`
