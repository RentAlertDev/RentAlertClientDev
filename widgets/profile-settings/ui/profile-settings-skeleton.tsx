import { Skeleton } from '@/shared/ui/skeleton'

export function ProfileSettingsSkeleton() {
	return <section className='rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4'><div className='mb-4 flex items-center gap-3'><Skeleton className='size-10 rounded-full' /><div className='space-y-2'><Skeleton className='h-5 w-44' /><Skeleton className='h-3 w-56' /></div></div><div className='grid gap-3 sm:grid-cols-2'><Skeleton className='h-28' /><Skeleton className='h-28' /></div></section>
}
