import { EyeOff } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'

export function HiddenListingsEmptyState() {
	return (
		<Card className='shadow-none'>
			<CardContent className='flex flex-col items-center py-12 text-center'>
				<div className='grid size-14 place-items-center rounded-full bg-[var(--card-muted)] text-[var(--muted)]'>
					<EyeOff className='size-7' />
				</div>
				<h2 className='mt-4 text-lg font-semibold'>Спрятанных объявлений нет</h2>
				<p className='mt-1 max-w-xs text-sm text-[var(--muted)]'>
					Здесь появятся квартиры, которые вы скрыли через бота, чтобы они больше не приходили в уведомлениях.
				</p>
			</CardContent>
		</Card>
	)
}
