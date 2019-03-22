# Podlove UI

> Mono Repo for all UI Related Podlove Projects

## Getting Started

### For Contribution

1. Make sure you have Node 10+ and [lerna](https://lernajs.io/) installed
2. Fork this repository
3. Run `lerna bootstrap --hoist` to setup the workspace

### For Usage

This mono repo creates a set of different packages within the `@podlove` NPM orgainzation. Once released you can use each package by simply installing it as an 

## Used Libraries and Frameworks

- Workspace Management: [Lerna](https://lernajs.io/)
- Bundling: [Webpack](https://webpack.js.org/)
- View Renderer: [Vue](https://vuejs.org/)
- Statemanagenet: [Redux](https://redux.js.org/)
- Helpers: [Ramda](https://ramdajs.com/)

Note: These are recommendend and well supported libraries. The usage within each application/package may vary.

## Applications

### @podlove/player 

Core Podlove Player with the following features:

- Player Controls + Progressbar
- Chapters Tab
- Transcripts Tab
- Share Tab
- Files Tab
- Audio Tab

### @podlove/web-player

Embedded version of Podlove Player with the following features:

- Sandbox
- Persistance
- Configuration Resolving
- Share Endpoint

## Packages

### @podlove/build [internal]

Webpack Tooling for UI Projects.

### @podlove/components

Shared Representational Podlove Components.

### @podlove/player-actions

Player Actions API, defining every event that happens within the player.

### @podlove/player-sagas

Player Side Effects Management, abstracting Player eventing and lifecycle.

### @podlove/player-state

Player Reducers and Selectors for creating and maintaining the Player State.

### @podlove/utils

Collection of helper utils for dealing with time, transforming chapters according to the Simple Chapters Specification or 

## Build Environment

TBD: Description of our CI environment (DroneCi)

## Releasing

TBD: Instructions on how to create mono repo releases to npm and the cdn


### Join the conversation

Become a part of the
* **Podlove community** [community.podlove.org](https://community.podlove.org/), or discuss your
* **Web Player** topics or questions on [community.podlove.org/c/podlove-web-player](https://community.podlove.org/c/podlove-web-player).

If you're interested in discussing podcasting topics in general, please visit [sendegate.de](https://sendegate.de/).

### Podlove Docs

* **Podlove Project:** [podlove.github.com](http://podlove.github.com)
* **Web Player:** [docs.podlove.org/podlove-web-player](http://docs.podlove.org/podlove-web-player/)

### Report an issue
If you encounter a specific problem using the Podlove Web Player that you think is a bug, or you see a problem in the documentation, you can report the issue here:  
[github.com/podlove/ui/issues](https://github.com/podlove/ui/issues)

Also, if you have ideas for new features for player, please submit them as a [Github issue](https://github.com/podlove/ui/issues).

Have a look on the Github project to watch the status and progress of your issues:  
[github.com/podlove/ui/projects](https://github.com/podlove/ui/projects/1)

## Support
<a href="https://keycdn.com"><img src="https://logos.keycdn.com/keycdn-logo-black.svg" alt="KeyCDN" width="200px"></a>
