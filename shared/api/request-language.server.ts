import { cookies, headers } from 'next/headers'
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE_NAME } from '@/shared/config/language'

export async function getServerRequestLanguage() {
	const requestHeaders = await headers()
	const headerLanguage = requestHeaders.get('accept-language')?.split(',')[0]?.trim()

	if (headerLanguage) return headerLanguage

	const cookieStore = await cookies()
	return cookieStore.get(LANGUAGE_COOKIE_NAME)?.value || DEFAULT_LANGUAGE
}
