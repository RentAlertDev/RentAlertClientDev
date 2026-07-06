'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserFilters } from '../api/user-filter-api'
import { USER_FILTER_QUERY_KEYS } from '../model/constants'

export function useUserFiltersQuery() {
	return useQuery({
		queryKey: USER_FILTER_QUERY_KEYS.all,
		queryFn: getUserFilters,
		staleTime: 30_000
	})
}
