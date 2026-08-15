'use client'

import { useState } from 'react'
import { CalendarDays, CircleCheck, Eye, LockKeyhole, MessageCircle, SearchCheck } from 'lucide-react'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { cn } from '@/shared/lib/utils'
import { toast } from '@/shared/ui/toaster'
import { useUpdateFavoriteStatusMutation } from '../hooks/use-update-favorite-status-mutation'
import { getSafeStatusColor } from '../model/get-status-color'
import { FavoriteStatusName, type FavoriteListing, type FavoriteStatusOption } from '../model/types'

interface FavoriteStatusControlProps { favorite: FavoriteListing; statuses: FavoriteStatusOption[] }

const statusIcons = {
	[FavoriteStatusName.Interested]: Eye,
	[FavoriteStatusName.WaitingResponse]: MessageCircle,
	[FavoriteStatusName.ViewingScheduled]: CalendarDays,
	[FavoriteStatusName.Reserved]: LockKeyhole,
	[FavoriteStatusName.Viewed]: SearchCheck,
	[FavoriteStatusName.Agreed]: CircleCheck
}

function toLocalInputValue(value?: string) {
	if (!value) return ''
	const date = new Date(value)
	return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16)
}

export function FavoriteStatusControl({ favorite, statuses }: FavoriteStatusControlProps) {
	const mutation = useUpdateFavoriteStatusMutation()
	const activeColor = getSafeStatusColor(favorite.status?.color)
	const [isViewingFormOpen, setIsViewingFormOpen] = useState(false)
	const [viewingDate, setViewingDate] = useState(() => toLocalInputValue(favorite.viewingDate))

	function updateStatus(option: FavoriteStatusOption, date?: string) {
		mutation.mutate({
			data: { listingStatusId: option.id, ...(date ? { viewingDate: new Date(date).toISOString() } : {}) },
			listingId: favorite.listing.id
		}, {
			onError: error => toast.error(getApiErrorMessage(error, 'Не удалось обновить статус')),
			onSuccess: () => { setIsViewingFormOpen(false); toast.success('Статус обновлён') }
		})
	}

	return (
		<div className='rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
			<div className='mb-2 text-xs font-medium text-[var(--muted)]'>Изменить статус</div>
			<div className='flex flex-wrap gap-2'>
				{statuses.map(option => {
					const Icon = statusIcons[option.name]
					const isCurrent = favorite.status?.name === option.name
					return (
						<button aria-pressed={isCurrent} className={cn('inline-flex min-h-8 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition active:scale-[.98] disabled:pointer-events-none disabled:opacity-60', isCurrent ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]' : 'border-[var(--card-border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)]')} disabled={mutation.isPending} key={option.name} onClick={() => {
							if (option.name === FavoriteStatusName.ViewingScheduled) { setIsViewingFormOpen(true); return }
							if (!isCurrent) updateStatus(option)
						}} style={isCurrent && activeColor ? { backgroundColor: `color-mix(in srgb, ${activeColor} 20%, var(--card))`, borderColor: activeColor, boxShadow: `0 0 0 1px color-mix(in srgb, ${activeColor} 35%, transparent)`, color: `color-mix(in srgb, ${activeColor} 72%, var(--foreground))` } : undefined} type='button'>
							<Icon aria-hidden className='size-3.5' />{option.description}
						</button>
					)
				})}
			</div>
			{isViewingFormOpen ? (
				<div className='mt-3 rounded-md border border-[var(--card-border)] bg-[var(--card)] p-3'>
					<label className='block space-y-2'><span className='text-xs font-semibold'>Дата и время просмотра</span><input className='h-10 w-full rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] px-3 text-sm outline-none focus:border-[var(--primary)]' onChange={event => setViewingDate(event.target.value)} type='datetime-local' value={viewingDate} /></label>
					<button className='mt-3 inline-flex h-9 w-full items-center justify-center rounded-md bg-[var(--primary)] px-3 text-sm font-semibold text-[var(--primary-foreground)] disabled:opacity-50' disabled={!viewingDate || mutation.isPending} onClick={() => { const option = statuses.find(status => status.name === FavoriteStatusName.ViewingScheduled); if (option) updateStatus(option, viewingDate) }} type='button'>Применить</button>
				</div>
			) : null}
		</div>
	)
}
