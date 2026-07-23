'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeFavorite } from '../api/favorite-api'
import { favoritesQueryKey } from './use-favorites-query'
export function useRemoveFavoriteMutation() { const client = useQueryClient(); return useMutation({ mutationFn: removeFavorite, onSuccess: () => client.invalidateQueries({ queryKey: favoritesQueryKey }) }) }
