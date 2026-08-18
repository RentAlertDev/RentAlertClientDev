'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import { useCreateFeedbackMutation } from '../hooks/use-create-feedback-mutation'
import { FeedbackRatingInput } from './feedback-rating-input'

interface FeedbackFormModalProps {
	isOpen: boolean
	onClose: () => void
	onError?: (message: string) => void
	onSuccess?: (message: string) => void
}

export function FeedbackFormModal({ isOpen, onClose, onError, onSuccess }: FeedbackFormModalProps) {
	const [rating, setRating] = useState(0)
	const [message, setMessage] = useState('')
	const [validationError, setValidationError] = useState<string | null>(null)
	const mutation = useCreateFeedbackMutation()

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

	if (!isOpen) {
		return null
	}

	async function handleSubmit() {
		if (rating < 1) {
			setValidationError('Выберите оценку')
			return
		}

		setValidationError(null)

		try {
			await mutation.mutateAsync({
				rating,
				...(message.trim() ? { message: message.trim() } : {})
			})
			setRating(0)
			setMessage('')
			onSuccess?.('Спасибо за отзыв!')
			onClose()
		} catch (error) {
			onError?.(getApiErrorMessage(error, 'Не удалось отправить отзыв'))
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
			<div className='w-full max-w-sm touch-auto rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 text-[var(--foreground)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]'>
				<div className='flex items-start justify-between gap-4'>
					<div>
						<div className='text-sm font-medium text-[var(--muted)]'>Обратная связь</div>
						<h2 className='mt-1 text-xl font-semibold'>Оставить отзыв</h2>
					</div>
					<IconButton disabled={mutation.isPending} label='Закрыть' onClick={onClose}>
						<X aria-hidden className='size-4' />
					</IconButton>
				</div>

				<div className='mt-4 space-y-3'>
					<FeedbackRatingInput disabled={mutation.isPending} onChange={value => { setRating(value); setValidationError(null) }} value={rating} />
					{validationError ? <p className='text-sm text-[var(--danger-text)]'>{validationError}</p> : null}
					<textarea
						className='min-h-24 w-full resize-none rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] p-3 text-sm outline-none focus:border-[var(--primary)]'
						disabled={mutation.isPending}
						maxLength={1000}
						onChange={event => setMessage(event.target.value)}
						placeholder='Что понравилось, а что стоит улучшить? (необязательно)'
						value={message}
					/>
				</div>

				<div className='mt-4 grid grid-cols-2 gap-2'>
					<Button disabled={mutation.isPending} onClick={onClose} variant='outline'>
						Отмена
					</Button>
					<Button disabled={mutation.isPending} onClick={handleSubmit}>
						{mutation.isPending ? 'Отправляем…' : 'Отправить'}
					</Button>
				</div>
			</div>
		</div>
	)
}
