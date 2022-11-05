import { Locale } from 'vue-i18n';

type LocaleDict = {
  [key: string]: string | LocaleDict;
};

export default {
  'pt-BR': () => import('./pt-BR'),
  en: () => import('./en'),
} as Record<Locale, () => Promise<{ default: LocaleDict }>>;
