import { httpClient } from '@/shared/api/http-client'
import { HIDDEN_LISTINGS_API } from '../model/constants'
import { mapHiddenListingsPageFromApi } from '../model/mapper'
import type {
	GetHiddenListingsParams,
	HiddenListingsPage,
	HiddenListingsPageResponse
} from '../model/types'

export async function getHiddenListings(
	params: GetHiddenListingsParams
): Promise<HiddenListingsPage> {
	const response = await httpClient.get<HiddenListingsPageResponse>(
		HIDDEN_LISTINGS_API,
		{
			params,
			paramsSerializer: {
				indexes: null
			}
		}
	)

	return mapHiddenListingsPageFromApi(response.data)
}

export async function hideListing(listingId: number) {
	await httpClient.post(`${HIDDEN_LISTINGS_API}/${listingId}`)
}

export async function removeFromHidden(listingId: number) {
	await httpClient.delete(`${HIDDEN_LISTINGS_API}/${listingId}`)
}
