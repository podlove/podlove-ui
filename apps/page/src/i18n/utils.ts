import { get } from 'lodash-es';
import { messages, defaultLang } from './messages';
import { store, selectors } from '../logic';
import { translateFactory } from '@podlove/utils/translate';

export function useTranslations() {
  const lang = getLanguage();
  return translateFactory(lang, defaultLang, messages);
}

export function getLanguage() {
  const locale = selectors.runtime.locale(store.getState());
  return get(locale.split('-'), 0, defaultLang);
}
