export interface UpdateProfileSettingsRequest {
	botStatus: string
	quietFrom: string | null
	quietTo: string | null
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
