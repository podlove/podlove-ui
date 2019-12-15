---
navigation: 2
---

# Installation

Podlove Webplayer can be integrated in different ways. We provide the always latest version via CDN or all versions as an npm package.

## CDN

The easiest way to integrate the player is to simply integrate this script in your page:

For https context:
```html
<script src="https://cdn.podlove.org/web-player/5.x/embed.js"></script>
```

For http context:
```html
<script src="http://cdn.podlove.org/web-player/5.x/embed.js"></script>
```

Afterwards `podlovePlayer` should be available on the window object:

```html
<script>
  podlovePlayer('#example', '/path/to/episode/definition/or/object', '/path/to/configuration/or/object');
</script>
```

## NPM

If you want to serve a special player version you can also find the player as an npm package [@podlove/web-player](https://www.npmjs.com/package/@podlove/web-player).

To integrate the player you first have to install tha package:

```javascript
npm install @podlove/web-player --save
```

Move the player assets to some public folder of your webserver. By default the player will try to load further chunks from the webserver base. If the player files are located in a subpath you have to adapt the `base` accordingly (see [config](config.html)
