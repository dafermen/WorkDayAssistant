import { createContext } from 'react';
import { localeByLanguage, translate, type Language, type TranslationKey } from './translations';

type TranslationVariables = Readonly<Record<string, string>>;

export interface LanguageContextValue {
  readonly language: Language;
  readonly locale: string;
  readonly setLanguage: (language: Language) => void;
  readonly t: (key: TranslationKey, variables?: TranslationVariables) => string;
}

const defaultLanguage: Language = 'en';

export const LanguageContext = createContext<LanguageContextValue>({
  language: defaultLanguage,
  locale: localeByLanguage[defaultLanguage],
  setLanguage: () => {},
  t: (key, variables) => translate(defaultLanguage, key, variables),
});
