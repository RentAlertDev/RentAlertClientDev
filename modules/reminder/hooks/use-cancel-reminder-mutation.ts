'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelReminder } from '../api/reminder-api'
import { REMINDER_QUERY_KEYS } from '../model/constants'

export function useCancelReminderMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: cancelReminder,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: REMINDER_QUERY_KEYS.all
			})
		}
	})
}
