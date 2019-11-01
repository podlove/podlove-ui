---
title: Embedding
navigation: 3
---

# Embedding

## Signature

- Selector can be a css selector or a dom node reference
- An iframe as the canvas is injected into the reference, encapsulating the player
- Configuration can be provided as a meta object or an url to the configuration json file
- Canvas width can be defined by the template
- Canvas height is adapted to players height


Using a selector that matches multiple elements the player will be rendered in the first matching element.
The _podlovePlayer_ returns a promise with a redux store as a result that can be used to change the player state from outside.

## Example

<iframe
     src="https://codesandbox.io/embed/player-configuration-otvys?codemirror=1&fontsize=14&initialpath=embed.html&module=%2Fembed.js&view=editor"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="player-configuration"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

