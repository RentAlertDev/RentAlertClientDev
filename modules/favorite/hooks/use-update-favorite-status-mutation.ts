'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateFavoriteStatus } from '../api/favorite-api'
import type { FavoriteUpdateStatusRequest } from '../model/types'
import { favoritesQueryKey } from './use-favorites-query'
export function useUpdateFavoriteStatusMutation() { const client = useQueryClient(); return useMutation({ mutationFn: ({ listingId, data }: { listingId: number; data: FavoriteUpdateStatusRequest }) => updateFavoriteStatus(listingId, data), onSuccess: () => client.invalidateQueries({ queryKey: favoritesQueryKey }) }) }
