'use client'

import { useProfile } from '@/modules/profile'
import { useCurrencyRatesQuery } from '@/modules/currency-rate'
import { useUserFiltersQuery } from '@/modules/user-filter'
import { Card, CardContent } from '@/shared/ui/card'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import {
	ProfileFilters,
	ProfileFiltersSkeleton
} from '@/widgets/profile-filters'
import {
	ProfileOverview,
	ProfileOverviewSkeleton
} from '@/widgets/profile-overview'
import {
	CurrencyRatesCard,
	CurrencyRatesSkeleton
} from '@/widgets/currency-rates'
import { LanguageSettingsCard } from '@/widgets/language-settings'

export default function ProfilePage() {
	const profileQuery = useProfile()
	const currencyRatesQuery = useCurrencyRatesQuery()
	const userFiltersQuery = useUserFiltersQuery()
	const isPageLoading =
		profileQuery.isPending ||
		currencyRatesQuery.isPending ||
		userFiltersQuery.isPending

	return (
		<main className='min-h-dvh bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-5 pb-[calc(24px+env(safe-area-inset-bottom))]'>
				{isPageLoading ? (
					<>
						<ProfileOverviewSkeleton />
						<CurrencyRatesSkeleton />
						<ProfileFiltersSkeleton />
					</>
				) : null}

				{profileQuery.isError ? (
					<Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'>
						<CardContent>
							<div className='font-semibold'>Не удалось загрузить профиль</div>
							<p className='mt-1 text-sm'>{getApiErrorMessage(profileQuery.error, 'Попробуйте ещё раз.')}</p>
						</CardContent>
					</Card>
				) : null}

				{!isPageLoading && profileQuery.data ? (
					<>
						<ProfileOverview profile={profileQuery.data} />
						<LanguageSettingsCard />
						{currencyRatesQuery.data ? (
							<CurrencyRatesCard data={currencyRatesQuery.data} />
						) : null}
						<ProfileFilters
							filters={userFiltersQuery.data ?? []}
							error={userFiltersQuery.error}
						/>
					</>
				) : null}
			</div>
		</main>
	)
}
