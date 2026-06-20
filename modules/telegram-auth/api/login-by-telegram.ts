import { httpClient } from '@/shared/api/http-client'
import { TELEGRAM_AUTH_API } from '../model/constants'
import type {
	TelegramLoginRequest,
	TelegramLoginResponse
} from '../model/types'

export async function loginByTelegramInitData(initData: string) {
	const response = await httpClient.post<
		TelegramLoginResponse,
		{ data: TelegramLoginResponse },
		TelegramLoginRequest
	>(TELEGRAM_AUTH_API.login, {
		initData
	})

	return response.data
}
