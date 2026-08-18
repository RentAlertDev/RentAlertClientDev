export const LANGUAGE_STORAGE_KEY = 'rent-alert-language'
export const LANGUAGE_COOKIE_NAME = 'rentAlertLanguage'
export const DEFAULT_LANGUAGE = 'ru'
export const LANGUAGE_OPTIONS = [
	{ label: 'Как в системе', value: 'system' },
	{ label: 'Русский', value: 'ru' },
	{ label: 'English', value: 'en' }
] as const

export type LanguagePreference = (typeof LANGUAGE_OPTIONS)[number]['value']

export function resolveSystemLanguage(language?: string) {
	const normalized = language?.toLowerCase().split('-')[0]
	return normalized === 'en' ? 'en' : DEFAULT_LANGUAGE
}
