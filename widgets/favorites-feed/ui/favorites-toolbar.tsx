import { ArrowUpDown, Filter } from 'lucide-react'
import {
	FavoriteStatusName,
	type FavoriteStatusOption
} from '@/modules/favorite'

export type FavoritesSortDirection = 'asc' | 'desc'
export type FavoritesSortField = 'createdAt' | 'updatedAt' | 'viewingDate'

interface FavoritesToolbarProps {
	onSortDirectionChange: (direction: FavoritesSortDirection) => void
	onSortFieldChange: (field: FavoritesSortField) => void
	onStatusChange: (status: FavoriteStatusName | '') => void
	sortDirection: FavoritesSortDirection
	sortField: FavoritesSortField
	status: FavoriteStatusName | ''
	statuses: FavoriteStatusOption[]
}

const selectClassName =
	'h-10 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--foreground)] outline-none transition focus:border-[var(--ring)]'

export function FavoritesToolbar({
	onSortDirectionChange,
	onSortFieldChange,
	onStatusChange,
	sortDirection,
	sortField,
	status,
	statuses
}: FavoritesToolbarProps) {
	return (
		<div className='rounded-lg border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
			<div className='mb-3 flex items-center gap-2 text-sm font-semibold'>
				<Filter aria-hidden className='size-4 text-[var(--muted)]' />
				Настроить список
			</div>
			<div className='grid gap-2 sm:grid-cols-[1fr_1fr_150px]'>
				<label className='space-y-1.5'>
					<span className='text-xs font-medium text-[var(--muted)]'>Статус</span>
					<select
						className={selectClassName}
						onChange={event =>
							onStatusChange(event.target.value as FavoriteStatusName | '')
						}
						value={status}
					>
						<option value=''>Все статусы</option>
						{statuses.map(option => (
							<option key={option.id} value={option.name}>
								{option.description}
							</option>
						))}
					</select>
				</label>
				<label className='space-y-1.5'>
					<span className='text-xs font-medium text-[var(--muted)]'>Сортировать по</span>
					<select
						className={selectClassName}
						onChange={event =>
							onSortFieldChange(event.target.value as FavoritesSortField)
						}
						value={sortField}
					>
						<option value='createdAt'>Дате добавления</option>
						<option value='updatedAt'>Дате изменения</option>
						<option value='viewingDate'>Дате просмотра</option>
					</select>
				</label>
				<label className='space-y-1.5'>
					<span className='flex items-center gap-1 text-xs font-medium text-[var(--muted)]'>
						<ArrowUpDown aria-hidden className='size-3' />
						Порядок
					</span>
					<select
						className={selectClassName}
						onChange={event =>
							onSortDirectionChange(
								event.target.value as FavoritesSortDirection
							)
						}
						value={sortDirection}
					>
						<option value='desc'>По убыванию</option>
						<option value='asc'>По возрастанию</option>
					</select>
				</label>
			</div>
		</div>
	)
}
