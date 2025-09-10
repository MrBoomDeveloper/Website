import translations from "./translations.json";

type Locale = keyof typeof translations
type LocalizationKey = keyof typeof translations.en

export const locales: Locale[] = ["en", "ru"];
const defaultLocale = locales[0];

export function localeStaticPaths() {
	return locales.map(locale => {
		return {
			params: {
				locale
			}
		}
	});
}

export function getLocaleFromUrl(
	url: URL
): Locale {
	const [, locale] = url.pathname.split('/');
	
	if(locale in translations) {
		return locale as Locale
	}
	
	return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: LocalizationKey): string {
	// @ts-ignore
    return translations[locale][key] || translations[defaultLocale][key];
  }
}