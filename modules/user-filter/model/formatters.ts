import type {
	UserFilter,
	UserFilterFormValues,
	UserFilterRequest
} from './types'

export const defaultUserFilterFormValues: UserFilterFormValues = {
	areaFrom: '35',
	areaTo: '80',
	priceFrom: '500',
	priceTo: '1500',
	roomsFrom: '1',
	roomsTo: '3'
}

function formatNumber(value: number) {
	return new Intl.NumberFormat('ru-RU', {
		maximumFractionDigits: 0
	}).format(value)
}

function formatRange(from?: number, to?: number, unit = '') {
	if (from !== undefined && to !== undefined) {
		return `${formatNumber(from)} - ${formatNumber(to)}${unit}`
	}

	if (from !== undefined) {
		return `от ${formatNumber(from)}${unit}`
	}

	if (to !== undefined) {
		return `до ${formatNumber(to)}${unit}`
	}

	return 'Не указано'
}

function normalizeNumberInput(value: string) {
	if (!value.trim()) {
		return undefined
	}

	const parsedValue = Number(value)

	return Number.isFinite(parsedValue) ? parsedValue : undefined
}

export function mapFilterToFormValues(
	filter?: UserFilter
): UserFilterFormValues {
	if (!filter) {
		return defaultUserFilterFormValues
	}

	return {
		areaFrom: filter.areaFrom?.toString() ?? '',
		areaTo: filter.areaTo?.toString() ?? '',
		priceFrom: filter.priceFrom?.toString() ?? '',
		priceTo: filter.priceTo?.toString() ?? '',
		roomsFrom: filter.roomsFrom?.toString() ?? '',
		roomsTo: filter.roomsTo?.toString() ?? ''
	}
}

export function mapFormValuesToRequest(
	values: UserFilterFormValues
): UserFilterRequest {
	const request: UserFilterRequest = {}
	const priceFrom = normalizeNumberInput(values.priceFrom)
	const priceTo = normalizeNumberInput(values.priceTo)
	const roomsFrom = normalizeNumberInput(values.roomsFrom)
	const roomsTo = normalizeNumberInput(values.roomsTo)
	const areaFrom = normalizeNumberInput(values.areaFrom)
	const areaTo = normalizeNumberInput(values.areaTo)

	if (priceFrom !== undefined) {
		request.priceFrom = priceFrom
	}

	if (priceTo !== undefined) {
		request.priceTo = priceTo
	}

	if (roomsFrom !== undefined) {
		request.roomsFrom = roomsFrom
	}

	if (roomsTo !== undefined) {
		request.roomsTo = roomsTo
	}

	if (areaFrom !== undefined) {
		request.areaFrom = areaFrom
	}

	if (areaTo !== undefined) {
		request.areaTo = areaTo
	}

	return request
}

export function formatFilterPrice(filter: UserFilter) {
	return formatRange(filter.priceFrom, filter.priceTo, ' $')
}

export function formatFilterRooms(filter: UserFilter) {
	return formatRange(filter.roomsFrom, filter.roomsTo)
}

export function formatFilterArea(filter: UserFilter) {
	return formatRange(filter.areaFrom, filter.areaTo, ' м²')
}

export function formatFilterDate(value?: string) {
	if (!value) {
		return null
	}

	const date = new Date(value)

	if (Number.isNaN(date.getTime())) {
		return value
	}

	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date)
}
