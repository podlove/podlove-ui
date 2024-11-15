import { get } from 'lodash-es';
import { type App, provide, inject } from 'vue';

export function translateFactory(lang: string, defaultLang: string, messages: any) {
  return (key: string, args?: { [key: string]: any }) => {
    const message = get(messages, [lang, key].join('.'));

    if (typeof message === 'string') {
      return message;
    }

    if (typeof message === 'function' && !!args) {
      return message(args);
    }

    const fallback = get(messages, [defaultLang, key].join('.'));

    if (fallback) {
      return fallback;
    }

    return key;
  };
}

export const translationsToken = '$TranslationsStoreToken$';

export const provideTranslations = ({
  lang,
  defaultLang,
  messages,
  app
}: {
  lang: string;
  defaultLang: string;
  messages: any;
  app?: App<any>;
}) => {
  const translate = translateFactory(lang, defaultLang, messages);

  if (app) {
    app.provide(translationsToken, translate);
  } else {
    provide(translationsToken, translate);
  }
};

export const useTranslations = (): ((key: string, args?: { [key: string]: any }) => string) =>
  inject(translationsToken) as (key: string, args?: { [key: string]: any }) => string;
