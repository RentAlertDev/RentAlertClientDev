import { BynCurrencySymbol } from './byn-currency-symbol'

interface CurrencySymbolProps {
	currency: string
}

const currencySymbols: Record<string, string> = {
	EUR: '€',
	USD: '$'
}

export function CurrencySymbol({ currency }: CurrencySymbolProps) {
	if (currency === 'BYN' || currency === 'BYR') {
		return <BynCurrencySymbol />
	}

	return (
		<span
			aria-label={currency}
			className='inline-block min-w-[0.64em] text-center'
		>
			{currencySymbols[currency] ?? currency}
		</span>
	)
}
