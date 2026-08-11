'use client'

import { useQuery } from '@tanstack/react-query'
import { getFavoriteStatuses } from '../api/favorite-api'

export const favoriteStatusesQueryKey = ['favorite-statuses'] as const

export function useFavoriteStatusesQuery() {
	return useQuery({
		queryFn: getFavoriteStatuses,
		queryKey: favoriteStatusesQueryKey,
		staleTime: 5 * 60_000
	})
}
