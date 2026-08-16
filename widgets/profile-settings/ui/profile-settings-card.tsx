'use client'

import { useState } from 'react'
import { Bell, Bot, MoonStar } from 'lucide-react'
import type { UserProfile } from '@/modules/profile'
import { useAppSettingsQuery } from '@/modules/app-settings'
import { useNotificationSettingsQuery, useUpdateNotificationSettingsMutation, useUpdateProfileSettingsMutation } from '@/modules/profile-settings'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { toast } from '@/shared/ui/toaster'
import { ProfileSettingsSkeleton } from './profile-settings-skeleton'

const engineLabels: Record<string, string> = { EMAIL: 'Email', PUSH: 'Push', SMS: 'SMS', TELEGRAM_ADMIN: 'Telegram Admin', TELEGRAM_BOT: 'Telegram-бот' }
const botStatusLabels: Record<string, string> = { ACTIVE: 'Активен', PAUSED: 'Приостановлен', STOPPED: 'Остановлен' }

function timeToInput(value: string | undefined, fallback: string) {
	return value ? value.slice(0, 5) : fallback
}

function inputToTime(value: string) {
	return `${value}:00`
}

function TimeField({ label, onChange, value }: { label: string; onChange: (value: string) => void; value: string }) {
	const [hour = '00', minute = '00'] = value.split(':')
	const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'))
	const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'))
	return <fieldset className='space-y-1.5'><legend className='text-xs font-medium text-[var(--muted)]'>{label}</legend><div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2'><select aria-label={`${label}: часы`} className='h-10 rounded-md border border-[var(--card-border)] bg-[var(--card)] px-2 text-center text-sm font-semibold outline-none focus:border-[var(--primary)]' onChange={event => onChange(`${event.target.value}:${minute}`)} value={hour}>{hours.map(option => <option key={option} value={option}>{option}</option>)}</select><span className='font-semibold text-[var(--muted)]'>:</span><select aria-label={`${label}: минуты`} className='h-10 rounded-md border border-[var(--card-border)] bg-[var(--card)] px-2 text-center text-sm font-semibold outline-none focus:border-[var(--primary)]' onChange={event => onChange(`${hour}:${event.target.value}`)} value={minute}>{minutes.map(option => <option key={option} value={option}>{option}</option>)}</select></div></fieldset>
}

