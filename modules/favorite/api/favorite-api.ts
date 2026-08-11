import { httpClient } from '@/shared/api/http-client'
import { FAVORITES_API, FAVORITE_STATUSES_API } from '../model/constants'
import { mapFavoritesResponse } from '../model/mapper'
import type { FavoriteApiItem, FavoriteCreateRequest, FavoritesApiPage, FavoriteStatusOption, FavoriteUpdateStatusRequest, GetFavoritesParams } from '../model/types'

export async function getFavoriteStatuses() {
	const response = await httpClient.get<FavoriteStatusOption[]>(
		FAVORITE_STATUSES_API
	)

	return response.data
}
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
