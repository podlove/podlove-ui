import { extractColors } from 'extract-colors';
import getPixels from 'get-pixels';
import { type rgbColor } from '../types/color.types';

export const getImageColors = async (
  src: string
): Promise<{ primaryColor: rgbColor | null; complementaryColor: rgbColor | null }> =>
  new Promise((resolve) => {
    getPixels(src, async (err, pixels) => {
      if (err) {
        return resolve({ primaryColor: null, complementaryColor: null });
      }

      const data = [...pixels.data];
      const [width, height] = pixels.shape;

      const { primaryColor, complementaryColor } = await extractColors({ data, width, height })
        .then(([primary, secondary]) => ({
          primaryColor: [primary.red, primary.green, primary.blue] as rgbColor,
          complementaryColor: [secondary.red, secondary.green, secondary.blue] as rgbColor,
        }))
        .catch(() => ({ primaryColor: null, complementaryColor: null }));

      return resolve({ primaryColor, complementaryColor });
    });
  });
