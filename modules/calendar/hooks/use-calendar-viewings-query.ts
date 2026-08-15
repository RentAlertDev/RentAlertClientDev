'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getCalendarSummary, getCalendarViewings } from '../api/calendar-api'
import type { CalendarRange } from '../model/types'

export function useCalendarViewingsQuery(range: CalendarRange) {
	return useQuery({ queryKey: ['calendar', 'events', range], queryFn: () => getCalendarViewings(range), placeholderData: keepPreviousData, staleTime: 30_000 })
}

export function useCalendarSummaryQuery(month: string) {
	return useQuery({ queryKey: ['calendar', 'summary', month], queryFn: () => getCalendarSummary(month), placeholderData: keepPreviousData, staleTime: 30_000 })
}
