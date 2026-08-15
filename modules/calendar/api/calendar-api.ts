import { httpClient } from '@/shared/api/http-client'
import type { CalendarDaySummary, CalendarRange, CalendarViewing } from '../model/types'

export async function getCalendarViewings(range: CalendarRange) {
	const response = await httpClient.get<CalendarViewing[]>('/api/calendar/events', { params: range })
	return response.data
}

export async function getCalendarSummary(month: string) {
	const response = await httpClient.get<CalendarDaySummary[]>('/api/calendar/summary', { params: { month } })
	return response.data
}
