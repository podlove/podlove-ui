import quantize from 'quantize';
import { isDark } from 'farbraum';
import { type rgbColor } from '../types/color.types';
import ndarray from 'ndarray';

const fetchImage = async (
  imageUrl: string
): Promise<{ data: ArrayBuffer; dimensions: { width: number; height: number } }> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      if (!context) {
        return reject(null);
      }

      context.drawImage(img, 0, 0);
      const pixels = context.getImageData(0, 0, img.width, img.height);
      resolve({ data: pixels.data, dimensions: { width: img.width, height: img.height } });
    };
    img.onerror = reject;
    img.src = imageUrl;
  });

const parseImage = ({
  data,
  dimensions
}: {
  data: ArrayBuffer;
  dimensions: { width: number; height: number };
}): ndarray.NdArray =>
  ndarray(
    new Uint8Array(data),
    [dimensions.width, dimensions.height, 4],
    [4, 4 * dimensions.width, 1],
    0
  );

const convertToPixels = (pixels: ndarray.NdArray): quantize.RgbPixel[] => {
  const result = [];
  for (let i = 0; i < pixels.shape[0]; ++i) {
    for (let j = 0; j < pixels.shape[1]; ++j) {
      const t = [];
      for (let k = 0; k < 3; ++k) {
        t.push(pixels.get(i, j, k));
      }
      result.push(t as quantize.RgbPixel);
    }
  }

  return result;
};

const extractColors = (
  pixels: quantize.RgbPixel[]
): { primaryColor: rgbColor | null; complementaryColor: rgbColor | null } => {
  const colorPalette = quantize(pixels, 1);

  if (!colorPalette) {
    return { primaryColor: null, complementaryColor: null };
  }

  const [primaryColor] = colorPalette.palette();
  const complementaryColor: rgbColor = isDark(primaryColor) ? [240, 240, 240] : [1, 1, 1];

  return { primaryColor, complementaryColor };
};

const getImageColors = async (
  src: string
): Promise<{ primaryColor: rgbColor | null; complementaryColor: rgbColor | null }> =>
  fetchImage(src)
    .then(parseImage)
    .then(convertToPixels)
    .then(extractColors)
    .catch(() => ({ primaryColor: null, complementaryColor: null }));

export default getImageColors;