export function ProfileSettingsCard({ profile }: { profile: UserProfile }) {
	const appSettingsQuery = useAppSettingsQuery()
	const notificationsQuery = useNotificationSettingsQuery()
	const profileMutation = useUpdateProfileSettingsMutation()
	const notificationMutation = useUpdateNotificationSettingsMutation()
	const [botStatus, setBotStatus] = useState(profile.botStatus)
	const [isQuietHoursEnabled, setIsQuietHoursEnabled] = useState(Boolean(profile.quietFrom && profile.quietTo))
	const [quietFrom, setQuietFrom] = useState(() => timeToInput(profile.quietFrom, '23:00'))
	const [quietTo, setQuietTo] = useState(() => timeToInput(profile.quietTo, '07:00'))
	const channels = notificationsQuery.data ?? []
	const allowedEngines = appSettingsQuery.data?.notificationEngines ?? []
	const isLoading = appSettingsQuery.isPending || notificationsQuery.isPending
	const error = appSettingsQuery.error ?? notificationsQuery.error

	if (isLoading) return <ProfileSettingsSkeleton />

	async function saveQuietHours() {
		try {
			await profileMutation.mutateAsync({ botStatus, quietFrom: inputToTime(quietFrom), quietTo: inputToTime(quietTo) })
			setIsQuietHoursEnabled(true)
			toast.success('Настройки тихого часа сохранены')
		} catch (mutationError) {
			toast.error(getApiErrorMessage(mutationError, 'Не удалось сохранить настройки'))
		}
	}

	async function toggleQuietHours(enabled: boolean) {
		if (enabled) {
			setIsQuietHoursEnabled(true)
			return
		}

		try {
			await profileMutation.mutateAsync({ botStatus, quietFrom: null, quietTo: null })
			setIsQuietHoursEnabled(false)
			toast.success('Тихий час выключен — уведомления будут приходить всегда')
		} catch (mutationError) {
			toast.error(getApiErrorMessage(mutationError, 'Не удалось выключить тихий час'))
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
			toast.success('Статус бота обновлён')
		} catch (mutationError) {
			setBotStatus(previousStatus)
			toast.error(getApiErrorMessage(mutationError, 'Не удалось изменить статус бота'))
		}
	}

	async function updateChannel(engine: string, enabled: boolean, makeDefault = false) {
		const enabledEngines = channels.filter(channel => allowedEngines.includes(channel.engine) && (channel.engine === engine ? enabled : channel.enabled)).map(channel => channel.engine)
		const currentDefault = channels.find(channel => channel.default && enabledEngines.includes(channel.engine))?.engine
		const defaultEngine = makeDefault ? engine : currentDefault ?? enabledEngines[0]
		try {
			await notificationMutation.mutateAsync({ enabledEngines, ...(defaultEngine ? { defaultEngine } : {}) })
			toast.success('Настройки уведомлений обновлены')
		} catch (mutationError) {
			toast.error(getApiErrorMessage(mutationError, 'Не удалось обновить уведомления'))
		}
	}

	return (
		<Card as='section' className='shadow-none'>
			<CardContent className='space-y-5'>
				<div><div className='flex items-center gap-2 text-sm font-medium text-[var(--muted)]'><Bell aria-hidden className='size-4' />Уведомления</div><h2 className='mt-1 text-xl font-semibold'>Настройки доставки</h2></div>
				{error ? <div className='rounded-md border border-[var(--danger-border)] bg-[var(--danger-bg)] p-3 text-sm text-[var(--danger-text)]'>{getApiErrorMessage(error, 'Не удалось загрузить настройки.')}</div> : null}
				<div className='rounded-lg border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
					<div className='flex items-center justify-between gap-3'><div className='flex items-center gap-2'><MoonStar aria-hidden className='size-5 text-[var(--primary)]' /><div><div className='font-semibold'>Тихий час</div><div className='text-xs text-[var(--muted)]'>{isQuietHoursEnabled ? 'Уведомления приостановлены в выбранный период' : 'Выключен — уведомления приходят всегда'}</div></div></div><button aria-label={isQuietHoursEnabled ? 'Выключить тихий час' : 'Включить тихий час'} aria-pressed={isQuietHoursEnabled} className='relative h-7 w-12 shrink-0 rounded-full bg-[var(--border)] transition data-[enabled=true]:bg-[var(--primary)] disabled:opacity-50' data-enabled={isQuietHoursEnabled} disabled={profileMutation.isPending} onClick={() => toggleQuietHours(!isQuietHoursEnabled)} type='button'><span className='absolute left-1 top-1 size-5 rounded-full bg-white shadow transition-transform data-[enabled=true]:translate-x-5' data-enabled={isQuietHoursEnabled} /></button></div>
					{isQuietHoursEnabled ? <div className='mt-4'><div className='grid grid-cols-2 gap-3'><TimeField label='Начало' onChange={setQuietFrom} value={quietFrom} /><TimeField label='Окончание' onChange={setQuietTo} value={quietTo} /></div><Button className='mt-3 w-full' disabled={profileMutation.isPending} onClick={saveQuietHours}>{profileMutation.isPending ? 'Применяем…' : 'Применить'}</Button></div> : null}
					<label className='mt-4 block space-y-1.5 border-t border-[var(--card-border)] pt-3'><span className='flex items-center gap-1.5 text-xs font-medium text-[var(--muted)]'><Bot aria-hidden className='size-3.5' />Статус бота</span><select className='h-10 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-sm' disabled={profileMutation.isPending} onChange={event => void changeBotStatus(event.target.value)} value={botStatus}>{(appSettingsQuery.data?.botStatuses ?? []).map(status => <option key={status} value={status}>{botStatusLabels[status] ?? status}</option>)}</select></label>
				</div>
				<div className='space-y-2'>{channels.length ? channels.map(channel => { const canUse = channel.available && allowedEngines.includes(channel.engine); return <div className='flex items-center justify-between gap-3 rounded-lg border border-[var(--card-border)] bg-[var(--card-muted)] p-3' key={channel.engine}><div className='min-w-0'><div className='font-semibold'>{engineLabels[channel.engine] ?? channel.engine}</div><div className='text-xs text-[var(--muted)]'>{canUse ? channel.enabled ? 'Уведомления включены' : 'Уведомления выключены' : 'Канал пока недоступен'}</div></div><div className='flex items-center gap-2'>{channel.enabled ? <button className='rounded-md px-2 py-1 text-xs font-semibold text-[var(--primary)] disabled:opacity-50' disabled={channel.default || notificationMutation.isPending || !canUse} onClick={() => updateChannel(channel.engine, true, true)} type='button'>{channel.default ? 'По умолчанию' : 'Сделать основным'}</button> : null}<button aria-label={`${channel.enabled ? 'Выключить' : 'Включить'} ${engineLabels[channel.engine] ?? channel.engine}`} aria-pressed={channel.enabled} className='relative h-7 w-12 rounded-full bg-[var(--border)] transition data-[enabled=true]:bg-[var(--primary)] disabled:opacity-40' data-enabled={channel.enabled} disabled={!canUse || notificationMutation.isPending} onClick={() => updateChannel(channel.engine, !channel.enabled)} type='button'><span className='absolute left-1 top-1 size-5 rounded-full bg-white shadow transition-transform data-[enabled=true]:translate-x-5' data-enabled={channel.enabled} /></button></div></div> }) : <div className='rounded-md border border-dashed border-[var(--card-border)] p-4 text-center text-sm text-[var(--muted)]'>Доступных каналов уведомлений пока нет.</div>}</div>
			</CardContent>
		</Card>
	)
}
