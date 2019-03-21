# Podlove Player

![Preview](screenshot.png)

## About

HTML5 Goodness for Podcasting

**Podlove** Web Player is a Podcast-optimized, HTML5-based video and audio player.
It can be used as a WordPress plugin or within a static HTML/JavaScript context.

The **Podlove** Web Player supports almost every modern browser (Edge, Firefox, Chrome, Safari) and also does captions, chapters, transcripts and much more. 

* [Web Player Documentation](http://docs.podlove.org/podlove-web-player/)
* [Official site on podlove.org](http://podlove.org/podlove-web-player/)

## Used Technologies

- Package Manager: [npm](https://npmjs.org)
- Media Library: [Podlove Pure HTML5 Audio Driver](https://github.com/podlove/html5-audio-driver/)
- View Renderer: [VueJS](https://github.com/vuejs/vue)
- Bundler: [Webpack](https://github.com/webpack/webpack)
- State Management: [Redux](https://github.com/reactjs/redux) & [redux-vuex](https://github.com/alexander-heimbuch/redux-vuex#readme)

## Architecture

![Architecture](architecture.svg)

## Getting Started

### Development

1. Bootstrap the player package: `lerna bootstrap --hoist`
2. Run the development mode: `npm run dev`

### Building

1. Make sure that the dependencies are up to date: `lerna bootstrap --hoist`
2. Run the build step: `npm run build`


### Join the conversation

Become a part of the
* **Podlove community** [community.podlove.org](https://community.podlove.org/), or discuss your
* **Web Player** topics or questions on [community.podlove.org/c/podlove-web-player](https://community.podlove.org/c/podlove-web-player).

If you're interested in discussing podcasting topics in general, please visit [sendegate.de](https://sendegate.de/).

### Podlove Docs

* **Podlove Project:** [podlove.github.com](http://podlove.github.com)
* **Web Player:** [docs.podlove.org/podlove-web-player](http://docs.podlove.org/podlove-web-player/)

### Report an issue
If you encounter a specific problem using the Podlove Web Player that you think is a bug, or you see a problem in the documentation, you can report the issue here:<br>
[github.com/podlove/ui/issues](https://github.com/podlove/ui/issues)

Also, if you have ideas for new features for player, please submit them as a [Github issue](https://github.com/podlove/ui/issues).

Have a look on the Github project to watch the status and progress of your issues:  
[github.com/podlove/ui/projects](https://github.com/podlove/ui/projects/1)
