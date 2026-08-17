export type ReminderIntervalType = 'BEFORE_30_MIN' | 'BEFORE_1_HOUR' | 'BEFORE_1_DAY'

export type ReminderStatus = 'NEW' | 'PROCESSING' | 'SENT' | 'FAILED' | 'CANCELLED'

export interface Reminder {
	id: number
	listingId: number
	intervalType: ReminderIntervalType
	remindAt?: string
	status?: ReminderStatus
	sentAt?: string
	createdAt?: string
}

export interface ReminderRequest {
	listingId: number
	intervalType: ReminderIntervalType
	engine?: string
}
