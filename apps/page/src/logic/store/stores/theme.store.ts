import { handleActions, createAction, type Action } from 'redux-actions';
import type { ColorTokens } from '../../../types/color.types';

export interface Colors {
  primary: ColorTokens;
  complementary: ColorTokens;
  gray: ColorTokens;
}

export type setThemePayload = {
  colors: Partial<Colors>;
}

export const actions = {
  setTheme: createAction<setThemePayload>('COLORS_SET')
};

export interface State {
  initialized: boolean;
  colors: Colors;
}

export const reducer = handleActions<State, any>(
  {
    [actions.setTheme.toString()]: (state, { payload }: Action<setThemePayload>) => ({
      ...state,
      initialized: true,
      colors: {
        ...state.colors,
        ...payload.colors
      }
    })
  },
  {
    initialized: false,
    colors: {
      primary: {
        100: [255, 255, 255],
        200: [255, 255, 255],
        300: [255, 255, 255],
        400: [254, 255, 255],
        500: [254, 255, 255],
        600: [229, 230, 230],
        700: [229, 230, 230],
        800: [229, 230, 230],
        900: [229, 230, 230]
      },

      complementary: {
        100: [217, 217, 217],
        200: [204, 204, 204],
        300: [191, 191, 191],
        400: [153, 153, 153],
        500: [77, 77, 77],
        600: [0, 0, 0],
        700: [0, 0, 0],
        800: [0, 0, 0],
        900: [0, 0, 0]
      },

      gray: {
        100: [255, 255, 255],
        200: [230, 231, 232],
        300: [205, 209, 215],
        400: [154, 165, 172],
        500: [115, 127, 135],
        600: [86, 97, 104],
        700: [61, 70, 85],
        800: [34, 38, 44],
        900: [7, 8, 9]
      }
    }
  }
);

export const selectors = {
  colors: (state: State) => state.colors,
  initialized: (state: State) => state.initialized
};
