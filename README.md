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

## Support
<a href="https://keycdn.com"><img src="https://logos.keycdn.com/keycdn-logo-black.svg" alt="KeyCDN" width="200px"></a>
