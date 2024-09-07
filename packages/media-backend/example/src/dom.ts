import { get } from 'lodash-es';
import { props } from '../../src/index.js';
import { MediaElement } from '../../src/types.js';

// Props display
export const renderProps =
  (audio: MediaElement) =>
  (input: any): any =>
  () => {
    const element = document.getElementById('props');
    const playerProperties = props(audio);

    if (!element) {
      return input;
    }

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    Object.keys(playerProperties).map((key: any) => {
      const propNode = document.createElement('tr');
      propNode.innerHTML = `<td>${key}</td><td>${get(playerProperties, key)}</td>`;
      element.appendChild(propNode);
    });

    return input;
  };
