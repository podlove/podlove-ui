/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// use a default runtime configuration (advanced mode).
type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;
declare namespace App {
  interface Locals extends Runtime {}
}
