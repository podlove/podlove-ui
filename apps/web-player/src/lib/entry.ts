import { html } from '@podlove/utils/request';
import variant from '../templates/index.js';
import styles from '../styles.css?inline';

const fetchTemplate = async (node: HTMLElement): Promise<string> => {
  const templateUrl = node.getAttribute('template');
  const type = node.getAttribute('variant');

  if (templateUrl) {
    return await html(templateUrl);
  }

  if (type) {
    return await variant(type);
  }

  if (node.innerHTML) {
    return node.innerHTML;
  }

  return await variant('xl');
};

export const createEntry = async (
  entry: HTMLElement
): Promise<{ player: HTMLElement; subscribeButton: HTMLElement }> => {
  const shadow = import.meta.env.MODE === 'development' ? entry : entry.attachShadow({ mode: 'open' });
  const template = await fetchTemplate(entry);

  entry.innerHTML = '';

  const styling = document.createElement('style');
  styling.appendChild(document.createTextNode(styles));

  const player = document.createElement('web-player');
  player.innerHTML = template;

  const subscribeButton = document.createElement('subscribe-button');

  shadow.appendChild(styling);
  shadow.appendChild(player);
  shadow.appendChild(subscribeButton);

  return {
    player,
    subscribeButton
  };
};
