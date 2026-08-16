'use client'

import { useState, type PointerEvent } from 'react'
import { ArrowRightLeft, GripVertical, TrendingUp } from 'lucide-react'
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
	const [orderedRates, setOrderedRates] = useState(data.rates)
	const [draggingIndex, setDraggingIndex] = useState<number | null>(null)

	function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
		if (draggingIndex === null) return
		const target = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-rate-index]')
		const targetIndex = Number(target?.dataset.rateIndex)
		if (!Number.isInteger(targetIndex) || targetIndex === draggingIndex) return
		setOrderedRates(current => {
			const next = [...current]
			const [moved] = next.splice(draggingIndex, 1)
			next.splice(targetIndex, 0, moved)
			return next
		})
		setDraggingIndex(targetIndex)
	}

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
					{orderedRates.map((rate, index) => (
						<div
							className='flex items-center justify-between gap-3 rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] px-3 py-3 transition duration-200 data-[dragging=true]:scale-[1.02] data-[dragging=true]:border-[var(--primary)] data-[dragging=true]:shadow-[0_12px_30px_var(--card-shadow)]'
							data-dragging={draggingIndex === index}
							data-rate-index={index}
							key={`${rate.currency}-${rate.perCurrency}`}
						>
							<div className='flex items-center gap-2'>
								<button aria-label='Перетащить валютную пару' className='grid size-9 touch-none cursor-grab place-items-center rounded-full bg-[var(--card)] text-[var(--muted)] active:cursor-grabbing active:text-[var(--primary)]' onPointerCancel={() => setDraggingIndex(null)} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); setDraggingIndex(index) }} onPointerMove={handlePointerMove} onPointerUp={() => setDraggingIndex(null)} type='button'><span className='relative'><ArrowRightLeft aria-hidden className='size-4' /><GripVertical aria-hidden className='absolute -right-2 -top-1 size-3 opacity-60' /></span></button>
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
