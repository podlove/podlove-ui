import { MediaElement } from "../../src/types";

export const audioLoader = (
  audio: MediaElement,
  cb: (target: any, event: Event) => void
) => {
  audio.addEventListener(
    "canplay",
    (event) => {
      cb(event.target, event);
    },
    { once: true }
  );
  audio.load();
};
