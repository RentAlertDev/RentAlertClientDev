'use client'

import type { ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'
import { Loader } from '@/shared/ui/loader'
import { useTelegramAuthGate } from '../hooks/use-telegram-auth-gate'

interface TelegramAuthGateProps {
	children: ReactNode
}

export function TelegramAuthGate({ children }: TelegramAuthGateProps) {
	const {
		accessToken,
		isAuthorized,
		isLoadingTelegram,
		telegramError,
		telegramLogin,
		username
	} = useTelegramAuthGate()

	if (isAuthorized) {
		return children
	}

	const title = username ? `Добрый день, ${username}!` : 'Добрый день!'
	const isAuthSuccess = Boolean(accessToken)
	const isAuthLoading = isLoadingTelegram || telegramLogin.isPending
	const isAuthError = telegramLogin.isError || telegramError

	return (
		<main className='flex min-h-dvh items-center justify-center bg-[var(--background)] px-5 text-[var(--foreground)]'>
			<Card className='w-full max-w-sm shadow-none'>
				<CardContent className='flex flex-col items-center gap-5 px-6 py-8 text-center'>
					<div>
						<div className='text-sm font-medium text-[var(--muted)]'>
							RentAlert
						</div>
						<h1 className='mt-3 text-3xl font-semibold tracking-normal'>
							{title}
						</h1>
					</div>

					{isAuthSuccess ? (
						<div className='flex flex-col items-center gap-3'>
							<CheckCircle2
								aria-hidden
								className='size-10 text-[var(--success-text)]'
							/>
							<div>
								<div className='font-semibold'>
									Авторизация прошла успешно
								</div>
								<p className='mt-1 text-sm text-[var(--muted)]'>
									Открываем квартиры
								</p>
							</div>
						</div>
					) : null}

					{isAuthLoading ? (
						<div className='flex flex-col items-center gap-3'>
							<Loader label='Происходит авторизация' />
							<p className='text-sm text-[var(--muted)]'>
								Происходит авторизация...
							</p>
						</div>
					) : null}

					{isAuthError ? (
						<div className='rounded-md border border-[var(--danger-border)] bg-[var(--danger-bg)] px-4 py-3 text-sm text-[var(--danger-text)]'>
							Не получилось авторизоваться. Открой приложение заново.
						</div>
					) : null}
				</CardContent>
			</Card>
		</main>
	)
}
