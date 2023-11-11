# Podlove UI

> Mono Repo for all UI Related Podlove Projects

[![Build Status](https://cloud.drone.io/api/badges/podlove/ui/status.svg?ref=/refs/heads/develop)](https://cloud.drone.io/podlove/ui)

## Getting Started

### For Contribution

1. Make sure you have Node 10+ and [lerna](https://lerna.js.org/) installed
2. Fork this repository
3. Run `npm install` to setup the workspace
4. Run npm scripts for development (e.g. `npm run dev:web-player`)

### For Usage

This mono repo creates a set of different packages within the `@podlove` NPM organization. Once released you can use each package by simply installing it as a dependency.

## Used Libraries and Frameworks

- Workspace Management: [Lerna](https://lerna.js.org/)
- Bundling: [Webpack](https://webpack.js.org/)
- View Renderer: [Vue](https://vuejs.org/)
- Statemanagement: [Redux](https://redux.js.org/)
- Helpers: [Ramda](https://ramdajs.com/)
- Styling: [Tailwind](https://tailwindcss.com/)
- Testing: [Jest](https://jestjs.io/) and [Cypress](https://www.cypress.io/)

Note: These are recommended and well supported libraries. The usage within each application/package may vary.

## Applications

### [@podlove/player](apps/player/README.md) 

Core Podlove Player State Bound Components. Building blocks with state bindings to create the web player 

### [@podlove/web-player](apps/web-player/README.md) 

Embedded version of Podlove Player with the following features:

- Sandbox
- Persistance
- Configuration Resolving
- Share Endpoint
- Templating

### [@podlove/subscribe-button](apps/subscribe-button/README.md)

Embedded Subscribe Button with client detection:

- Podcatcher Services
- Podcatcher Clients
- Install and RSS Feed Endcard

## Packages

### [@podlove/button-actions](packages/button/actions/README.md)

Button actions API, types and events that are used in state and subscribe-button.

### [@podlove/button-config](packages/button/config/README.md)

Parser for subscribe-button configuration.

### [@podlove/button-state](packages/button/state/README.md)

Subscribe Button reducers and selectors for creating and maintaining the subscribe-button state.

### [@podlove/clients](packages/clients/README.md)

Library containing up to date podcatcher clients and uri schema.

### [@podlove/components](packages/components/README.md)

Shared Representational Podlove Components. Stateless components that dispatch podlove events.

### [@podlove/player-actions](packages/player/actions/README.md)

Player actions API, types and events that are used in state, sagas and player.

### [@podlove/player-config](packages/player/config/README.md)

Parser for player configuration.

### [@podlove/player-sagas](packages/player/sagas/README.md)

Player Side Effects Management, abstracting Player eventing and lifecycle.

### [@podlove/player-state](packages/player/state/README.md)

Player reducers and selectors for creating and maintaining the player state.

### [@podlove/utils](packages/utils/README.md)

Collection of helper utils for dealing with time, transforming chapters according to the Simple Chapters Specification or making requests.

## Docs

### [web-player](https://docs.podlove.org/podlove-web-player)

Documentation for Podlove Web Player

## Build Environment

Used CI: [DroneCI](https://cloud.drone.io/podlove/podlove-ui) with the following [pipelines](.drone.yml):

- `apps/player`
- `apps/web-player`
- `apps/subscribe-button`
- `apps/components`
- `packages/player-actions`
- `packages/player-sagas`
- `packages/player-state`
- `packages/player-utils`
- `packages/clients`
- `docs/web-player`

Steps:

- `lint`
- `test`
- `build`
- `integration`
- `release`

## Releasing

Podlove Web Player follows the git flow convention with support branches. Please read the [documentation to follow this pattern](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) if you want to contribute.

To create a release you have to:

1. Create a release branch from the `master` or `support` branch 
2. Run the following lerna command in the release branch: `lerna version --no-git-tag-version`
  - Select a major/minor/patch/custom version (please see [semantic versioning documentation](https://semver.org))
3. Create a PR against master/support branch and merge it if the release/review was successfull
4. Tag the master/support commit with the release version (e.g. `v5.0.2`)
5. Create an integration branch by branching from develop and merge master into the integration branch
6. Create a PR with develop as the target branch and merge it if the release/review was successfull

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

### CDN sponsored by
<a href="https://keycdn.com"><img src="https://logos.keycdn.com/keycdn-logo-black.svg" alt="KeyCDN" width="200px"></a>

### Cross Browser Testing powered by
<a href="https://www.browserstack.com/"><img src="https://d2ogrdw2mh0rsl.cloudfront.net/production/images/static/header/header-logo.svg" alt="Bowserstack Logo" width="300px">
</a>
