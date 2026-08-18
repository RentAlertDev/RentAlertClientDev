import type { Apartment, ApartmentApiItem } from '@/modules/apartment'

export interface HiddenListingsPageMetaResponse {
	size: number
	number: number
	totalElements: number
	totalPages: number
}

export interface HiddenListingsPageResponse {
	content: ApartmentApiItem[]
	page?: HiddenListingsPageMetaResponse
	empty?: boolean
	first?: boolean
	last?: boolean
	number?: number
	numberOfElements?: number
	size?: number
	totalElements?: number
	totalPages?: number
}

export interface HiddenListingsPage {
	content: Apartment[]
	empty: boolean
	first: boolean
	last: boolean
	number: number
	numberOfElements: number
	size: number
	totalElements: number
	totalPages: number
}

export interface GetHiddenListingsParams {
	page: number
	size: number
	sort?: string[]
}
