import { compose } from "ramda";
import { actions, props } from "../../src";
import { MediaElement } from "../../src/types";

// actions
export const playButton = document.getElementById("play");
export const pauseButton = document.getElementById("pause");
export const loadButton = document.getElementById("load");
export const restartButton = document.getElementById("restart");
export const muteButton = document.getElementById("mute");
export const unmuteButton = document.getElementById("unmute");
export const backwardButton = document.getElementById("backward");
export const forwardButton = document.getElementById("forward");

export const registerActions = (node: MediaElement) => {
  const mediaActions = actions(node);

  (window as any).actions = mediaActions;

  loadButton?.addEventListener("click", mediaActions.load);
  playButton?.addEventListener("click", mediaActions.play);
  pauseButton?.addEventListener("click", mediaActions.pause);
  muteButton?.addEventListener("click", mediaActions.mute);
  unmuteButton?.addEventListener("click", mediaActions.unmute);
  backwardButton?.addEventListener(
    "click",
    compose(
      mediaActions.setPlaytime,
      ({ playtime }) => (playtime || 0) - 30,
      () => props(node)
    )
  );
  forwardButton?.addEventListener(
    "click",
    compose(
      mediaActions.setPlaytime,
      ({ playtime }) => (playtime || 0) + 30,
      () => props(node)
    )
  );
  restartButton?.addEventListener(
    "click",
    compose(
      mediaActions.play,
      () => mediaActions.setPlaytime(0),
      mediaActions.pause
    )
  );
};
