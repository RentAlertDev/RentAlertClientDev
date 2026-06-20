export interface TelegramUser {
	id?: number
	first_name?: string
	last_name?: string
	username?: string
	language_code?: string
}

export interface TelegramThemeParams {
	bg_color?: string
	text_color?: string
	hint_color?: string
	link_color?: string
	button_color?: string
	button_text_color?: string
	secondary_bg_color?: string
	header_bg_color?: string
	bottom_bar_bg_color?: string
	accent_text_color?: string
	section_bg_color?: string
	section_header_text_color?: string
	subtitle_text_color?: string
	destructive_text_color?: string
}

export interface TelegramWebApp {
	initData: string
	initDataUnsafe?: {
		user?: TelegramUser
		query_id?: string
		auth_date?: number
		hash?: string
	}
	colorScheme?: 'light' | 'dark'
	platform?: string
	themeParams?: TelegramThemeParams
	version?: string
	ready: () => void
	expand: () => void
}

export enum TelegramScriptStatus {
	Idle = 'idle',
	Loaded = 'loaded',
	Failed = 'failed'
}

export interface TelegramInitDataState {
	currentUrl: string
	hasTelegramGlobal: boolean
	hasTelegramWebApp: boolean
	isWebAppAvailable: boolean
	initData: string
	initDataUnsafe?: TelegramWebApp['initDataUnsafe']
	user?: TelegramUser
	colorScheme?: 'light' | 'dark'
	platform?: string
	scriptStatus: TelegramScriptStatus
	themeParams: TelegramThemeParams
	userAgent: string
	hasTgWebAppDataInUrl: boolean
	version?: string
}

declare global {
	interface Window {
		Telegram?: {
			WebApp: TelegramWebApp
		}
	}
}
