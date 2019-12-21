---
title: Embedding
navigation: 3
---

# Embedding

<code-sandbox id="player-configuration-p9obe" title="Player Embedding" initialpath="/embed.html" module="/embed.js" view="editor"></code-sandbox>

### Signature

- Selector can be a css selector or a dom node reference
- An iframe as the canvas is injected into the reference, encapsulating the player
- Configuration can be provided as a meta object or an url to the configuration json file
- Canvas width can be defined by the template
- Canvas height is adapted to players height


Using a selector that matches multiple elements the player will be rendered in the first matching element.
The _podlovePlayer_ returns a promise with a redux store as a result that can be used to change the player state from outside.
