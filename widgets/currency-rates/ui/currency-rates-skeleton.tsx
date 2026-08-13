import { Skeleton } from '@/shared/ui/skeleton'

export function CurrencyRatesSkeleton() {
	return (
		<section className='rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4'>
			<div className='mb-4 flex justify-between gap-4'>
				<div className='space-y-2'>
					<Skeleton className='h-4 w-24' />
					<Skeleton className='h-6 w-40' />
				</div>
				<Skeleton className='h-7 w-28' />
			</div>
			<div className='grid gap-2 sm:grid-cols-2'>
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton className='h-16' key={index} />
				))}
			</div>
		</section>
	)
}
