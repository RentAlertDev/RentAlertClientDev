import { ApartmentCurrency } from '../../model/types'
import type { ApartmentPriceView } from '../../model/formatters'
import { BynCurrencySymbol } from '@/shared/ui/currency-symbol'

interface ApartmentPriceProps {
	price: ApartmentPriceView
	size?: 'base' | 'sm'
}

export function ApartmentPrice({ price, size = 'base' }: ApartmentPriceProps) {
	const isByn = price.currency === ApartmentCurrency.Byn
	const sizeClass =
		size === 'base'
			? 'text-xl font-bold leading-none'
			: 'text-xs font-medium leading-none'

	return (
		<span className={`inline-flex items-baseline gap-1 ${sizeClass}`}>
			<span>{price.amount}</span>
			{isByn ? (
				<BynCurrencySymbol />
			) : (
				<span className='inline-block w-[0.64em] text-center'>$</span>
			)}
		</span>
	)
}
