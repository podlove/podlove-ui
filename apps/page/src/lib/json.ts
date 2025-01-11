export const safeParse = <T>(input: string, fallback: T) => {
  try {
    return JSON.parse(input);
  } catch (err) {
    return fallback;
  }
}
