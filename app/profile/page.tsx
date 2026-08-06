'use client'

import { useProfile } from '@/modules/profile'
import { useUserFiltersQuery } from '@/modules/user-filter'
import { Card, CardContent } from '@/shared/ui/card'
import {
	ProfileFilters,
	ProfileFiltersSkeleton
} from '@/widgets/profile-filters'
import {
	ProfileOverview,
	ProfileOverviewSkeleton
} from '@/widgets/profile-overview'

export default function ProfilePage() {
	const profileQuery = useProfile()
	const userFiltersQuery = useUserFiltersQuery()
	const isPageLoading = profileQuery.isPending || userFiltersQuery.isPending

	return (
		<main className='min-h-dvh bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-5 pb-[calc(24px+env(safe-area-inset-bottom))]'>
				{isPageLoading ? (
					<>
						<ProfileOverviewSkeleton />
						<ProfileFiltersSkeleton />
					</>
				) : null}

				{profileQuery.isError ? (
					<Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'>
						<CardContent>
							<div className='font-semibold'>
								Не получилось загрузить профиль
							</div>
							<p className='mt-1 text-sm'>
								Открой приложение заново и попробуй еще раз.
							</p>
						</CardContent>
					</Card>
				) : null}

				{!isPageLoading && profileQuery.data ? (
					<>
						<ProfileOverview profile={profileQuery.data} />
						<ProfileFilters
							filters={userFiltersQuery.data ?? []}
							isError={userFiltersQuery.isError}
						/>
					</>
				) : null}
			</div>
		</main>
	)
}
