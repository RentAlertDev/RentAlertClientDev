import { Skeleton } from '@/shared/ui/skeleton'

export function CalendarViewSkeleton() {
	return (
		<div className='space-y-5'>
			<section className='rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4'>
				<div className='mb-5 flex justify-between'><Skeleton className='h-7 w-36' /><div className='flex gap-2'><Skeleton className='size-9' /><Skeleton className='size-9' /></div></div>
				<div className='grid grid-cols-7 gap-1.5'>{Array.from({ length: 49 }).map((_, index) => <Skeleton className={index < 7 ? 'h-5' : 'aspect-square rounded-lg'} key={index} />)}</div>
			</section>
			<Skeleton className='h-5 w-52' />
			<Skeleton className='h-24 w-full' />
		</div>
	)
}
