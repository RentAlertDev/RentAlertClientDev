import { httpClient } from '@/shared/api/http-client'
import { FAVORITES_API } from '../model/constants'
import { mapFavoritesResponse } from '../model/mapper'
import type { FavoriteApiItem, FavoriteCreateRequest, FavoritesApiPage, FavoriteUpdateStatusRequest, GetFavoritesParams } from '../model/types'
export async function getFavorites(params: GetFavoritesParams) {
	const response = await httpClient.get<
		FavoriteApiItem[] | FavoriteApiItem | FavoritesApiPage
	>(FAVORITES_API, {
		params,
		paramsSerializer: {
			indexes: null
		}
	})

	return mapFavoritesResponse(response.data)
}
export async function addFavorite(data: FavoriteCreateRequest) { await httpClient.post(FAVORITES_API, data) }
export async function removeFavorite(listingId: number) { await httpClient.delete(`${FAVORITES_API}/${listingId}`) }
export async function updateFavoriteStatus(listingId: number, data: FavoriteUpdateStatusRequest) { await httpClient.put(`${FAVORITES_API}/${listingId}`, data) }
