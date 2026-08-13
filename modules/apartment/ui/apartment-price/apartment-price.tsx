import type { ApartmentPriceView } from '../../model/formatters'
import { CurrencySymbol } from '@/shared/ui/currency-symbol'

interface ApartmentPriceProps {
	price: ApartmentPriceView
	size?: 'base' | 'sm'
}

export function ApartmentPrice({ price, size = 'base' }: ApartmentPriceProps) {
	const sizeClass =
		size === 'base'
			? 'text-xl font-bold leading-none'
			: 'text-xs font-medium leading-none'

	return (
		<span className={`inline-flex items-baseline gap-1 ${sizeClass}`}>
			<span>{price.amount}</span>
			<CurrencySymbol currency={price.currency} />
		</span>
	)
}
