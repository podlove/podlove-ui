import { events } from "../../src";

import { progressBar } from "./inputs";
import { renderProps } from "./dom";
import { MediaElement } from "../../src/types";

export const registerEvents = (node: MediaElement) => {
  const onEvent = renderProps(node);
  const mediaEvents = events(node);

  mediaEvents.onLoaded(onEvent("ready"));
  mediaEvents.onLoaded(onEvent("loaded"));
  mediaEvents.onLoading(onEvent("loading"));
  mediaEvents.onBuffering(onEvent("buffering"));
  mediaEvents.onBufferChange(onEvent("buffer changed"));
  mediaEvents.onPause(onEvent("paused"));
  mediaEvents.onPlay(onEvent("playing"));
  mediaEvents.onPlaytimeUpdate(onEvent("playtime"));
  mediaEvents.onError(onEvent("error"));
  mediaEvents.onEnd(onEvent("end"));
  mediaEvents.onRateChange(onEvent("rate changed"));
  mediaEvents.onDurationChange(onEvent("duration changed"));
  mediaEvents.onVolumeChange(onEvent("volume changed"));
  mediaEvents.onFilterUpdate(onEvent("filter updated"));
  mediaEvents.onLiveSyncUpdate(onEvent("livesync updated"));
  mediaEvents.onPlaytimeUpdate((value: number | undefined) => {
    if (typeof value !== "undefined" && progressBar) {
      progressBar.value = (value / 250).toString();
    }
  });
};
