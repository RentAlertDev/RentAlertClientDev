import { Skeleton } from '@/shared/ui/skeleton'

export function ApartmentCardSkeleton() {
	return (
		<div className='overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]'>
			<Skeleton className='aspect-[16/10] rounded-none' />

			<div className='space-y-4 p-4'>
				<div className='flex justify-between gap-4'>
					<div className='w-full space-y-2'>
						<Skeleton className='h-5 w-4/5' />
						<Skeleton className='h-4 w-2/3' />
					</div>
					<div className='shrink-0 space-y-2'>
						<Skeleton className='h-5 w-20' />
						<Skeleton className='h-3 w-16' />
					</div>
				</div>

				<div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
					{Array.from({ length: 4 }).map((_, index) => (
						<div
							className='rounded-md border border-[var(--border)] p-3'
							key={index}
						>
							<Skeleton className='mb-2 h-3 w-14' />
							<Skeleton className='h-4 w-full' />
						</div>
					))}
				</div>

				<div className='space-y-2'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-11/12' />
					<Skeleton className='h-4 w-2/3' />
				</div>
			</div>
		</div>
	)
}
