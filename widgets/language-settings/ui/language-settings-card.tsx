'use client'

import { useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { Languages } from 'lucide-react'
import { LANGUAGE_OPTIONS, type LanguagePreference } from '@/shared/config/language'
import { getLanguagePreference, LANGUAGE_CHANGE_EVENT, saveLanguagePreference } from '@/shared/lib/language-preference'
import { Card, CardContent } from '@/shared/ui/card'

export function LanguageSettingsCard() {
	const t = useTranslations('settingsAndNotifications.languageSettingsCard')
	const preference = useSyncExternalStore(
		listener => {
			window.addEventListener(LANGUAGE_CHANGE_EVENT, listener)
			return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, listener)
		},
		getLanguagePreference,
		() => 'system'
	)
	const queryClient = useQueryClient()
	const router = useRouter()

	function handleChange(nextPreference: LanguagePreference) {
		saveLanguagePreference(nextPreference)
		void queryClient.invalidateQueries()
		router.refresh()
	}

	return (
		<Card as='section' className='shadow-none'>
			<CardContent className='flex items-center justify-between gap-4'>
				<div className='flex min-w-0 items-center gap-3'>
					<div className='grid size-10 shrink-0 place-items-center rounded-full bg-[var(--card-muted)] text-[var(--primary)]'><Languages aria-hidden className='size-5' /></div>
					<div><h2 className='font-semibold'>{t('title')}</h2><p className='text-xs text-[var(--muted)]'>{t('subtitle')}</p></div>
				</div>
				<select aria-label={t('selectAriaLabel')} className='h-10 max-w-40 rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] px-3 text-sm font-medium outline-none focus:border-[var(--primary)]' onChange={event => handleChange(event.target.value as LanguagePreference)} value={preference}>
					{LANGUAGE_OPTIONS.map(option => <option key={option.value} value={option.value}>{t(`options.${option.value}`)}</option>)}
				</select>
			</CardContent>
		</Card>
	)
}
