import { get } from 'lodash-es';
import { messages, defaultLang } from './messages';
import { store, selectors } from '../logic'

export function useTranslations() {
  const lang = getLanguage();

  return (key: string) => {
    const message = get(messages, [lang, key].join('.'));

    if (message) {
      return message
    }

    const fallback = get(messages, [defaultLang, key].join('.'));

    if (fallback) {
      return fallback;
    }

    return key;
  };
}

export function getLanguage() {
  const locale = selectors.runtime.locale(store.getState());
  return get(locale.split('-'), 0, defaultLang);
}
