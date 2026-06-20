'use client'

import { useEffect } from 'react'
import { useTelegramLogin } from '@/modules/telegram-auth'
import { useTelegramInitData } from '@/modules/telegram-init-data'

export function TelegramInitDataPanel() {
	const { telegram } = useTelegramInitData()
	const telegramLogin = useTelegramLogin()
	const username = telegram.user?.username
		? `@${telegram.user.username}`
		: telegram.user?.first_name || 'Абобка'

	useEffect(() => {
		if (
			!telegram.initData ||
			telegramLogin.isPending ||
			telegramLogin.data
		) {
			return
		}

		telegramLogin.mutate(telegram.initData)
	}, [telegram.initData, telegramLogin])

	return (
		<main className='flex min-h-dvh items-center justify-center px-5 text-center'>
			<div className='flex max-w-xl flex-col items-center gap-4'>
				<h1 className='text-4xl font-semibold tracking-normal sm:text-5xl'>
					Здарова {username}
				</h1>

				<p className='text-sm text-[var(--muted)]'>
					{telegramLogin.isPending ? 'Auth loading...' : null}
					{telegramLogin.isSuccess
						? `Auth success. Token: ${telegramLogin.data.accessToken.length} chars`
						: null}
					{telegramLogin.isError
						? `Auth error: ${telegramLogin.error.message}`
						: null}
				</p>
			</div>
		</main>
	)
}
