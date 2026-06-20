'use client'

import { useState } from 'react'
import { useTelegramInitData } from '@/modules/telegram-init-data'

export function TelegramInitDataPanel() {
	const { telegram } = useTelegramInitData()
	const [copyStatus, setCopyStatus] = useState<string | null>(null)
	const username = telegram.user?.username
		? `@${telegram.user.username}`
		: telegram.user?.first_name || 'ЧУВВАААААК'

	async function handleCopyInitData() {
		if (!telegram.initData) {
			setCopyStatus('initData пока пустой')
			return
		}

		try {
			await navigator.clipboard.writeText(telegram.initData)
			setCopyStatus('initData скопирован')
		} catch {
			setCopyStatus('Не удалось скопировать initData')
		}
	}

	return (
		<main className='flex min-h-dvh items-center justify-center px-5 text-center'>
			<div className='flex max-w-xl flex-col items-center gap-5'>
				<h1 className='text-4xl font-semibold tracking-normal sm:text-5xl'>
					ЗДАРОВА {username}
				</h1>

				<button
					className='rounded-md bg-[var(--tg-theme-button-color,#2481cc)] px-5 py-3 text-sm font-semibold text-[var(--tg-theme-button-text-color,#ffffff)] disabled:cursor-not-allowed disabled:opacity-60'
					disabled={!telegram.initData}
					onClick={handleCopyInitData}
					type='button'
				>
					Скопировать initData
				</button>

				{copyStatus ? (
					<p className='text-sm text-[var(--muted)]'>{copyStatus}</p>
				) : null}
			</div>
		</main>
	)
}
