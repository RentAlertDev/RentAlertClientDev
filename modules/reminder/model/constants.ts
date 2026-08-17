import type { ReminderIntervalType, ReminderStatus } from './types'

export const REMINDERS_API = '/api/reminders'

export const REMINDER_QUERY_KEYS = {
	all: ['reminders'] as const
}

export const REMINDER_INTERVAL_OPTIONS: ReminderIntervalType[] = [
	'BEFORE_30_MIN',
	'BEFORE_1_HOUR',
	'BEFORE_1_DAY'
]

export const REMINDER_INTERVAL_LABELS: Record<ReminderIntervalType, string> = {
	BEFORE_30_MIN: 'За 30 минут',
	BEFORE_1_HOUR: 'За 1 час',
	BEFORE_1_DAY: 'За 1 день'
}

export const REMINDER_STATUS_LABELS: Record<ReminderStatus, string> = {
	NEW: 'Запланировано',
	PROCESSING: 'Отправляется',
	SENT: 'Отправлено',
	FAILED: 'Не отправлено',
	CANCELLED: 'Отменено'
}

export const CANCELLABLE_REMINDER_STATUSES: ReminderStatus[] = ['NEW', 'PROCESSING']
