'use client'

import { getAccessToken } from '@/modules/telegram-auth/model/get-access-token'
import { useTelegramInitData } from '@/modules/telegram-init-data'
import { useSubmitTelegramLogin } from '../hooks/use-submit-telegram-login'

export function TelegramInitDataPanel() {
	const { telegram } = useTelegramInitData()
	const telegramLogin = useSubmitTelegramLogin(telegram.initData)
	const accessToken = getAccessToken(telegramLogin.data)
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
					{telegramLogin.isPending ? 'Авторизация...' : null}
					{telegramLogin.isSuccess
						? accessToken
							? `Авторизация успешна. Токен: ${accessToken.length} символов`
							: 'Авторизация успешна, но токен нет'
						: null}
					{telegramLogin.isError
						? `Ошибка авторизации: ${telegramLogin.error.message}`
						: null}
				</p>
			</div>
		</main>
	)
}
