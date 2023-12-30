import { get } from "lodash-es";

export const select = (prop: string, fallback = {}) => (data: any) => get(data, prop, fallback);
