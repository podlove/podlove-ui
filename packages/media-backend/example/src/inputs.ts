import { compose, defaultTo, path } from "ramda";
import { actions } from "../../src";
import { MediaElement } from "../../src/types";

export const volumeInput = document.getElementById("volume");
export const rateInput = document.getElementById("rate");
export const progressBar = document.getElementById(
  "progress"
) as HTMLInputElement;

export const registerInputs = (node: MediaElement) => {
  const mediaActions = actions(node);
  const getValue = compose(defaultTo(0), path(["target", "value"]));

  volumeInput?.addEventListener(
    "change",
    compose(mediaActions.setVolume, getValue)
  );
  rateInput?.addEventListener(
    "change",
    compose(mediaActions.setRate, getValue)
  );
  progressBar?.addEventListener(
    "change",
    compose(mediaActions.setPlaytime, (val: number) => val * 250, getValue)
  );
};
