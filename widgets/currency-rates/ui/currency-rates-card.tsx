import { ArrowRightLeft, TrendingUp } from 'lucide-react'
import {
	formatCurrencyRate,
	formatRateDate,
	type CurrencyRatesResponse
} from '@/modules/currency-rate'
import { Card, CardContent } from '@/shared/ui/card'
import { CurrencyFlag } from '@/shared/ui/currency-flag'

interface CurrencyRatesCardProps {
	data: CurrencyRatesResponse
}

function CurrencyCode({ currency }: { currency: string }) {
	return (
		<span className='inline-flex items-center gap-1.5 whitespace-nowrap'>
			<CurrencyFlag className='size-6' currency={currency} />
			<span>{currency}</span>
		</span>
	)
}

export function CurrencyRatesCard({ data }: CurrencyRatesCardProps) {
	return (
		<Card as='section' className='overflow-hidden shadow-none'>
			<CardContent className='space-y-4'>
				<div className='flex items-start justify-between gap-4'>
					<div>
						<div className='flex items-center gap-2 text-sm font-medium text-[var(--muted)]'>
							<TrendingUp aria-hidden className='size-4' />
							Курсы валют
						</div>
						<h2 className='mt-1 text-xl font-semibold'>Актуальные курсы</h2>
					</div>
					<div className='rounded-md bg-[var(--card-muted)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]'>
						на {formatRateDate(data.rateDate)}
					</div>
				</div>

				<div className='grid gap-2 sm:grid-cols-2'>
					{data.rates.map(rate => (
						<div
							className='flex items-center justify-between gap-4 rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] px-3 py-3'
							key={`${rate.currency}-${rate.perCurrency}`}
						>
							<div className='flex items-center gap-2'>
								<div className='grid size-8 place-items-center rounded-full bg-[var(--card)] text-[var(--muted)]'>
									<ArrowRightLeft aria-hidden className='size-4' />
								</div>
								<div>
									<div className='text-xs text-[var(--muted)]'>Валютная пара</div>
									<div className='mt-1 flex items-center gap-2 text-sm font-semibold'>
										<CurrencyCode currency={rate.currency} />
										<span aria-hidden className='text-[var(--muted)]'>→</span>
										<CurrencyCode currency={rate.perCurrency} />
									</div>
								</div>
							</div>
							<div className='text-lg font-semibold tabular-nums'>
								{formatCurrencyRate(rate.rate)}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
