'use client'

import { useEffect } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'

interface ConfirmDialogProps {
	cancelText?: string
	confirmText?: string
	description: string
	isConfirming?: boolean
	isOpen: boolean
	onCancel: () => void
	onConfirm: () => void
	title: string
}

export function ConfirmDialog({
	cancelText = 'Отмена',
	confirmText = 'Удалить',
	description,
	isConfirming,
	isOpen,
	onCancel,
	onConfirm,
	title
}: ConfirmDialogProps) {
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

	return (
		<div
			className='fixed inset-0 z-[90] flex touch-none items-end justify-center overflow-hidden bg-black/55 px-3 pb-3 pt-10 backdrop-blur-sm sm:items-center sm:p-6'
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
					<div className='flex gap-3'>
						<div className='grid size-10 shrink-0 place-items-center rounded-md bg-[var(--danger-bg)] text-[var(--danger-text)]'>
							<AlertTriangle aria-hidden className='size-5' />
						</div>
						<div>
							<h2 className='text-lg font-semibold'>{title}</h2>
							<p className='mt-1 text-sm leading-5 text-[var(--muted)]'>
								{description}
							</p>
						</div>
					</div>
					<IconButton
						className='size-8'
						disabled={isConfirming}
						label='Закрыть'
						onClick={onCancel}
					>
						<X aria-hidden className='size-4' />
					</IconButton>
				</div>

				<div className='mt-5 grid grid-cols-2 gap-2'>
					<Button
						disabled={isConfirming}
						onClick={onCancel}
						variant='outline'
					>
						{cancelText}
					</Button>
					<Button
						disabled={isConfirming}
						onClick={onConfirm}
						variant='destructive'
					>
						{confirmText}
					</Button>
				</div>
			</div>
		</div>
	)
}
