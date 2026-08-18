import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE_NAME } from '@/shared/config/language'

const namespaces = [
	'common',
	'nav',
	'apartments',
	'favorites',
	'hiddenListings',
	'profile',
	'filters',
	'settingsAndNotifications',
	'calendar',
	'feedback',
	'currency',
	'auth'
] as const

async function loadMessages(locale: string) {
	const entries = await Promise.all(
		namespaces.map(async namespace => [
			namespace,
			(await import(`../messages/${locale}/${namespace}.json`)).default
		] as const)
	)

	return Object.fromEntries(entries)
}

export default getRequestConfig(async () => {
	const cookieStore = await cookies()
	const cookieValue = cookieStore.get(LANGUAGE_COOKIE_NAME)?.value
	const locale = cookieValue === 'en' ? 'en' : DEFAULT_LANGUAGE

	return {
		locale,
		messages: await loadMessages(locale)
	}
})
