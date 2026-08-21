import { Plus, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'

interface UserFilterEmptyStateProps {
	onCreate?: () => void
}

export function UserFilterEmptyState({ onCreate }: UserFilterEmptyStateProps) {
	return (
		<Card className='shadow-none'>
			<CardContent className='flex flex-col items-center gap-3 py-8 text-center'>
				<div className='grid size-12 place-items-center rounded-lg bg-[var(--card-muted)] text-[var(--muted)]'>
					<SlidersHorizontal aria-hidden className='size-6' />
				</div>
				<div>
					<div className='font-semibold'>Фильтров пока нет</div>
					<p className='mt-1 text-sm text-[var(--muted)]'>
						Создай фильтр, и он появится здесь.
					</p>
				</div>
				{onCreate ? (
					<Button onClick={onCreate}>
						<Plus aria-hidden className='size-4' />
						Создать фильтр
					</Button>
				) : null}
			</CardContent>
		</Card>
	)
}
