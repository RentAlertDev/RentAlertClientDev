'use client'

import { useEffect, useRef } from 'react'
import { useTelegramLogin } from '@/modules/telegram-auth'

export function useSubmitTelegramLogin(initData: string) {
	const submittedInitDataRef = useRef<string | null>(null)
	const telegramLogin = useTelegramLogin()
	const { mutate } = telegramLogin

	useEffect(() => {
		if (!initData || submittedInitDataRef.current === initData) {
			return
		}

		submittedInitDataRef.current = initData
		mutate(initData)
	}, [initData, mutate])

	return telegramLogin
}
