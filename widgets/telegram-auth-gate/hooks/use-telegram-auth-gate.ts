'use client'

import { useEffect, useState } from 'react'
import { getAccessToken } from '@/modules/telegram-auth/model/get-access-token'
import { useTelegramInitData } from '@/modules/telegram-init-data'
import { useSubmitTelegramLogin } from './use-submit-telegram-login'

const AUTH_SUCCESS_DELAY_MS = 900

export function useTelegramAuthGate() {
	const { error: telegramError, telegram } = useTelegramInitData()
	const telegramLogin = useSubmitTelegramLogin(telegram.initData)
	const accessToken = getAccessToken(telegramLogin.data)
	const [isAuthorized, setIsAuthorized] = useState(false)
	const username = telegram.user?.username
		? `@${telegram.user.username}`
		: telegram.user?.first_name

	useEffect(() => {
		if (!accessToken) {
			return
		}

		const timerId = window.setTimeout(() => {
			setIsAuthorized(true)
		}, AUTH_SUCCESS_DELAY_MS)

		return () => window.clearTimeout(timerId)
	}, [accessToken])

	return {
		accessToken,
		isAuthorized,
		isLoadingTelegram: !telegram.initData && !telegramError,
		telegramError,
		telegramLogin,
		username
	}
}
