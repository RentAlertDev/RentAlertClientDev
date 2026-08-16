import { CalendarDays, CheckCircle2, Pencil, Power, Trash2 } from 'lucide-react'
import { IconButton } from '@/shared/ui/icon-button'
import { CurrencySymbol } from '@/shared/ui/currency-symbol'
import { cn } from '@/shared/lib/utils'
import {
	formatFilterArea,
	formatFilterDate,
	formatFilterPrice,
	formatFilterRooms
} from '../model/formatters'
import type { UserFilter } from '../model/types'
import { UserFilterValue } from './user-filter-value'

interface UserFilterCardProps {
	filter: UserFilter
	isActionPending?: boolean
	onDelete: (filter: UserFilter) => void
	onEdit: (filter: UserFilter) => void
	onToggleActivation: (filter: UserFilter) => void
}

export function UserFilterCard({
	filter,
	isActionPending,
	onDelete,
	onEdit,
	onToggleActivation
}: UserFilterCardProps) {
	const dateLabel =
		formatFilterDate(filter.updatedAt) ?? formatFilterDate(filter.createdAt)

	return (
		<article
			className={cn(
				'rounded-md border bg-[var(--card-muted)] p-3 transition-colors',
				filter.active
					? 'border-[var(--success-border)]'
					: 'border-[var(--card-border)]'
			)}
		>
			<div className='flex items-start justify-between gap-3'>
				<div className='min-w-0'>
					<div className='flex min-w-0 items-center gap-2'>
						<h3 className='truncate text-base font-semibold'>
							Фильтр #{filter.id}
						</h3>
						{filter.active ? (
							<span
								aria-label='Активный фильтр'
								className='inline-grid size-6 shrink-0 place-items-center rounded-full border border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--success-text)]'
								title='Активный фильтр'
							>
								<CheckCircle2
									aria-hidden
									className='size-4'
								/>
							</span>
						) : null}
					</div>
					{dateLabel ? (
						<div className='mt-1 flex items-center gap-1.5 text-xs text-[var(--muted)]'>
							<CalendarDays aria-hidden className='size-3.5' />
							{dateLabel}
						</div>
					) : null}
				</div>

				<div className='flex shrink-0 gap-1'>
					<IconButton
						className='size-9'
						disabled={isActionPending}
						label={filter.active ? 'Отключить' : 'Применить'}
						onClick={() => onToggleActivation(filter)}
						variant={filter.active ? 'surface' : 'primary'}
					>
						<Power aria-hidden className='size-4' />
					</IconButton>
					<IconButton
						className='size-9'
						disabled={isActionPending}
						label='Редактировать'
						onClick={() => onEdit(filter)}
					>
						<Pencil aria-hidden className='size-4' />
					</IconButton>
					<IconButton
						className='size-9'
						disabled={isActionPending}
						label='Удалить'
						onClick={() => onDelete(filter)}
						variant='danger'
					>
						<Trash2 aria-hidden className='size-4' />
					</IconButton>
				</div>
			</div>

			<div className='mt-3 grid grid-cols-3 gap-3'>
				<UserFilterValue
					label='Цена'
					value={<span className='inline-flex items-baseline gap-1'>{formatFilterPrice(filter)} <CurrencySymbol currency={filter.currency ?? 'USD'} /></span>}
				/>
				<UserFilterValue
					label='Комнаты'
					value={formatFilterRooms(filter)}
				/>
				<UserFilterValue
					label='Площадь'
					value={formatFilterArea(filter)}
				/>
			</div>
		</article>
	)
}
