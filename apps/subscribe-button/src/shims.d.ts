declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.css?inline' {
  const content: string;
  export default content;
}
