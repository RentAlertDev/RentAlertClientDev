'use client'

import { useSyncExternalStore } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Languages } from 'lucide-react'
import { LANGUAGE_OPTIONS, type LanguagePreference } from '@/shared/config/language'
import { getLanguagePreference, LANGUAGE_CHANGE_EVENT, saveLanguagePreference } from '@/shared/lib/language-preference'
import { Card, CardContent } from '@/shared/ui/card'

export function LanguageSettingsCard() {
	const preference = useSyncExternalStore(
		listener => {
			window.addEventListener(LANGUAGE_CHANGE_EVENT, listener)
			return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, listener)
		},
		getLanguagePreference,
		() => 'system'
	)
	const queryClient = useQueryClient()

	function handleChange(nextPreference: LanguagePreference) {
		saveLanguagePreference(nextPreference)
		void queryClient.invalidateQueries()
	}

	return (
		<Card as='section' className='shadow-none'>
			<CardContent className='flex items-center justify-between gap-4'>
				<div className='flex min-w-0 items-center gap-3'>
					<div className='grid size-10 shrink-0 place-items-center rounded-full bg-[var(--card-muted)] text-[var(--primary)]'><Languages aria-hidden className='size-5' /></div>
					<div><h2 className='font-semibold'>Язык</h2><p className='text-xs text-[var(--muted)]'>Для сообщений сервера</p></div>
				</div>
				<select aria-label='Выбрать язык' className='h-10 max-w-40 rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] px-3 text-sm font-medium outline-none focus:border-[var(--primary)]' onChange={event => handleChange(event.target.value as LanguagePreference)} value={preference}>
					{LANGUAGE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
				</select>
			</CardContent>
		</Card>
	)
}
