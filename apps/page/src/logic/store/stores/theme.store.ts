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
        100: [251, 243, 198],
        200: [251, 243, 198],
        300: [251, 243, 198],
        400: [251, 243, 198],
        500: [251, 243, 198],
        600: [249, 229, 143],
        700: [245, 208, 79],
        800: [240, 183, 29],
        900: [224, 160, 18],
      },

      complementary: {
        100: [230, 237, 248],
        200: [200, 218, 239],
        300: [152, 188, 225],
        400: [96, 152, 208],
        500: [60, 123, 187],
        600: [43, 97, 158],
        700: [36, 77, 128],
        800: [33, 67, 107],
        900: [33, 58, 89],
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
