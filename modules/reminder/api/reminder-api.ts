import { httpClient } from '@/shared/api/http-client'
import { REMINDERS_API } from '../model/constants'
import type { Reminder, ReminderRequest } from '../model/types'

export async function getReminders() {
	const response = await httpClient.get<Reminder[]>(REMINDERS_API)

	return response.data
}

export async function createReminder(request: ReminderRequest) {
	const response = await httpClient.post<Reminder>(REMINDERS_API, request)

	return response.data
}

export async function cancelReminder(reminderId: number) {
	await httpClient.delete(`${REMINDERS_API}/${reminderId}`)
}
