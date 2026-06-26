'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getApartments } from '../api/get-apartments'
import type { GetApartmentsParams } from '../model/types'

export function useApartments(params: GetApartmentsParams) {
	return useQuery({
		queryKey: ['apartments', params],
		queryFn: () => getApartments(params),
		placeholderData: keepPreviousData,
		staleTime: 30_000
	})
}
