import { mapApartmentFromApi } from '@/modules/apartment/model/mappers'
import type { HiddenListingsPage, HiddenListingsPageResponse } from './types'

export function mapHiddenListingsPageFromApi(
	response: HiddenListingsPageResponse
): HiddenListingsPage {
	const content = response.content.map(mapApartmentFromApi)
	const number = response.page?.number ?? response.number ?? 0
	const size = response.page?.size ?? response.size ?? content.length
	const totalElements =
		response.page?.totalElements ?? response.totalElements ?? content.length
	const totalPages =
		response.page?.totalPages ??
		response.totalPages ??
		(size > 0 ? Math.ceil(totalElements / size) : 0)

	return {
		content,
		empty: response.empty ?? content.length === 0,
		first: response.first ?? number === 0,
		last: response.last ?? number >= totalPages - 1,
		number,
		numberOfElements: response.numberOfElements ?? content.length,
		size,
		totalElements,
		totalPages
	}
}
