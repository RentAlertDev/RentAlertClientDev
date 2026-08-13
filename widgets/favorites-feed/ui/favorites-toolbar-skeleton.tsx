import { Skeleton } from '@/shared/ui/skeleton'

export function FavoritesToolbarSkeleton() {
	return (
		<div aria-label='Загрузка настроек списка' className='rounded-lg border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
			<div className='mb-3 flex items-center gap-2'><Skeleton className='size-4 rounded-full' /><Skeleton className='h-4 w-32' /></div>
			<div className='grid gap-2 sm:grid-cols-[1fr_1fr_150px]'>
				{Array.from({ length: 3 }).map((_, index) => <div className='space-y-1.5' key={index}><Skeleton className='h-3 w-20' /><Skeleton className='h-10 w-full' /></div>)}
			</div>
		</div>
	)
}
