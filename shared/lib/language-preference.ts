import {
	DEFAULT_LANGUAGE,
	LANGUAGE_COOKIE_NAME,
	LANGUAGE_STORAGE_KEY,
	resolveSystemLanguage,
	type LanguagePreference
} from '@/shared/config/language'

export const LANGUAGE_CHANGE_EVENT = 'rent-alert-language-change'

export function getLanguagePreference(): LanguagePreference {
	if (typeof window === 'undefined') return 'system'
	const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
	return stored === 'ru' || stored === 'en' || stored === 'system' ? stored : 'system'
}

export function getRequestLanguage() {
	if (typeof window === 'undefined') return DEFAULT_LANGUAGE
	const preference = getLanguagePreference()
	return preference === 'system' ? resolveSystemLanguage(window.navigator.language) : preference
}

export function saveLanguagePreference(preference: LanguagePreference) {
	const language = preference === 'system' ? resolveSystemLanguage(window.navigator.language) : preference
	window.localStorage.setItem(LANGUAGE_STORAGE_KEY, preference)
	document.cookie = `${LANGUAGE_COOKIE_NAME}=${language}; Path=/; Max-Age=31536000; SameSite=Lax`
	document.documentElement.lang = language
	window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT))
	return language
}
