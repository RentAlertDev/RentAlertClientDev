import { ProfileFilters } from '@/widgets/profile-filters'
import { ProfileOverview } from '@/widgets/profile-overview'

export default function ProfilePage() {
	return (
		<main className='min-h-dvh bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-5'>
				<ProfileOverview />
				<ProfileFilters />
			</div>
		</main>
	)
}
