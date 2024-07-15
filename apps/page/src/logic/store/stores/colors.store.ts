import { identity } from 'lodash-es';
import { handleActions, createAction, type Action } from 'redux-actions';
import type { ColorTokens } from '../../../types/color.types';

export interface Colors {
  initialized: boolean;
  primary: ColorTokens;
  complementary: ColorTokens;
  gray: ColorTokens;
}

export type setColorsPayload = Partial<Colors>;

export const actions = {
  setColors: createAction<setColorsPayload>('COLORS_SET')
};

export type State = Colors;

export const reducer = handleActions<State, any>(
  {
    [actions.setColors.toString()]: (state, { payload }: Action<setColorsPayload>) => ({
      ...state,
      initialized: true,
      ...payload
    })
  },
  {
    initialized: false,
    primary: {
      100: [242, 248, 251],
      200: [217, 235, 248],
      300: [176, 215, 244],
      400: [135, 192, 234],
      500: [103, 168, 219],
      600: [71, 138, 186],
      700: [33, 97, 144],
      800: [12, 65, 104],
      900: [4, 41, 68]
    },

    complementary: {
      100: [255, 248, 246],
      200: [254, 236, 222],
      300: [255, 231, 173],
      400: [249, 155, 125],
      500: [249, 119, 81],
      600: [202, 85, 57],
      700: [157, 65, 39],
      800: [118, 52, 28],
      900: [52, 20, 1]
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
);

export const selectors = {
  colors: identity,
  initialized: (state: State) => state.initialized
};
