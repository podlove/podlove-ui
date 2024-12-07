import ColorThief from 'colorthief';
import fetch from 'node-fetch';
import { type rgbColor } from '../types/color.types';

// const createImage = (src: string): Promise<HTMLImageElement> => {
//   const image = document.createElement('img');
//   image.src = src;
//   image.style.display = 'none';
//   globalThis.window.document.body.appendChild(image);

//   return new Promise((resolve, reject) => {
//     if (image.complete) {
//       return resolve(image);
//     }

//     image.onload = () => {
//       resolve(image);
//     };

//     image.onerror = () => {
//       reject();
//     }
//   });
// }

export const getImageColors = async (src: string): Promise<{ primaryColor: rgbColor; complementaryColor: rgbColor; } | null> => {
  const image = await fetch(src)
  .then(response => {
    if (!response.ok) {
      return null;
    }

    return response.buffer();
  }).catch(() => null);

  if (!image) {
    return {primaryColor: null, complementaryColor: null }
  }

  const [primaryColor, complementaryColor] = ColorThief.getPalette(image);

  return {primaryColor, complementaryColor };
}

