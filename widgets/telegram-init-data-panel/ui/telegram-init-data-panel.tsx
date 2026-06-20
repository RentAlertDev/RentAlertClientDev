'use client'

import { useTelegramInitData } from '@/modules/telegram-init-data'

export function TelegramInitDataPanel() {
	const { telegram } = useTelegramInitData()
	const username = telegram.user?.username
		? `@${telegram.user.username}`
		: telegram.user?.first_name || 'ХУЕСОС'

	return (
		<main className='flex min-h-dvh items-center justify-center px-5 text-center'>
			<h1 className='text-4xl font-semibold tracking-normal sm:text-5xl'>
				"Здарова!" {username}
			</h1>
		</main>
	)
}
