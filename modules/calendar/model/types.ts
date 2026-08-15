export interface CalendarDaySummary {
	date: string
	count: number
}

export interface CalendarViewing {
	listingId: number
	title: string
	address: string
	price: number
	currency: string
	coverPhotoUrl?: string
	viewingDate: string
	status: string
}

export interface CalendarRange {
	from: string
	to: string
}
