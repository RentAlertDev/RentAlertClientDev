'use client'

import { useEffect, useMemo, useState } from 'react'
import { Bell, X } from 'lucide-react'
import { useAppSettingsQuery } from '@/modules/app-settings'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { Button } from '@/shared/ui/button'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import { IconButton } from '@/shared/ui/icon-button'
import { InfoNote } from '@/shared/ui/info-note'
import { toast } from '@/shared/ui/toaster'
import { useCancelReminderMutation } from '../hooks/use-cancel-reminder-mutation'
import { useCreateReminderMutation } from '../hooks/use-create-reminder-mutation'
import { useRemindersQuery } from '../hooks/use-reminders-query'
import { REMINDER_INTERVAL_LABELS, REMINDER_INTERVAL_OPTIONS } from '../model/constants'
import type { Reminder, ReminderIntervalType } from '../model/types'
import { ReminderListItem } from './reminder-list-item'

const engineLabels: Record<string, string> = {
	EMAIL: 'Email',
	PUSH: 'Push',
	SMS: 'SMS',
	TELEGRAM_ADMIN: 'Telegram Admin',
	TELEGRAM_BOT: 'Telegram-бот'
}

interface ReminderModalProps {
	isOpen: boolean
	listingId: number
	listingTitle: string
	onClose: () => void
}

function getErrorMessage(error: unknown) {
	return getApiErrorMessage(error, 'Не удалось выполнить действие')
}

export function ReminderModal({ isOpen, listingId, listingTitle, onClose }: ReminderModalProps) {
	const remindersQuery = useRemindersQuery()
	const appSettingsQuery = useAppSettingsQuery()
	const createMutation = useCreateReminderMutation()
	const cancelMutation = useCancelReminderMutation()
	const [intervalType, setIntervalType] = useState<ReminderIntervalType>('BEFORE_1_HOUR')
	const [engine, setEngine] = useState('')
	const [cancellingReminder, setCancellingReminder] = useState<Reminder | null>(null)
	const engines = appSettingsQuery.data?.notificationEngines ?? []
	const listingReminders = useMemo(
		() => (remindersQuery.data ?? []).filter(reminder => reminder.listingId === listingId),
		[remindersQuery.data, listingId]
	)

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

	async function handleCreate() {
		try {
			await createMutation.mutateAsync({
				listingId,
				intervalType,
				...(engine ? { engine } : {})
			})
			toast.success('Напоминание создано')
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	}

	async function handleConfirmCancel() {
		if (!cancellingReminder) {
			return
		}

		try {
			await cancelMutation.mutateAsync(cancellingReminder.id)
			toast.success('Напоминание отменено')
			setCancellingReminder(null)
		} catch (error) {
			toast.error(getApiErrorMessage(error, 'Не удалось отменить напоминание'))
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
			<div className='max-h-[calc(100dvh-32px)] w-full max-w-lg touch-auto overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]'>
				<div className='flex items-start justify-between gap-4 border-b border-[var(--card-border)] p-4'>
					<div className='min-w-0'>
						<div className='flex items-center gap-1.5 text-sm font-medium text-[var(--muted)]'>
							<Bell aria-hidden className='size-4' />
							Напоминания
						</div>
						<h2 className='mt-1 truncate text-xl font-semibold'>{listingTitle}</h2>
					</div>
					<IconButton label='Закрыть' onClick={onClose}>
						<X aria-hidden className='size-5' />
					</IconButton>
				</div>

				<div className='max-h-[calc(100dvh-220px)] overflow-y-auto overscroll-contain p-4'>
					{remindersQuery.isError ? (
						<InfoNote className='mb-4'>
							{getApiErrorMessage(remindersQuery.error, 'Не удалось загрузить напоминания.')}
						</InfoNote>
					) : null}

					{remindersQuery.isPending ? (
						<div className='text-sm text-[var(--muted)]'>Загрузка…</div>
					) : listingReminders.length ? (
						<div className='space-y-2'>
							{listingReminders.map(reminder => (
								<ReminderListItem
									isCancelling={cancelMutation.isPending && cancellingReminder?.id === reminder.id}
									key={reminder.id}
									onCancel={setCancellingReminder}
									reminder={reminder}
								/>
							))}
						</div>
					) : (
						<InfoNote className='mb-4'>
							Для этого объявления пока нет напоминаний о просмотре.
						</InfoNote>
					)}

					<div className='mt-4 rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
						<div className='mb-2 text-xs font-medium text-[var(--muted)]'>Новое напоминание</div>
						<div className='grid gap-3 sm:grid-cols-2'>
							<label className='block space-y-1.5'>
								<span className='text-xs font-semibold'>Когда напомнить</span>
								<select
									className='h-10 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-sm outline-none focus:border-[var(--primary)]'
									onChange={event => setIntervalType(event.target.value as ReminderIntervalType)}
									value={intervalType}
								>
									{REMINDER_INTERVAL_OPTIONS.map(option => (
										<option key={option} value={option}>
											{REMINDER_INTERVAL_LABELS[option]}
										</option>
									))}
								</select>
							</label>
							<label className='block space-y-1.5'>
								<span className='text-xs font-semibold'>Канал доставки</span>
								<select
									className='h-10 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-sm outline-none focus:border-[var(--primary)]'
									onChange={event => setEngine(event.target.value)}
									value={engine}
								>
									<option value=''>По умолчанию</option>
									{engines.map(option => (
										<option key={option} value={option}>
											{engineLabels[option] ?? option}
										</option>
									))}
								</select>
							</label>
						</div>
						<Button
							className='mt-3 w-full'
							disabled={createMutation.isPending}
							onClick={handleCreate}
						>
							{createMutation.isPending ? 'Добавляем…' : 'Добавить напоминание'}
						</Button>
					</div>
				</div>
			</div>

			<ConfirmDialog
				description={
					cancellingReminder
						? `Напоминание «${REMINDER_INTERVAL_LABELS[cancellingReminder.intervalType]}» больше не будет отправлено.`
						: ''
				}
				isConfirming={cancelMutation.isPending}
				isOpen={Boolean(cancellingReminder)}
				onCancel={() => setCancellingReminder(null)}
				onConfirm={handleConfirmCancel}
				title='Отменить напоминание?'
			/>
		</div>
	)
}
