import { cookies, headers } from 'next/headers'

export const AUTH_COOKIE_NAME = 'accessToken'

export class AuthTokenMissingError extends Error {
	constructor() {
		super('Auth token is missing')
		this.name = 'AuthTokenMissingError'
	}
}

export async function getAuthToken() {
	const cookieStore = await cookies()
	const cookieToken = cookieStore.get(AUTH_COOKIE_NAME)?.value

	if (cookieToken) return cookieToken

	const requestHeaders = await headers()
	const authorization = requestHeaders.get('authorization')

	if (authorization?.startsWith('Bearer ')) {
		return authorization.slice(7).trim() || null
	}

	return null
}

export async function getAuthSessionHeaders() {
	const accessToken = await getAuthToken()

	if (!accessToken) {
		return {}
	}

	return {
		Authorization: `Bearer ${accessToken}`
	}
}

export async function getRequiredAuthSessionHeaders() {
	const accessToken = await getAuthToken()

	if (!accessToken) {
		throw new AuthTokenMissingError()
	}

	return {
		Authorization: `Bearer ${accessToken}`
	}
}
