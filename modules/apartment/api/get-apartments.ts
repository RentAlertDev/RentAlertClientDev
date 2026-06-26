import { httpClient } from '@/shared/api/http-client'
import { APARTMENTS_API } from '../model/constants'
import { mapApartmentsPageFromApi } from '../model/mappers'
import type {
	ApartmentsPage,
	ApartmentsPageResponse,
	GetApartmentsParams
} from '../model/types'

export async function getApartments(
	params: GetApartmentsParams
): Promise<ApartmentsPage> {
	const response = await httpClient.get<ApartmentsPageResponse>(
		APARTMENTS_API.root,
		{
			params
		}
	)

	return mapApartmentsPageFromApi(response.data)
}
