import { Skeleton } from '@/shared/ui/skeleton'

export function ProfileOverviewSkeleton() {
	return (
		<section
			aria-label='Загружаем профиль'
			className='rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4'
			role='status'
		>
			<div className='mb-4 flex items-center gap-3'>
				<Skeleton className='size-12 rounded-full' />
				<div className='flex-1 space-y-2'>
					<Skeleton className='h-5 w-40 max-w-full' />
					<Skeleton className='h-4 w-24' />
				</div>
			</div>
			<div className='grid gap-3 sm:grid-cols-3'>
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						className='rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] p-4'
						key={index}
					>
						<Skeleton className='mb-3 h-3 w-24' />
						<Skeleton className='h-5 w-3/4' />
					</div>
				))}
			</div>
		</section>
	)
}
