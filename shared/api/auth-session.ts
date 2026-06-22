import { cookies } from 'next/headers'

export const AUTH_COOKIE_NAME = 'accessToken'

export class AuthTokenMissingError extends Error {
	constructor() {
		super('Auth token is missing')
		this.name = 'AuthTokenMissingError'
	}
}

export async function getAuthToken() {
	const cookieStore = await cookies()

	return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null
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
