import { isDark } from 'farbraum';
import { type rgbColor } from '../types/color.types';

import getPixels from 'get-pixels';
import { type NdArray } from 'ndarray';
import quantize, { type RgbPixel } from 'quantize';

function ndFlatten(img: NdArray): RgbPixel[] {
  let fullArr = [];
  for (let i = 0; i < img.shape[0]; ++i) {
    for (let j = 0; j < img.shape[1]; ++j) {
      const t = [];
      for (let k = 0; k < 3; ++k) {
        t.push(img.get(i, j, k));
      }
      fullArr.push(t as RgbPixel);
    }
  }
  return fullArr;
}

const calcPixels = (src: string): Promise<null | NdArray> =>
  new Promise((resolve) => {
    getPixels(src, (err: Error | null, pixels: NdArray) => {
      if (err) {
        resolve(null);
      }

      resolve(pixels);
    });
  });

export const getImageColors = async (
  src: string
): Promise<{ primaryColor: rgbColor | null; complementaryColor: rgbColor | null }> => {
  const pixels: NdArray | null = await calcPixels(src);

  if (!pixels) {
    return { primaryColor: null, complementaryColor: null };
  }

  const colorPalette = quantize(ndFlatten(pixels), 2);

  if (!colorPalette) {
    return { primaryColor: null, complementaryColor: null };
  }

  const [primaryColor] =  colorPalette.palette();
  const complementaryColor: rgbColor = isDark(primaryColor) ? [240, 240, 240] : [1, 1, 1];

  return { primaryColor, complementaryColor };
};
