'use client'

import { useQuery } from '@tanstack/react-query'
import { getReminders } from '../api/reminder-api'
import { REMINDER_QUERY_KEYS } from '../model/constants'

export function useRemindersQuery() {
	return useQuery({
		queryKey: REMINDER_QUERY_KEYS.all,
		queryFn: getReminders,
		staleTime: 30_000
	})
}
