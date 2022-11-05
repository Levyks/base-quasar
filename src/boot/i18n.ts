import { ref } from 'vue';
import { Quasar, Loading, LocalStorage } from 'quasar';
import { boot } from 'quasar/wrappers';
import { createI18n, I18n, Locale } from 'vue-i18n';

import locales from '@/locales';
import { updateTitle } from '@/router';

export type MessageLanguages = keyof typeof locales;
// Type-define 'pt-BR' as the master schema for the resource
export type MessageSchema = typeof import('@/locales/en').default;

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-interface */

const quasarLangs = import.meta.glob('../../node_modules/quasar/lang/*.mjs');

function getValidLocale(locale = navigator.language, fallback = 'en'): Locale {
  const availableLocations = Object.keys(locales);

  if (availableLocations.includes(locale)) return locale;

  const onlyLanguageCode = locale.split('-')[0];

  if (availableLocations.includes(onlyLanguageCode)) return onlyLanguageCode;

  const firstMatchingLocale = availableLocations.find((availableLocale) =>
    availableLocale.startsWith(onlyLanguageCode)
  );
  if (firstMatchingLocale) return firstMatchingLocale;

  return fallback;
}

function loadAppLocale(
  i18n: I18n<MessageSchema, any, any, string, true>,
  locale: string
): Promise<void> {
  const hideLoading = Loading.show();

  return locales[locale]().then((module) => {
    i18n.global.setLocaleMessage(locale, module.default as any);

    hideLoading();
  });
}

function loadAndUpdateAppLocale(locale: Locale) {
  return loadAppLocale(i18n, locale).then(() => {
    ref(i18n.global.locale).value = locale;
  });
}

function loadAndUpdateQuasarLocale(lang: string) {
  const path = `../../node_modules/quasar/lang/${lang}.mjs`;
  if (!quasarLangs[path]) return;

  const loadLang = quasarLangs[path];

  return loadLang().then((module) => {
    Quasar.lang.set(module.default);
  });
}

export function loadAndUpdateLocale(locale: string) {
  return Promise.all([
    loadAndUpdateAppLocale(locale),
    loadAndUpdateQuasarLocale(locale),
  ]).then(() => {
    updateTitle();
    document.documentElement.lang = locale;
    LocalStorage.set('locale', locale);
  });
}

let i18n: I18n<MessageSchema, any, any, string, true>;

export default boot(({ app }) => {
  const locale: Locale =
    LocalStorage.getItem<string>('locale') || getValidLocale();

  i18n = createI18n({ locale });
  (window as any).i18n = i18n;

  // Set i18n instance on app
  app.use(i18n);

  loadAndUpdateLocale(locale);
});

export { i18n };
