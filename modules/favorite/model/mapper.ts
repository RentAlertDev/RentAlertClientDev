import { mapApartmentFromApi } from '@/modules/apartment/model/mappers'
import type { FavoriteApiItem, FavoritesApiPage, FavoritesPage } from './types'
export function mapFavoritesResponse(response: FavoriteApiItem[] | FavoriteApiItem | FavoritesApiPage): FavoritesPage {
	const raw = Array.isArray(response) ? response : 'content' in response ? response.content : [response]
	const content = raw.map(item => ({ ...item, listing: mapApartmentFromApi(item.listing) }))
	const paged = !Array.isArray(response) && 'content' in response ? response : undefined
	const number = paged?.page?.number ?? paged?.number ?? 0
	const size = paged?.page?.size ?? paged?.size ?? content.length
	const totalElements = paged?.page?.totalElements ?? paged?.totalElements ?? content.length
	const totalPages = paged?.page?.totalPages ?? paged?.totalPages ?? (size ? Math.ceil(totalElements / size) : 0)
	return { content, number, size, totalElements, totalPages, first: paged?.first ?? number === 0, last: paged?.last ?? number >= totalPages - 1 }
}
