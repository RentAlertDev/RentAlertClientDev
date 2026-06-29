import type {
	Apartment,
	ApartmentApiItem,
	ApartmentsPage,
	ApartmentsPageResponse
} from './types'

function repairMojibake(value: string) {
	if (!/[ÐÑ][\u0080-\u00ff]/.test(value)) {
		return value
	}

	try {
		return decodeURIComponent(
			Array.from(value)
				.map(char => {
					const code = char.charCodeAt(0)

					if (code > 255) {
						throw new Error('Cannot repair non-byte character')
					}

					return `%${code.toString(16).padStart(2, '0')}`
				})
				.join('')
		)
	} catch {
		return value
	}
}

function normalizeText(value?: string) {
	return value ? repairMojibake(value).trim() : ''
}

function getPreviewPhoto(value?: string) {
	if (!value?.startsWith('http')) {
		return undefined
	}

	return value
}

export function mapApartmentFromApi(apartment: ApartmentApiItem): Apartment {
	const title = normalizeText(apartment.title)
	const description = normalizeText(apartment.description)

	return {
		id: apartment.id,
		source: apartment.source,
		sourceUrl: apartment.sourceUrl,
		title: title || description || 'Квартира без названия',
		description: description || title || 'Описание пока не указано',
		street: normalizeText(apartment.street),
		metroStation: normalizeText(apartment.metroStation),
		price: apartment.price,
		currency: apartment.currency,
		rooms: apartment.rooms ?? 0,
		studio: apartment.studio ?? false,
		areaTotal: apartment.areaTotal,
		floor: apartment.floor,
		floorsTotal: apartment.floorsTotal,
		houseType: normalizeText(apartment.houseType),
		previewPhoto: getPreviewPhoto(apartment.previewPhoto),
		photos:
			apartment.photos?.filter(photo => photo.startsWith('http')) ?? []
	}
}

export function mapApartmentsPageFromApi(
	response: ApartmentsPageResponse
): ApartmentsPage {
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
