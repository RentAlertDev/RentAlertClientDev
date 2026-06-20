export enum TelegramAuthStatus {
	Idle = 'idle',
	Pending = 'pending',
	Success = 'success',
	Error = 'error'
}

export interface TelegramLoginRequest {
	initData: string
}

export interface TelegramLoginResponse {
	accessToken?: string
	token?: string
	accessToke?: string
	expiresIn?: number
	[key: string]: unknown
}
