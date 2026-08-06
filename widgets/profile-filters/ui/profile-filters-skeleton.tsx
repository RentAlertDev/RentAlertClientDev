import { Skeleton } from '@/shared/ui/skeleton'

export function ProfileFiltersSkeleton() {
	return (
		<section className='rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4'>
			<div className='mb-4 space-y-2'>
				<Skeleton className='h-4 w-20' />
				<Skeleton className='h-7 w-52 max-w-full' />
			</div>
			<div className='rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
				<div className='flex items-start justify-between gap-3'>
					<div className='flex-1 space-y-2'>
						<Skeleton className='h-5 w-28' />
						<Skeleton className='h-3 w-24' />
					</div>
					<div className='flex gap-2'>
						{Array.from({ length: 3 }).map((_, index) => (
							<Skeleton className='size-9' key={index} />
						))}
					</div>
				</div>
				<div className='mt-4 grid grid-cols-3 gap-3'>
					{Array.from({ length: 3 }).map((_, index) => (
						<div className='space-y-2' key={index}>
							<Skeleton className='h-3 w-14' />
							<Skeleton className='h-5 w-full' />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
