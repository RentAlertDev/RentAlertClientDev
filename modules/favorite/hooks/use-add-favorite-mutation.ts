'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addFavorite } from '../api/favorite-api'
import { favoritesQueryKey } from './use-favorites-query'
export function useAddFavoriteMutation() { const client = useQueryClient(); return useMutation({ mutationFn: addFavorite, onSuccess: () => client.invalidateQueries({ queryKey: favoritesQueryKey }) }) }
