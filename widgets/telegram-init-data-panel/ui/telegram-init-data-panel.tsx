'use client'

import { useTelegramInitData } from '@/modules/telegram-init-data'
import { useSubmitTelegramLogin } from '../hooks/use-submit-telegram-login'

export function TelegramInitDataPanel() {
	const { telegram } = useTelegramInitData()
	const telegramLogin = useSubmitTelegramLogin(telegram.initData)
	const username = telegram.user?.username
		? `@${telegram.user.username}`
		: telegram.user?.first_name || 'ЧУВВАААААК'

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
