'use client'

import { useEffect, useState } from 'react'
import { Mail, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useConfirmEmailActivationMutation, usePrepareEmailActivationMutation } from '@/modules/profile-settings'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import { InfoNote } from '@/shared/ui/info-note'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CODE_LENGTH = 6
const CODE_TTL_SECONDS = 60

interface EmailActivationModalProps {
	isOpen: boolean
	onClose: () => void
	onSuccess: () => void
}

export function EmailActivationModal({ isOpen, onClose, onSuccess }: EmailActivationModalProps) {
	const t = useTranslations('settingsAndNotifications.profileSettingsCard.emailActivationModal')
	const prepareMutation = usePrepareEmailActivationMutation()
	const confirmMutation = useConfirmEmailActivationMutation()
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState<string | null>(null)
	const [requestId, setRequestId] = useState<string | null>(null)
	const [code, setCode] = useState('')
	const [codeError, setCodeError] = useState<string | null>(null)
	const [secondsLeft, setSecondsLeft] = useState(CODE_TTL_SECONDS)

	useEffect(() => {
		if (!isOpen) {
			return
		}

		const bodyOverflow = document.body.style.overflow
		const htmlOverflow = document.documentElement.style.overflow

		document.body.style.overflow = 'hidden'
		document.documentElement.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = bodyOverflow
			document.documentElement.style.overflow = htmlOverflow
		}
	}, [isOpen])

	useEffect(() => {
		if (!requestId || secondsLeft <= 0) {
			return
		}

		const timer = setInterval(() => setSecondsLeft(value => value - 1), 1000)
		return () => clearInterval(timer)
	}, [requestId, secondsLeft])

	if (!isOpen) {
		return null
	}

	const isExpired = Boolean(requestId) && secondsLeft <= 0

	async function handleSendCode() {
		const trimmedEmail = email.trim()

		if (!EMAIL_PATTERN.test(trimmedEmail)) {
			setEmailError(t('emailStep.emailInvalid'))
			return
		}

		setEmailError(null)

		try {
			const response = await prepareMutation.mutateAsync({ email: trimmedEmail })
			setRequestId(response.requestId)
			setSecondsLeft(CODE_TTL_SECONDS)
		} catch (error) {
			setEmailError(getApiErrorMessage(error, t('emailStep.errorFallback')))
		}
	}

	async function handleConfirmCode() {
		if (!requestId) {
			return
		}

		if (!/^\d{6}$/.test(code)) {
			setCodeError(t('codeStep.codeInvalid'))
			return
		}

		setCodeError(null)

		try {
			await confirmMutation.mutateAsync({ code, requestId })
			onSuccess()
		} catch (error) {
			setCodeError(getApiErrorMessage(error, t('codeStep.errorFallback')))
		}
	}

	return (
		<div
			className='fixed inset-0 z-[80] flex touch-none items-end justify-center overflow-hidden bg-black/55 px-3 pb-3 pt-10 backdrop-blur-sm sm:items-center sm:p-6'
			onTouchMove={event => {
				if (event.target === event.currentTarget) {
					event.preventDefault()
				}
			}}
			onWheel={event => {
				if (event.target === event.currentTarget) {
					event.preventDefault()
				}
			}}
		>
			<div className='max-h-[calc(100dvh-32px)] w-full max-w-sm touch-auto overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]'>
				<div className='flex items-start justify-between gap-4 border-b border-[var(--card-border)] p-4'>
					<div>
						<div className='flex items-center gap-1.5 text-sm font-medium text-[var(--muted)]'>
							<Mail aria-hidden className='size-4' />
							{t('eyebrow')}
						</div>
						<h2 className='mt-1 text-xl font-semibold'>
							{requestId ? t('codeStep.heading') : t('emailStep.heading')}
						</h2>
					</div>
					<IconButton
						disabled={prepareMutation.isPending || confirmMutation.isPending}
						label={t('closeAria')}
						onClick={onClose}
					>
						<X aria-hidden className='size-5' />
					</IconButton>
				</div>

				<div className='max-h-[calc(100dvh-220px)] overflow-y-auto overscroll-contain p-4'>
					{requestId ? (
						<div className='space-y-3'>
							<p className='text-sm text-[var(--muted)]'>{t('codeStep.description', { email: email.trim() })}</p>
							<label className='block space-y-1.5'>
								<span className='text-xs font-semibold'>{t('codeStep.codeLabel')}</span>
								<input
									autoFocus
									className='h-11 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-center text-lg font-semibold tracking-[0.3em] outline-none focus:border-[var(--primary)] disabled:opacity-50'
									disabled={isExpired || confirmMutation.isPending}
									inputMode='numeric'
									maxLength={CODE_LENGTH}
									onChange={event => setCode(event.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH))}
									placeholder={t('codeStep.codePlaceholder')}
									value={code}
								/>
							</label>
							{codeError ? <p className='text-sm text-[var(--danger-text)]'>{codeError}</p> : null}
							{isExpired ? (
								<InfoNote>{t('codeStep.expiredMessage')}</InfoNote>
							) : (
								<p className='text-xs text-[var(--muted)]'>{t('codeStep.timerLabel', { seconds: secondsLeft })}</p>
							)}
							<Button
								className='w-full'
								disabled={isExpired || confirmMutation.isPending || code.length !== CODE_LENGTH}
								onClick={handleConfirmCode}
							>
								{confirmMutation.isPending ? t('codeStep.submittingButton') : t('codeStep.submitButton')}
							</Button>
						</div>
					) : (
						<div className='space-y-3'>
							<p className='text-sm text-[var(--muted)]'>{t('emailStep.description')}</p>
							<label className='block space-y-1.5'>
								<span className='text-xs font-semibold'>{t('emailStep.emailLabel')}</span>
								<input
									autoFocus
									className='h-11 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-sm outline-none focus:border-[var(--primary)]'
									disabled={prepareMutation.isPending}
									onChange={event => setEmail(event.target.value)}
									onKeyDown={event => {
										if (event.key === 'Enter') {
											event.preventDefault()
											void handleSendCode()
										}
									}}
									placeholder={t('emailStep.emailPlaceholder')}
									type='email'
									value={email}
								/>
							</label>
							{emailError ? <p className='text-sm text-[var(--danger-text)]'>{emailError}</p> : null}
							<InfoNote>{t('emailStep.warning')}</InfoNote>
							<Button className='w-full' disabled={prepareMutation.isPending} onClick={handleSendCode}>
								{prepareMutation.isPending ? t('emailStep.submittingButton') : t('emailStep.submitButton')}
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
