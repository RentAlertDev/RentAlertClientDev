import type { TelegramLoginResponse } from './types'

export function getAccessToken(response?: TelegramLoginResponse) {
	if (!response) {
		return null
	}

	return response.accessToken ?? response.token ?? response.accessToke ?? null
}
