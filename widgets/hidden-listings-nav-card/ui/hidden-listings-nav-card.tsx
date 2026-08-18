import Link from 'next/link'
import { ChevronRight, EyeOff } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'

export function HiddenListingsNavCard() {
	return (
		<Link className='block' href='/hidden-listings'>
			<Card className='shadow-none transition hover:bg-[var(--card-muted)]'>
				<CardContent className='flex items-center justify-between gap-4'>
					<div className='flex min-w-0 items-center gap-3'>
						<div className='grid size-10 shrink-0 place-items-center rounded-full bg-[var(--card-muted)] text-[var(--primary)]'>
							<EyeOff aria-hidden className='size-5' />
						</div>
						<div>
							<h2 className='font-semibold'>Спрятанные объявления</h2>
							<p className='text-xs text-[var(--muted)]'>Квартиры, скрытые через бота</p>
						</div>
					</div>
					<ChevronRight aria-hidden className='size-5 shrink-0 text-[var(--muted)]' />
				</CardContent>
			</Card>
		</Link>
	)
}
