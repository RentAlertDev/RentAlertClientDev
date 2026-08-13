export function formatRateDate(value: string) {
	const date = new Date(`${value}T00:00:00`)

	if (Number.isNaN(date.getTime())) {
		return value
	}

	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date)
}

export function formatCurrencyRate(value: number) {
	return new Intl.NumberFormat('ru-RU', {
		maximumFractionDigits: 5,
		minimumFractionDigits: 2
	}).format(value)
}

export function findCurrencyRate(
	rates: { currency: string; perCurrency: string; rate: number }[] | undefined,
	currency: string,
	perCurrency: string
) {
	return rates?.find(
		rate =>
			rate.currency === currency && rate.perCurrency === perCurrency
	)?.rate
}
