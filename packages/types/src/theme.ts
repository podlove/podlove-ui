export interface PodloveThemeTokens {
  brand?: string | null;
  brandDark?: string | null;
  brandDarkest?: string | null;
  brandLightest?: string | null;
  shadeDark?: string | null;
  shadeBase?: string | null;
  contrast?: string | null;
  alt?: string | null;
}

export interface PodloveThemeFont {
  name: string;
  family: string[];
  weight: number;
  src: string[];
}

export interface PodloveTheme {
  /**
   * Tokens
   * - if defined the player defaults are dropped
   * - rgba as well as hex values are allowed
   * - use this generator to get a direct visual feedback:
   */
  tokens: PodloveThemeTokens;
}
