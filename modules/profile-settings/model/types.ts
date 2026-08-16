export interface LocalTimeValue {
	hour: number
	minute: number
	second?: number
	nano?: number
}

export interface UpdateProfileSettingsRequest {
	botStatus: string
	quietFrom: LocalTimeValue
	quietTo: LocalTimeValue
}

export interface NotificationChannel {
	engine: string
	enabled: boolean
	available: boolean
	default: boolean
}

export interface UpdateNotificationSettingsRequest {
	enabledEngines: string[]
	defaultEngine?: string
}

export interface CreateReminderRequest {
	intervalType: 'BEFORE_30_MIN' | 'BEFORE_1_HOUR' | 'BEFORE_1_DAY'
	engine: string
	favoriteId: number
}
