export const inlineStyle = (styles: { [key: string]: string | number }): string =>
  Object.entries(styles).reduce(
    (result: string, [prop, value]) => result + `${prop}: ${value};`,
    ''
  );
