import { BellRing, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'

interface ApartmentsNoActiveFilterProps {
	message: string
	onConfigure: () => void
}

export function ApartmentsNoActiveFilter({
	message,
	onConfigure
}: ApartmentsNoActiveFilterProps) {
	return (
		<Card className='border-[color-mix(in_srgb,var(--ring)_34%,transparent)] bg-[color-mix(in_srgb,var(--ring)_8%,var(--card))] shadow-none'>
			<CardContent className='flex flex-col items-center px-5 py-10 text-center'>
				<div className='grid size-14 place-items-center rounded-full bg-[color-mix(in_srgb,var(--ring)_15%,transparent)] text-[var(--ring)]'>
					<BellRing aria-hidden className='size-7' />
				</div>
				<h2 className='mt-4 text-xl font-semibold'>Настройте поиск квартир</h2>
				<p className='mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]'>
					{message}
				</p>
				<Button className='mt-5' onClick={onConfigure}>
					<SlidersHorizontal aria-hidden className='size-4' />
					Создать и применить фильтр
				</Button>
			</CardContent>
		</Card>
	)
}
