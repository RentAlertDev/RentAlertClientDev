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
	accessToken: string
	expiresIn?: number
}
