import { httpClient } from '@/shared/api/http-client'
import type { UserProfile } from '@/modules/profile'
import type { CreateReminderRequest, NotificationChannel, UpdateNotificationSettingsRequest, UpdateProfileSettingsRequest } from '../model/types'

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

export async function createReminder(data: CreateReminderRequest) {
	await httpClient.post('/api/profile/remainders', data)
}
