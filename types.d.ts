declare module '*.html' {
  const value: string;
  export default value;
}

declare module '*.mustache' {
  const value: (templateParams:{[key:string]: string|string[]}) => void;
  export default value;
}

