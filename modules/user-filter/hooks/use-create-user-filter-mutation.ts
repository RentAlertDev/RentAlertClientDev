'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUserFilter } from '../api/user-filter-api'
import { USER_FILTER_QUERY_KEYS } from '../model/constants'

export function useCreateUserFilterMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createUserFilter,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: USER_FILTER_QUERY_KEYS.all
			})
		}
	})
}
