# @podlove/types

TypeScript type definitions for Podlove Framework.

## Install

Install the types with

```bash
npm install D --save-dev
```

## Embedded Web Player
If you want to import the types for the embedded web player you can import the types with:

```ts
import "@podlove/types/embed"
```

After this `windows.podlovePlayer` should be defined.

You can also just import the web player function type if you want:

```ts
import { podlovePlayer } from "@podlove/types";
```

this way you can also import other types like:

```ts
import { PodloveWebPlayerConfig } from "@podlove/types";