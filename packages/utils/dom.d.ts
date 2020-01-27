export type AttributesObj = {
  [key: string]: 'string'
}

export function findNode(selector:string):HTMLElement;

export function createNode(tag: string): void;

export function appendNode(node: HTMLElement): (child: HTMLElement)=>HTMLElement;


export function tag(tag: string): (value: string)=> (attributes: AttributesObj)=> string;

export function setStyles(attrs:AttributesObj):(el:HTMLElement)=> HTMLElement;


export function removeStyles(attrs:string[]):(el:HTMLElement)=> void;

export function getClasses (el: HTMLElement): string[];

export function hasOverFlow(el:HTMLElement):boolean;

export function addClasses(classes: string[]):(el:HTMLElement ) => HTMLElement;

export function removeClasses(classes: string[]):(el:HTMLElement) => HTMLElement;

export function sanitize(input: string| Node): string;

export function setAttributes(arrs: AttributesObj):(el:HTMLElement)=> HTMLElement;

export function resizeObserver(element:HTMLElement):(cb:MutationCallback) => void;
