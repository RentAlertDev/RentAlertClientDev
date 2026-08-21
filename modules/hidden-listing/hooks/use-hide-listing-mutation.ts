'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { hideListing } from '../api/hidden-listing-api'
import { hiddenListingsQueryKey } from './use-hidden-listings-query'

export function useHideListingMutation() {
	const client = useQueryClient()

	return useMutation({
		mutationFn: hideListing,
		onSuccess: () => client.invalidateQueries({ queryKey: hiddenListingsQueryKey })
	})
}
