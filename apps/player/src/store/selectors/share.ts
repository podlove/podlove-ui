import { createSelector } from 'reselect';
import { prop } from 'ramda';
import { selectors as content } from '@podlove/player-state/content';
import { selectors as embed } from '@podlove/player-state/embed';
import { toHumanTime } from '@podlove/utils/time';
import { addQueryParameter } from '@podlove/utils/url';
import { PodloveWebPlayerContent } from '@podlove/types';

import root from './root.js';

import show from './show.js';
import episode from './episode.js';
import chapter from './chapters.js';
import reference from './reference.js';
import timepiece from './timepiece.js';
import State from '../state.js';

const type = createSelector(
  root.share.content,
  content.content
) as (input: State) => PodloveWebPlayerContent;
const embedSize = createSelector(root.share.embed, embed.size);
const availableEmbedSizes = createSelector(root.share.embed, embed.available);

const hasLink = (state: State) =>
  (type(state) === 'show' && show.link(state)) || (type(state) !== 'show' && episode.link(state));

const hasEmbedLink = (state: State) => {
  return !!(
    type(state) !== 'show' &&
    reference.episode(state) &&
    reference.share(state)
  );
  }

const link = (state: State) => {
  switch (type(state)) {
    case 'episode':
      return episode.link(state);
    case 'time':
      return addQueryParameter(episode.link(state), { t: toHumanTime(timepiece.playtime(state)) });
    default:
      return null;
  }
};

const code = (state: State) => {
  const showTitle = show.title(state);
  const episodeTitle = episode.title(state);
  const currentChapter = chapter.current(state);

  const title = `Podlove Web Player:${showTitle ? ' ' + showTitle : ''}${
    episodeTitle ? ' - ' + episodeTitle : ''
  }`;

  const parameters = {
    episode: reference.episode(state),
    ...(reference.config(state) ? { config: reference.config(state) } : {}),
    ...(type(state) === 'chapter'
      ? { t: `${toHumanTime(currentChapter.start)},${toHumanTime(currentChapter.end)}` }
      : {}),
    ...(type(state) === 'time' ? { t: toHumanTime(timepiece.playtime(state)) } : {})
  };

  return `<iframe title="${title}" height="200" src="${addQueryParameter(
    reference.share(state) || reference.origin(state) || '' + '/share.html',
    parameters
  )}" frameborder="0" scrolling="no" tabindex="0"></iframe>`;
};

export default {
  content: type,
  hasLink,
  hasEmbedLink,
  embedSize,
  availableEmbedSizes,
  link,
  code
};
