const DATE_PAD_LENGTH = 2

export function toDateKey(date: Date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(DATE_PAD_LENGTH, '0')}-${String(date.getDate()).padStart(DATE_PAD_LENGTH, '0')}`
}

export function getMonthKey(date: Date) {
	return toDateKey(date).slice(0, 7)
}

export function getMonthRange(date: Date) {
	return {
		from: toDateKey(new Date(date.getFullYear(), date.getMonth(), 1)),
		to: toDateKey(new Date(date.getFullYear(), date.getMonth() + 1, 0))
	}
}

export function getCalendarGrid(month: Date) {
	const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
	const mondayOffset = (firstDay.getDay() + 6) % 7
	const gridStart = new Date(month.getFullYear(), month.getMonth(), 1 - mondayOffset)
	return Array.from({ length: 42 }, (_, index) => new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index))
}

export function addMonths(date: Date, amount: number) {
	return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}
