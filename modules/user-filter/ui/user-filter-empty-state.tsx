import { SlidersHorizontal } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'

export function UserFilterEmptyState() {
	return (
		<Card className='shadow-none'>
			<CardContent className='flex flex-col items-center gap-3 py-8 text-center'>
				<div className='grid size-12 place-items-center rounded-lg bg-[var(--card-muted)] text-[var(--muted)]'>
					<SlidersHorizontal aria-hidden className='size-6' />
				</div>
				<div>
					<div className='font-semibold'>Фильтров пока нет</div>
					<p className='mt-1 text-sm text-[var(--muted)]'>
						Создай фильтр на странице квартир, и он появится здесь.
					</p>
				</div>
			</CardContent>
		</Card>
	)
}
