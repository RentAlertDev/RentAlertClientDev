'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Bell, Clock3, MapPin } from 'lucide-react'
import type { CalendarViewing } from '@/modules/calendar'
import { ReminderModal } from '@/modules/reminder'
import { CurrencySymbol } from '@/shared/ui/currency-symbol'
import { IconButton } from '@/shared/ui/icon-button'

export function CalendarEventCard({ event }: { event: CalendarViewing }) {
	const date = new Date(event.viewingDate)
	const [isReminderModalOpen, setIsReminderModalOpen] = useState(false)

	return (
		<article className='flex gap-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 shadow-[0_8px_24px_var(--card-shadow)]'>
			{event.coverPhotoUrl ? <div className='relative size-20 shrink-0 overflow-hidden rounded-md bg-[var(--image-surface)]'><Image alt='' className='object-cover' fill sizes='80px' src={event.coverPhotoUrl} /></div> : null}
			<div className='min-w-0 flex-1'>
				<div className='flex items-start justify-between gap-3'><h3 className='line-clamp-2 text-sm font-semibold'>{event.title}</h3><div className='shrink-0 text-sm font-semibold tabular-nums'>{new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(event.price)} <CurrencySymbol currency={event.currency} /></div></div>
				<div className='mt-2 flex items-center justify-between gap-3'>
					<div className='flex items-center gap-1.5 text-xs font-medium text-[var(--primary)]'><Clock3 aria-hidden className='size-3.5' />{new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' }).format(date)}</div>
					<IconButton className='size-8' label='Напоминания о просмотре' onClick={() => setIsReminderModalOpen(true)}><Bell aria-hidden className='size-4' /></IconButton>
				</div>
				<div className='mt-1 flex items-center gap-1.5 text-xs text-[var(--muted)]'><MapPin aria-hidden className='size-3.5 shrink-0' /><span className='truncate'>{event.address}</span></div>
			</div>

			<ReminderModal
				isOpen={isReminderModalOpen}
				listingId={event.listingId}
				listingTitle={event.title}
				onClose={() => setIsReminderModalOpen(false)}
			/>
		</article>
	)
}
