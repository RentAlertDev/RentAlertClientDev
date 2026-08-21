'use client'

import { useState, type ReactNode } from 'react'
import { Button } from '@/shared/ui/button'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { RentAlertLoader } from '@/shared/ui/rent-alert-loader'
import { useTelegramAuthGate } from '../hooks/use-telegram-auth-gate'

interface TelegramAuthGateProps {
	children: ReactNode
}

const AUTH_LOADER_SIZE = 168

export function TelegramAuthGate({ children }: TelegramAuthGateProps) {
	const {
		accessToken,
		canRetryAuthorization,
		completeAuthorization,
		isAuthorized,
		isLoadingTelegram,
		retryAuthorization,
		telegramError,
		telegramLogin
	} = useTelegramAuthGate()
	const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false)

	if (isAuthorized || isAuthorized) {
		return children
	}

	const isAuthSuccess = Boolean(accessToken)
	const isAuthLoading = isLoadingTelegram || telegramLogin.isPending
	const isAuthError = telegramLogin.isError || telegramError

	return (
		<main className='flex min-h-dvh items-center justify-center bg-[var(--background)] px-5 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] text-[var(--foreground)]'>
			{isAuthSuccess ? (
				<RentAlertLoader
					onAnimationComplete={completeAuthorization}
					size={AUTH_LOADER_SIZE}
					status='success'
				/>
			) : null}

			{isAuthLoading ? (
				<RentAlertLoader size={AUTH_LOADER_SIZE} status='loading' />
			) : null}

			{isAuthError ? (
				<div className='flex flex-col items-center gap-4 text-center'>
					<RentAlertLoader
						onAnimationComplete={() => setIsErrorMessageVisible(true)}
						size={AUTH_LOADER_SIZE}
						status='error'
					/>
					{isErrorMessageVisible ? (
						<>
							<div className='rounded-md border border-[var(--danger-border)] bg-[var(--danger-bg)] px-4 py-3 text-sm text-[var(--danger-text)]'>
								{telegramLogin.isError
									? getApiErrorMessage(
											telegramLogin.error,
											'Не получилось авторизоваться. Попробуйте ещё раз.'
										)
									: telegramError}
							</div>
							{canRetryAuthorization ? (
								<Button
									onClick={() => {
										setIsErrorMessageVisible(false)
										retryAuthorization()
									}}
									variant='outline'
								>
									Повторить
								</Button>
							) : null}
						</>
					) : null}
				</div>
			) : null}
		</main>
	)
}
