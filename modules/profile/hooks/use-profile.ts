'use client'

import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../api/get-profile'

export function useProfile() {
	return useQuery({
		queryKey: ['profile', 'me'],
		queryFn: getProfile,
		staleTime: 60_000
	})
}
