import { get } from 'lodash-es';

const defaultExport = (result) => get(result, 'default');

export default async (type = '') => {
  switch (type.toUpperCase()) {
    case 'XL':
      return await import('./variant-xl.html?raw').then(defaultExport);
    case 'L':
      return await import('./variant-l.html?raw').then(defaultExport);
    case 'M':
      return await import('./variant-m.html?raw').then(defaultExport);
    default:
      return null;
  }
};
