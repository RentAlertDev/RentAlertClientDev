'use client'

import { useState } from 'react'
import { Bell, Bot, MoonStar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { UserProfile } from '@/modules/profile'
import { useAppSettingsQuery } from '@/modules/app-settings'
import { useNotificationSettingsQuery, useUpdateNotificationSettingsMutation, useUpdateProfileSettingsMutation } from '@/modules/profile-settings'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { toast } from '@/shared/ui/toaster'
import { ProfileSettingsSkeleton } from './profile-settings-skeleton'

function timeToInput(value: string | undefined, fallback: string) {
	return value ? value.slice(0, 5) : fallback
}

function inputToTime(value: string) {
	return `${value}:00`
}

function TimeField({ label, onChange, value }: { label: string; onChange: (value: string) => void; value: string }) {
	return (
		<label className='block space-y-1.5'>
			<span className='text-xs font-medium text-[var(--muted)]'>{label}</span>
			<input
				className='h-11 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-center text-sm font-semibold outline-none focus:border-[var(--primary)]'
				onChange={event => onChange(event.target.value)}
				type='time'
				value={value}
			/>
		</label>
	)
}

function ToggleSwitch({ ariaLabel, disabled, enabled, onChange }: { ariaLabel: string; disabled?: boolean; enabled: boolean; onChange: (next: boolean) => void }) {
	return (
		<button
			aria-label={ariaLabel}
			aria-pressed={enabled}
			className='relative -m-2 grid h-11 w-16 shrink-0 place-items-center p-2 disabled:opacity-40'
			data-enabled={enabled}
			disabled={disabled}
			onClick={() => onChange(!enabled)}
			type='button'
		>
			<span className='relative block h-7 w-12 rounded-full bg-[var(--border)] transition-colors data-[enabled=true]:bg-[var(--primary)]' data-enabled={enabled}>
				<span className='absolute left-1 top-1 size-5 rounded-full bg-white shadow transition-transform data-[enabled=true]:translate-x-5' data-enabled={enabled} />
			</span>
		</button>
	)
}

export function ProfileSettingsCard({ profile }: { profile: UserProfile }) {
	const t = useTranslations('settingsAndNotifications.profileSettingsCard')
	const appSettingsQuery = useAppSettingsQuery()
	const notificationsQuery = useNotificationSettingsQuery()
	const profileMutation = useUpdateProfileSettingsMutation()
	const notificationMutation = useUpdateNotificationSettingsMutation()
	const [botStatus, setBotStatus] = useState(profile.botStatus)
	const [isQuietHoursEnabled, setIsQuietHoursEnabled] = useState(Boolean(profile.quietFrom && profile.quietTo))
	const [quietFrom, setQuietFrom] = useState(() => timeToInput(profile.quietFrom, '23:00'))
	const [quietTo, setQuietTo] = useState(() => timeToInput(profile.quietTo, '07:00'))
	const allowedEngines = appSettingsQuery.data?.notificationEngines ?? []
	const channels = notificationsQuery.data ?? []
	const visibleChannels = channels.filter(
		channel => channel.available && allowedEngines.includes(channel.engine)
	)
	const isLoading = appSettingsQuery.isPending || notificationsQuery.isPending
	const error = appSettingsQuery.error ?? notificationsQuery.error

	if (isLoading) return <ProfileSettingsSkeleton />

	async function saveQuietHours() {
		try {
			await profileMutation.mutateAsync({ botStatus, quietFrom: inputToTime(quietFrom), quietTo: inputToTime(quietTo) })
			toast.success(t('quietHours.savedToast'))
		} catch (mutationError) {
			toast.error(getApiErrorMessage(mutationError, t('quietHours.saveErrorFallback')))
		}
	}

	async function toggleQuietHours(enabled: boolean) {
		const previouslyEnabled = isQuietHoursEnabled
		setIsQuietHoursEnabled(enabled)
		try {
			await profileMutation.mutateAsync({
				botStatus,
				quietFrom: enabled ? inputToTime(quietFrom) : null,
				quietTo: enabled ? inputToTime(quietTo) : null
			})
			toast.success(enabled ? t('quietHours.enabledToast') : t('quietHours.disabledToast'))
		} catch (mutationError) {
			setIsQuietHoursEnabled(previouslyEnabled)
			toast.error(getApiErrorMessage(mutationError, t('quietHours.toggleErrorFallback')))
		}
	}

	async function changeBotStatus(nextStatus: string) {
		const previousStatus = botStatus
		setBotStatus(nextStatus)
		try {
			await profileMutation.mutateAsync({
				botStatus: nextStatus,
				quietFrom: isQuietHoursEnabled ? inputToTime(quietFrom) : null,
				quietTo: isQuietHoursEnabled ? inputToTime(quietTo) : null
			})
			toast.success(t('botStatus.updatedToast'))
		} catch (mutationError) {
			setBotStatus(previousStatus)
			toast.error(getApiErrorMessage(mutationError, t('botStatus.errorFallback')))
		}
	}

	async function updateChannel(engine: string, enabled: boolean, makeDefault = false) {
		const enabledEngines = channels
			.filter(channel => allowedEngines.includes(channel.engine) && (channel.engine === engine ? enabled : channel.enabled))
			.map(channel => channel.engine)
		const currentDefault = channels.find(channel => channel.default && enabledEngines.includes(channel.engine))?.engine
		const defaultEngine = makeDefault ? engine : currentDefault ?? enabledEngines[0]
		try {
			await notificationMutation.mutateAsync({ enabledEngines, ...(defaultEngine ? { defaultEngine } : {}) })
			toast.success(t('channels.updatedToast'))
		} catch (mutationError) {
			toast.error(getApiErrorMessage(mutationError, t('channels.errorFallback')))
		}
	}

	function engineLabel(engine: string) {
		return t.has(`channels.engines.${engine}`) ? t(`channels.engines.${engine}`) : engine
	}

	return (
		<Card as='section' className='shadow-none'>
			<CardContent className='space-y-6'>
				{error ? (
					<div className='rounded-md border border-[var(--danger-border)] bg-[var(--danger-bg)] p-3 text-sm text-[var(--danger-text)]'>
						{getApiErrorMessage(error, t('loadError'))}
					</div>
				) : null}

				<div className='space-y-3'>
					<div>
						<div className='flex items-center gap-2 text-sm font-medium text-[var(--muted)]'>
							<Bot aria-hidden className='size-4' />
							{t('botSettings.eyebrow')}
						</div>
						<h2 className='mt-1 text-xl font-semibold'>{t('botSettings.heading')}</h2>
					</div>

					<div className='rounded-lg border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
						<div className='flex items-center justify-between gap-3'>
							<div className='flex items-center gap-2'>
								<MoonStar aria-hidden className='size-5 text-[var(--primary)]' />
								<div>
									<div className='font-semibold'>{t('quietHours.title')}</div>
									<div className='text-xs text-[var(--muted)]'>
										{isQuietHoursEnabled ? t('quietHours.enabledDescription') : t('quietHours.disabledDescription')}
									</div>
								</div>
							</div>
							<ToggleSwitch
								ariaLabel={isQuietHoursEnabled ? t('quietHours.disableAria') : t('quietHours.enableAria')}
								disabled={profileMutation.isPending}
								enabled={isQuietHoursEnabled}
								onChange={toggleQuietHours}
							/>
						</div>

						{isQuietHoursEnabled ? (
							<div className='mt-4'>
								<div className='grid grid-cols-2 gap-3'>
									<TimeField label={t('quietHours.fromLabel')} onChange={setQuietFrom} value={quietFrom} />
									<TimeField label={t('quietHours.toLabel')} onChange={setQuietTo} value={quietTo} />
								</div>
								<Button className='mt-3 w-full' disabled={profileMutation.isPending} onClick={saveQuietHours}>
									{profileMutation.isPending ? t('quietHours.savingButton') : t('quietHours.saveButton')}
								</Button>
							</div>
						) : null}

						<label className='mt-4 block space-y-1.5 border-t border-[var(--card-border)] pt-3'>
							<span className='flex items-center gap-1.5 text-xs font-medium text-[var(--muted)]'>
								<Bot aria-hidden className='size-3.5' />
								{t('botStatus.label')}
							</span>
							<select
								className='h-11 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-sm'
								disabled={profileMutation.isPending}
								onChange={event => void changeBotStatus(event.target.value)}
								value={botStatus}
							>
								{(appSettingsQuery.data?.botStatuses ?? []).map(status => (
									<option key={status} value={status}>{t.has(`botStatus.options.${status}`) ? t(`botStatus.options.${status}`) : status}</option>
								))}
							</select>
						</label>
					</div>
				</div>

				<div className='space-y-3'>
					<div>
						<div className='flex items-center gap-2 text-sm font-medium text-[var(--muted)]'>
							<Bell aria-hidden className='size-4' />
							{t('notifications.eyebrow')}
						</div>
						<h2 className='mt-1 text-xl font-semibold'>{t('notifications.heading')}</h2>
					</div>

					<div className='space-y-2'>
						{visibleChannels.length ? visibleChannels.map(channel => (
							<div className='flex items-center justify-between gap-3 rounded-lg border border-[var(--card-border)] bg-[var(--card-muted)] p-3' key={channel.engine}>
								<div className='min-w-0'>
									<div className='font-semibold'>{engineLabel(channel.engine)}</div>
									<div className='text-xs text-[var(--muted)]'>
										{channel.enabled ? t('channels.enabledStatus') : t('channels.disabledStatus')}
									</div>
								</div>
								<div className='flex items-center gap-1'>
									{channel.enabled ? (
										<button
											className='rounded-md px-2 py-2 text-xs font-semibold text-[var(--primary)] disabled:opacity-50'
											disabled={channel.default || notificationMutation.isPending}
											onClick={() => updateChannel(channel.engine, true, true)}
											type='button'
										>
											{channel.default ? t('channels.defaultButton') : t('channels.makeDefaultButton')}
										</button>
									) : null}
									<ToggleSwitch
										ariaLabel={channel.enabled ? t('channels.toggleAriaDisable', { label: engineLabel(channel.engine) }) : t('channels.toggleAriaEnable', { label: engineLabel(channel.engine) })}
										disabled={notificationMutation.isPending}
										enabled={channel.enabled}
										onChange={next => updateChannel(channel.engine, next)}
									/>
								</div>
							</div>
						)) : (
							<div className='rounded-md border border-dashed border-[var(--card-border)] p-4 text-center text-sm text-[var(--muted)]'>
								{t('channels.emptyState')}
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
