import { html, css } from '@podlove/utils/request';
import variant from '../templates/index.js';
import frameworkStyle from '../styles.css?inline';

const fetchPlayerStyles = () => css(import.meta.resolve('./style.css'));

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
  // @ts-ignore
  const shadow = import.meta.env.MODE === 'development' ? entry : entry.attachShadow({ mode: 'open' });
  const template = await fetchTemplate(entry);

  entry.innerHTML = '';

  const styling = document.createElement('style');
  styling.appendChild(document.createTextNode(frameworkStyle));

  await fetchPlayerStyles().then(result => {
    if (!result) {
      return
    }

    styling.appendChild(document.createTextNode(result));
  });

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
