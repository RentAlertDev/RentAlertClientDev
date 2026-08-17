import { Bell, Clock3, Trash2 } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { IconButton } from '@/shared/ui/icon-button'
import { CANCELLABLE_REMINDER_STATUSES, REMINDER_INTERVAL_LABELS, REMINDER_STATUS_LABELS } from '../model/constants'
import type { Reminder } from '../model/types'

const statusClasses: Record<string, string> = {
	NEW: 'border-[var(--card-border)] bg-[var(--card-muted)] text-[var(--muted)]',
	PROCESSING: 'border-[var(--ring)]/35 bg-[color-mix(in_srgb,var(--ring)_12%,var(--card))] text-[var(--ring)]',
	SENT: 'border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--success-text)]',
	FAILED: 'border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)]',
	CANCELLED: 'border-[var(--card-border)] bg-[var(--card-muted)] text-[var(--muted)]'
}

interface ReminderListItemProps {
	isCancelling?: boolean
	onCancel: (reminder: Reminder) => void
	reminder: Reminder
}

export function ReminderListItem({ isCancelling, onCancel, reminder }: ReminderListItemProps) {
	const status = reminder.status ?? 'NEW'
	const isCancellable = CANCELLABLE_REMINDER_STATUSES.includes(status)

	return (
		<div className='flex items-center justify-between gap-3 rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
			<div className='flex min-w-0 items-center gap-2.5'>
				<div className='grid size-8 shrink-0 place-items-center rounded-full bg-[var(--card)] text-[var(--primary)]'>
					<Bell aria-hidden className='size-4' />
				</div>
				<div className='min-w-0'>
					<div className='truncate text-sm font-semibold'>
						{REMINDER_INTERVAL_LABELS[reminder.intervalType]}
					</div>
					{reminder.remindAt ? (
						<div className='mt-0.5 flex items-center gap-1.5 text-xs text-[var(--muted)]'>
							<Clock3 aria-hidden className='size-3.5' />
							{new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(reminder.remindAt))}
						</div>
					) : null}
				</div>
			</div>
			<div className='flex shrink-0 items-center gap-2'>
				<span className={cn('rounded-md border px-2 py-1 text-xs font-semibold', statusClasses[status])}>
					{REMINDER_STATUS_LABELS[status]}
				</span>
				{isCancellable ? (
					<IconButton
						className='size-8'
						disabled={isCancelling}
						label='Отменить напоминание'
						onClick={() => onCancel(reminder)}
						variant='danger'
					>
						<Trash2 aria-hidden className='size-4' />
					</IconButton>
				) : null}
			</div>
		</div>
	)
}
