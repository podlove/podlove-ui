import { curry } from "ramda";

export const log = curry((category, payload) => {
  console.group(category);

  switch (typeof payload) {
    case "number":
    case "string":
      console.log("payload: ", payload);
      break;
    case "object":
      Object.keys(payload).map((key) => console.log(`${key}: `, payload[key]));
      break;
  }

  console.groupEnd();
});
