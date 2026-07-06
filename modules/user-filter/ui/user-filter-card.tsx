import { CalendarDays, CheckCircle2, Pencil, Power, Trash2 } from 'lucide-react'
import { IconButton } from '@/shared/ui/icon-button'
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
		<article className='rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
			<div className='flex items-start justify-between gap-3'>
				<div className='min-w-0'>
					<div className='flex min-w-0 items-center gap-2'>
						<h3 className='truncate text-base font-semibold'>
							Фильтр #{filter.id}
						</h3>
						{filter.active ? (
							<span className='inline-flex shrink-0 items-center gap-1 rounded-md bg-[var(--success-bg)] px-2 py-1 text-xs font-semibold leading-none text-[var(--success-text)]'>
								<CheckCircle2
									aria-hidden
									className='size-3.5'
								/>
								Активен
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
					value={formatFilterPrice(filter)}
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
