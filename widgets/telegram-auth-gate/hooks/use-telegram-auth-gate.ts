'use client'

import { useCallback, useState } from 'react'
import { getAccessToken } from '@/modules/telegram-auth/model/get-access-token'
import { useTelegramInitData } from '@/modules/telegram-init-data'
import { useSubmitTelegramLogin } from './use-submit-telegram-login'

export function useTelegramAuthGate() {
	const { error: telegramError, telegram } = useTelegramInitData()
	const telegramLogin = useSubmitTelegramLogin(telegram.initData)
	const accessToken = getAccessToken(telegramLogin.data)
	const [isAuthorized, setIsAuthorized] = useState(false)
	const username = telegram.user?.username
		? `@${telegram.user.username}`
		: telegram.user?.first_name

	const completeAuthorization = useCallback(() => {
		if (accessToken) {
			setIsAuthorized(true)
		}
	}, [accessToken])

	const retryAuthorization = useCallback(() => {
		if (!telegram.initData) {
			return
		}

		telegramLogin.reset()
		telegramLogin.mutate(telegram.initData)
	}, [telegram.initData, telegramLogin])

	return {
		accessToken,
		canRetryAuthorization: Boolean(telegram.initData),
		completeAuthorization,
		isAuthorized,
		isLoadingTelegram: !telegram.initData && !telegramError,
		telegramError,
		telegramLogin,
		retryAuthorization,
		username
	}
}
