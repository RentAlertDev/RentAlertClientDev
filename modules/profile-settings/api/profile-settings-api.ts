import { httpClient } from '@/shared/api/http-client'
import type { UserProfile } from '@/modules/profile'
import type {
	EmailActivationConfirmationRequest,
	EmailActivationPreparationRequest,
	EmailActivationPreparationResponse,
	NotificationChannel,
	UpdateNotificationSettingsRequest,
	UpdateProfileSettingsRequest
} from '../model/types'

export async function updateProfileSettings(data: UpdateProfileSettingsRequest) {
	const response = await httpClient.put<UserProfile>('/api/profile', data)
	return response.data
}

export async function getNotificationSettings() {
	const response = await httpClient.get<NotificationChannel[]>('/api/profile/notifications')
	return response.data
}

export async function updateNotificationSettings(data: UpdateNotificationSettingsRequest) {
	const response = await httpClient.put<NotificationChannel[]>('/api/profile/notifications', data)
	return response.data
}

export async function prepareEmailActivation(data: EmailActivationPreparationRequest) {
	const response = await httpClient.post<EmailActivationPreparationResponse>('/api/profile/email/preparation', data)
	return response.data
}

export async function confirmEmailActivation(data: EmailActivationConfirmationRequest) {
	const response = await httpClient.post<boolean>('/api/profile/email/activation', data)
	return response.data
}
