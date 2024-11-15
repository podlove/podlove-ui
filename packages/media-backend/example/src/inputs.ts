
import { get, flowRight as compose } from "lodash-es";
import { actions } from "../../src/index.js";
import { MediaElement } from "../../src/types.js";

export const volumeInput = document.getElementById("volume");
export const rateInput = document.getElementById("rate");
export const progressBar = document.getElementById(
  "progress"
) as HTMLInputElement;

export const registerInputs = (node: MediaElement) => {
  const mediaActions = actions(node);
  const getValue = get(node, ["target", "value"], 0);

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
