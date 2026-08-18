'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useProfile } from '@/modules/profile'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { Card, CardContent } from '@/shared/ui/card'
import { LanguageSettingsCard } from '@/widgets/language-settings'
import { ProfileSettingsCard, ProfileSettingsSkeleton } from '@/widgets/profile-settings'

export function SettingsPage() {
	const t = useTranslations('settingsAndNotifications.settingsPage')
	const profileQuery = useProfile()

	return (
		<main className='min-h-dvh bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-5 pb-[calc(24px+env(safe-area-inset-bottom))]'>
				<header className='space-y-2'>
					<Link
						className='inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]'
						href='/profile'
					>
						<ChevronLeft aria-hidden className='size-4' />
						{t('backLink')}
					</Link>
					<h1 className='text-3xl font-semibold'>{t('heading')}</h1>
					<p className='text-sm text-[var(--muted)]'>{t('subtitle')}</p>
				</header>

				{profileQuery.isPending ? <ProfileSettingsSkeleton /> : null}

				{profileQuery.isError ? (
					<Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'>
						<CardContent>
							<div className='font-semibold'>{t('loadErrorTitle')}</div>
							<p className='mt-1 text-sm'>{getApiErrorMessage(profileQuery.error, t('loadErrorFallback'))}</p>
						</CardContent>
					</Card>
				) : null}

				{profileQuery.data ? <ProfileSettingsCard profile={profileQuery.data} /> : null}

				<LanguageSettingsCard />
			</div>
		</main>
	)
}
