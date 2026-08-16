'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import { addMonths, getCalendarGrid, getMonthKey, getMonthRange, toDateKey, useCalendarSummaryQuery, useCalendarViewingsQuery } from '@/modules/calendar'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { CalendarEventCard } from './calendar-event-card'
import { CalendarViewSkeleton } from './calendar-view-skeleton'

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

function formatViewingCount(count: number) {
	const mod100 = count % 100
	const mod10 = count % 10
	const word = mod100 >= 11 && mod100 <= 14 ? 'просмотров' : mod10 === 1 ? 'просмотр' : mod10 >= 2 && mod10 <= 4 ? 'просмотра' : 'просмотров'
	return `${count} ${word}`
}

export function CalendarView() {
	const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1))
	const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()))
	const range = useMemo(() => getMonthRange(month), [month])
	const grid = useMemo(() => getCalendarGrid(month), [month])
	const eventsQuery = useCalendarViewingsQuery(range)
	const summaryQuery = useCalendarSummaryQuery(getMonthKey(month))
	const markerDates = useMemo(() => new Set((summaryQuery.data ?? []).filter(item => item.count > 0).map(item => item.date)), [summaryQuery.data])
	const selectedEvents = useMemo(() => (eventsQuery.data ?? []).filter(event => toDateKey(new Date(event.viewingDate)) === selectedDate), [eventsQuery.data, selectedDate])
	const today = toDateKey(new Date())
	const monthLabel = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(month)
	const selectedLabel = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(new Date(`${selectedDate}T12:00:00`))
	const isLoading = (eventsQuery.isPending && !eventsQuery.data) || (summaryQuery.isPending && !summaryQuery.data)
	const error = eventsQuery.error ?? summaryQuery.error

	function changeMonth(amount: number) {
		const next = addMonths(month, amount)
		setMonth(next)
		setSelectedDate(toDateKey(new Date(next.getFullYear(), next.getMonth(), 1)))
	}

	return (
		<main className='min-h-dvh bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-5 pb-6'>
				<header className='flex items-center gap-3'><div className='grid size-11 place-items-center rounded-full bg-[var(--card)] text-[var(--primary)] shadow-[0_8px_24px_var(--card-shadow)]'><CalendarDays aria-hidden className='size-5' /></div><div><div className='text-sm font-medium text-[var(--muted)]'>RentAlert</div><h1 className='text-2xl font-semibold'>Календарь просмотров</h1></div></header>
				{isLoading ? <CalendarViewSkeleton /> : error ? <Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'><CardContent><div className='font-semibold'>Не удалось загрузить календарь</div><p className='mt-1 text-sm'>{getApiErrorMessage(error, 'Попробуйте ещё раз.')}</p><Button className='mt-4' onClick={() => { void eventsQuery.refetch(); void summaryQuery.refetch() }} variant='outline'><RefreshCw aria-hidden className='size-4' />Повторить</Button></CardContent></Card> : (
					<>
						<section className='rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 shadow-[0_14px_40px_var(--card-shadow)] sm:p-4'>
							<div className='mb-4 flex items-center justify-between gap-3'><h2 className='capitalize text-lg font-semibold'>{monthLabel}</h2><div className='flex gap-1'><button aria-label='Предыдущий месяц' className='grid size-9 place-items-center rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] text-[var(--muted)] active:scale-95' onClick={() => changeMonth(-1)} type='button'><ChevronLeft className='size-5' /></button><button aria-label='Следующий месяц' className='grid size-9 place-items-center rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] text-[var(--muted)] active:scale-95' onClick={() => changeMonth(1)} type='button'><ChevronRight className='size-5' /></button></div></div>
							<div className='grid grid-cols-7 gap-1.5'>{weekDays.map((day, index) => <div className={cn('py-1 text-center text-[11px] font-semibold text-[var(--muted)]', index > 4 && 'text-[var(--danger-text)]')} key={day}>{day}</div>)}{grid.map(date => { const key = toDateKey(date); const inMonth = date.getMonth() === month.getMonth(); const hasEvents = markerDates.has(key); const isSelected = selectedDate === key; return <button aria-label={key} className={cn('relative aspect-square min-w-0 rounded-lg border text-sm font-semibold transition active:scale-95', inMonth ? 'border-transparent bg-[var(--card-muted)]' : 'border-transparent bg-transparent text-[var(--muted)]/45', key === today && !isSelected && 'border-[var(--primary)]/55', isSelected && 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_8px_20px_var(--card-shadow)]')} disabled={!inMonth} key={key} onClick={() => setSelectedDate(key)} type='button'><span>{date.getDate()}</span>{hasEvents ? <span className={cn('absolute bottom-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full', key < today ? 'bg-[var(--muted)]' : 'bg-[var(--primary)]', isSelected && 'bg-[var(--primary-foreground)]')} /> : null}</button> })}</div>
						</section>
						<div className='flex items-end justify-between gap-4'><div><div className='text-xs font-semibold uppercase tracking-wide text-[var(--muted)]'>Встречи {selectedLabel}</div><div className='mt-1 text-lg font-semibold'>{selectedEvents.length ? formatViewingCount(selectedEvents.length) : 'Нет встреч'}</div></div><div className='text-sm text-[var(--muted)]'>Всего в <span className='capitalize'>{new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(month)}</span>: <strong className='text-[var(--primary)]'>{eventsQuery.data?.length ?? 0}</strong></div></div>
						<div className='grid gap-3'>{selectedEvents.length ? selectedEvents.map(event => <CalendarEventCard event={event} key={`${event.listingId}-${event.viewingDate}`} />) : <div className='rounded-lg border border-dashed border-[var(--card-border)] bg-[var(--card)] px-4 py-8 text-center text-sm text-[var(--muted)]'>На выбранную дату просмотров нет.</div>}</div>
					</>
				)}
			</div>
		</main>
	)
}
