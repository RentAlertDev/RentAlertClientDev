'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeFromHidden } from '../api/hidden-listing-api'
import { hiddenListingsQueryKey } from './use-hidden-listings-query'

export function useRemoveHiddenListingMutation() {
	const client = useQueryClient()

	return useMutation({
		mutationFn: removeFromHidden,
		onSuccess: () => client.invalidateQueries({ queryKey: hiddenListingsQueryKey })
	})
}
