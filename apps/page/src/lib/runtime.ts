export const isClient = () => typeof globalThis.window !== 'undefined';
export const isServer = () => typeof globalThis.window === 'undefined';
