export interface CurrencyRate {
	currency: string
	perCurrency: string
	rate: number
}

export interface CurrencyRatesResponse {
	rateDate: string
	rates: CurrencyRate[]
}
