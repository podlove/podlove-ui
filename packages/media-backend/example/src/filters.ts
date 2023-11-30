import { mono, stereo } from "../../src/filters";
import { MediaElement } from "../../src/types";

// actions
const monoButton = document.getElementById("mono");
const stereoButton = document.getElementById("stereo");

export const registerFilters = (node: MediaElement) => {
  monoButton?.addEventListener("click", () => mono(node));
  stereoButton?.addEventListener("click", () => stereo(node));
};
