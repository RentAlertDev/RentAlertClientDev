'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReminder } from '../api/reminder-api'
import { REMINDER_QUERY_KEYS } from '../model/constants'

export function useCreateReminderMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createReminder,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: REMINDER_QUERY_KEYS.all
			})
		}
	})
}
