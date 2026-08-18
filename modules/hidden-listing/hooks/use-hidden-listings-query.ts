'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getHiddenListings } from '../api/hidden-listing-api'
import type { GetHiddenListingsParams } from '../model/types'

export const hiddenListingsQueryKey = ['hidden-listings'] as const

export function useHiddenListingsQuery(params: GetHiddenListingsParams) {
	return useQuery({
		queryKey: [...hiddenListingsQueryKey, params],
		queryFn: () => getHiddenListings(params),
		placeholderData: keepPreviousData,
		staleTime: 30_000
	})
}
