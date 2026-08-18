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
import { HiddenListingsNavCard } from '@/widgets/hidden-listings-nav-card'
import { LanguageSettingsCard } from '@/widgets/language-settings'
import { ProfileSettingsCard } from '@/widgets/profile-settings'

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
						<ProfileFiltersSkeleton />
						<CurrencyRatesSkeleton />
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
						<ProfileSettingsCard profile={profileQuery.data} />
						<HiddenListingsNavCard />
						<LanguageSettingsCard />
						<ProfileFilters
							filters={userFiltersQuery.data ?? []}
							error={userFiltersQuery.error}
						/>
						{currencyRatesQuery.data ? (
							<CurrencyRatesCard data={currencyRatesQuery.data} key={currencyRatesQuery.data.rateDate} />
						) : null}
					</>
				) : null}
			</div>
		</main>
	)
}
