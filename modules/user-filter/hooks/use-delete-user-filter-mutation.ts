'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUserFilter } from '../api/user-filter-api'
import { USER_FILTER_QUERY_KEYS } from '../model/constants'

export function useDeleteUserFilterMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: deleteUserFilter,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: USER_FILTER_QUERY_KEYS.all
			})
		}
	})
}
