import { Skeleton } from '@/shared/ui/skeleton'

export function HiddenListingsSkeleton() {
	return (
		<div
			aria-label='Загружаем скрытые объявления'
			className='grid gap-4'
			role='status'
		>
			{Array.from({ length: 2 }).map((_, itemIndex) => (
				<div
					className='overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card)]'
					key={itemIndex}
				>
					<Skeleton className='aspect-[16/9] w-full rounded-none' />
					<div className='space-y-4 p-4'>
						<div className='flex justify-between gap-4'>
							<div className='flex-1 space-y-2'>
								<Skeleton className='h-6 w-3/4' />
								<Skeleton className='h-4 w-1/2' />
							</div>
							<Skeleton className='h-6 w-20' />
						</div>
						<div className='grid grid-cols-3 gap-2'>
							{Array.from({ length: 3 }).map((_, index) => (
								<Skeleton className='h-16' key={index} />
							))}
						</div>
						<Skeleton className='h-10 w-full' />
					</div>
				</div>
			))}
		</div>
	)
}
