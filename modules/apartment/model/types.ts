export enum ApartmentSource {
	Kufar = 'KUFAR',
	Realt = 'REALT'
}

export enum ApartmentCurrency {
	Usd = 'USD',
	Byn = 'BYN',
	Byr = 'BYR'
}

export interface Apartment {
	id: number
	source: ApartmentSource | string
	sourceUrl: string
	title: string
	description: string
	street?: string
	metroStation?: string
	price: number
	currency: ApartmentCurrency | string
	rooms: number
	studio: boolean
	areaTotal?: number
	floor?: number
	floorsTotal?: number
	houseType?: string
	previewPhoto?: string
	photos: string[]
	isFavorite?: boolean
}

export interface ApartmentApiItem {
	id: number
	source: string
	sourceUrl: string
	title?: string
	description?: string
	street?: string
	metroStation?: string
	price: number
	currency: string
	rooms?: number
	studio?: boolean
	areaTotal?: number
	floor?: number
	floorsTotal?: number
	houseType?: string
	previewPhoto?: string
	photos?: string[]
}

export interface ApartmentsPageMetaResponse {
	size: number
	number: number
	totalElements: number
	totalPages: number
}

export interface ApartmentsPageResponse {
	content: ApartmentApiItem[]
	page?: ApartmentsPageMetaResponse
	empty?: boolean
	first?: boolean
	last?: boolean
	number?: number
	numberOfElements?: number
	size?: number
	totalElements?: number
	totalPages?: number
}

export interface ApartmentsPage {
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

export interface GetApartmentsParams {
	page: number
	size: number
}
