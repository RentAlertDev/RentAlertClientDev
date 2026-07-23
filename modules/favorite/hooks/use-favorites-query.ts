'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getFavorites } from '../api/favorite-api'
import type { GetFavoritesParams } from '../model/types'
export const favoritesQueryKey = ['favorites'] as const
export function useFavoritesQuery(params: GetFavoritesParams = {}) { return useQuery({ queryKey: [...favoritesQueryKey, params], queryFn: () => getFavorites(params), placeholderData: keepPreviousData, staleTime: 30_000 }) }
