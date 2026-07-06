'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setUserFilterActivation } from '../api/user-filter-api'
import { USER_FILTER_QUERY_KEYS } from '../model/constants'

interface SetUserFilterActivationParams {
	active: boolean
	filterId: number
}

export function useSetUserFilterActivationMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ active, filterId }: SetUserFilterActivationParams) =>
			setUserFilterActivation(filterId, active),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: USER_FILTER_QUERY_KEYS.all
			})
		}
	})
}
