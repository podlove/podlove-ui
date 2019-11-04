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

Instead of using a predefined variant you can provide a template either via the `data-template` attribute or inline as part of the target dom.
Start your own custom player variant by using the following sandbox, that includes all available components:

<code-sandbox id="player-templating-73ixe" title="Templating" view />
