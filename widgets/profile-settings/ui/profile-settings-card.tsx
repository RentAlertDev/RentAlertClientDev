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

function timeToInput(value: { hour: number; minute: number } | undefined, fallback: string) {
	return value ? `${String(value.hour).padStart(2, '0')}:${String(value.minute).padStart(2, '0')}` : fallback
}

function inputToTime(value: string) {
	const [hour, minute] = value.split(':').map(Number)
	return { hour, minute, second: 0, nano: 0 }
}

export function ProfileSettingsCard({ profile }: { profile: UserProfile }) {
	const appSettingsQuery = useAppSettingsQuery()
	const notificationsQuery = useNotificationSettingsQuery()
	const profileMutation = useUpdateProfileSettingsMutation()
	const notificationMutation = useUpdateNotificationSettingsMutation()
	const [botStatus, setBotStatus] = useState(profile.botStatus)
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
			toast.success('Настройки тихого часа сохранены')
		} catch (mutationError) {
			toast.error(getApiErrorMessage(mutationError, 'Не удалось сохранить настройки'))
		}
	}

	async function updateChannel(engine: string, enabled: boolean, makeDefault = false) {
		const enabledEngines = channels.filter(channel => channel.enabled && allowedEngines.includes(channel.engine) && channel.engine !== engine).map(channel => channel.engine)
		if (enabled) enabledEngines.push(engine)
		const currentDefault = channels.find(channel => channel.default)?.engine
		const defaultEngine = makeDefault ? engine : currentDefault === engine && !enabled ? undefined : currentDefault
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
					<div className='mb-3 flex items-center gap-2'><MoonStar aria-hidden className='size-5 text-[var(--primary)]' /><div><div className='font-semibold'>Тихий час</div><div className='text-xs text-[var(--muted)]'>В это время новые уведомления не будут беспокоить</div></div></div>
					<div className='grid grid-cols-2 gap-3'><label className='space-y-1.5'><span className='text-xs font-medium text-[var(--muted)]'>Начало</span><input className='h-10 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-sm' onChange={event => setQuietFrom(event.target.value)} type='time' value={quietFrom} /></label><label className='space-y-1.5'><span className='text-xs font-medium text-[var(--muted)]'>Окончание</span><input className='h-10 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-sm' onChange={event => setQuietTo(event.target.value)} type='time' value={quietTo} /></label></div>
					<label className='mt-3 block space-y-1.5'><span className='flex items-center gap-1.5 text-xs font-medium text-[var(--muted)]'><Bot aria-hidden className='size-3.5' />Статус бота</span><select className='h-10 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-sm' onChange={event => setBotStatus(event.target.value)} value={botStatus}>{(appSettingsQuery.data?.botStatuses ?? []).map(status => <option key={status} value={status}>{botStatusLabels[status] ?? status}</option>)}</select></label>
					<Button className='mt-3 w-full' disabled={profileMutation.isPending} onClick={saveQuietHours}>{profileMutation.isPending ? 'Сохраняем…' : 'Сохранить тихий час'}</Button>
				</div>
				<div className='space-y-2'>{channels.length ? channels.map(channel => { const canUse = channel.available && allowedEngines.includes(channel.engine); return <div className='flex items-center justify-between gap-3 rounded-lg border border-[var(--card-border)] bg-[var(--card-muted)] p-3' key={channel.engine}><div className='min-w-0'><div className='font-semibold'>{engineLabels[channel.engine] ?? channel.engine}</div><div className='text-xs text-[var(--muted)]'>{canUse ? channel.enabled ? 'Уведомления включены' : 'Уведомления выключены' : 'Канал пока недоступен'}</div></div><div className='flex items-center gap-2'>{channel.enabled ? <button className='rounded-md px-2 py-1 text-xs font-semibold text-[var(--primary)] disabled:opacity-50' disabled={channel.default || notificationMutation.isPending || !canUse} onClick={() => updateChannel(channel.engine, true, true)} type='button'>{channel.default ? 'По умолчанию' : 'Сделать основным'}</button> : null}<button aria-label={`${channel.enabled ? 'Выключить' : 'Включить'} ${engineLabels[channel.engine] ?? channel.engine}`} aria-pressed={channel.enabled} className='relative h-7 w-12 rounded-full bg-[var(--border)] transition data-[enabled=true]:bg-[var(--primary)] disabled:opacity-40' data-enabled={channel.enabled} disabled={!canUse || notificationMutation.isPending} onClick={() => updateChannel(channel.engine, !channel.enabled)} type='button'><span className='absolute left-1 top-1 size-5 rounded-full bg-white shadow transition-transform data-[enabled=true]:translate-x-5' data-enabled={channel.enabled} /></button></div></div> }) : <div className='rounded-md border border-dashed border-[var(--card-border)] p-4 text-center text-sm text-[var(--muted)]'>Доступных каналов уведомлений пока нет.</div>}</div>
			</CardContent>
		</Card>
	)
}
