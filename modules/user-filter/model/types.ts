export interface UserFilter {
	id: number
	priceFrom?: number
	priceTo?: number
	roomsFrom?: number
	roomsTo?: number
	areaFrom?: number
	areaTo?: number
	active?: boolean
	currency?: string
	createdAt?: string
	updatedAt?: string
}

export interface UserFilterRequest {
	priceFrom?: number
	priceTo?: number
	roomsFrom?: number
	roomsTo?: number
	areaFrom?: number
	areaTo?: number
	currency: string
}

export interface UserFilterFormValues {
	priceFrom: string
	priceTo: string
	roomsFrom: string
	roomsTo: string
	areaFrom: string
	areaTo: string
	currency: string
}
