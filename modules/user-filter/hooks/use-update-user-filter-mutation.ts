'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserFilter } from '../api/user-filter-api'
import { USER_FILTER_QUERY_KEYS } from '../model/constants'
import type { UserFilterRequest } from '../model/types'

interface UpdateUserFilterMutationParams {
	filterId: number
	request: UserFilterRequest
}

export function useUpdateUserFilterMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ filterId, request }: UpdateUserFilterMutationParams) =>
			updateUserFilter(filterId, request),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: USER_FILTER_QUERY_KEYS.all
			})
		}
	})
}
