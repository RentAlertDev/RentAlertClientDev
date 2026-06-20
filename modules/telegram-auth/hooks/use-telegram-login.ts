'use client'

import { useMutation } from '@tanstack/react-query'
import { loginByTelegramInitData } from '../api/login-by-telegram'

export function useTelegramLogin() {
	return useMutation({
		mutationFn: loginByTelegramInitData
	})
}
