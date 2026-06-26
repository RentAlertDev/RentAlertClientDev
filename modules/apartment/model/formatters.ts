import { ApartmentCurrency, type Apartment } from './types'

const USD_TO_BYN_RATE = 3.27

export interface ApartmentPriceView {
	amount: string
	currency: ApartmentCurrency
}

export interface ApartmentPricePair {
	primary: ApartmentPriceView
	secondary: ApartmentPriceView
}

function formatNumber(value: number) {
	return new Intl.NumberFormat('ru-BY', {
		maximumFractionDigits: 0
	}).format(value)
}

export function formatApartmentsCount(count: number) {
	const mod10 = count % 10
	const mod100 = count % 100

	if (mod10 === 1 && mod100 !== 11) {
		return `${formatNumber(count)} квартира`
	}

	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
		return `${formatNumber(count)} квартиры`
	}

	return `${formatNumber(count)} квартир`
}

export function formatApartmentPrice(
	price: number,
	currency: ApartmentCurrency
): ApartmentPriceView {
	return {
		amount: formatNumber(price),
		currency
	}
}

export function getApartmentPricePair(
	apartment: Apartment
): ApartmentPricePair {
	if (apartment.currency === ApartmentCurrency.Usd) {
		return {
			primary: formatApartmentPrice(
				apartment.price,
				ApartmentCurrency.Usd
			),
			secondary: formatApartmentPrice(
				apartment.price * USD_TO_BYN_RATE,
				ApartmentCurrency.Byn
			)
		}
	}

	return {
		primary: formatApartmentPrice(apartment.price, ApartmentCurrency.Byn),
		secondary: formatApartmentPrice(
			apartment.price / USD_TO_BYN_RATE,
			ApartmentCurrency.Usd
		)
	}
}

export function formatApartmentRooms(apartment: Apartment) {
	if (apartment.studio) {
		return 'Студия'
	}

	return `${apartment.rooms}-комн.`
}

export function formatApartmentFloor(apartment: Apartment) {
	if (!apartment.floor && !apartment.floorsTotal) {
		return 'Не указан'
	}

	if (!apartment.floorsTotal) {
		return `${apartment.floor} этаж`
	}

	return `${apartment.floor}/${apartment.floorsTotal} этаж`
}

export function formatApartmentArea(areaTotal?: number) {
	if (!areaTotal) {
		return 'Не указана'
	}

	return `${new Intl.NumberFormat('ru-BY', {
		maximumFractionDigits: 1
	}).format(areaTotal)} м²`
}

export function formatApartmentHouseType(houseType?: string) {
	return houseType || 'Не указан'
}
