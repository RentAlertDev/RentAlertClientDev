export interface UserProfile {
	userId?: number
	username: string
	photoUrl?: string
	botStatus: string
	lastLogin: string
	quietFrom?: { hour: number; minute: number }
	quietTo?: { hour: number; minute: number }
}
