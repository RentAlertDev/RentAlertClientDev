'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import { InfoNote } from '@/shared/ui/info-note'
import { toast } from '@/shared/ui/toaster'
import {
	UserFilterCard,
	UserFilterEmptyState,
	UserFilterFormModal,
	useDeleteUserFilterMutation,
	useSetUserFilterActivationMutation,
	type UserFilter
} from '@/modules/user-filter'

interface ProfileFiltersProps {
	filters: UserFilter[]
	error?: unknown
}

function getErrorMessage(error: unknown) {
	return getApiErrorMessage(error, 'Не удалось выполнить действие')
}

export function ProfileFilters({
	filters: initialFilters,
	error
}: ProfileFiltersProps) {
	const isError = Boolean(error)
	const [editingFilter, setEditingFilter] = useState<UserFilter | null>(null)
	const [deletingFilter, setDeletingFilter] = useState<UserFilter | null>(
		null
	)
	const activationMutation = useSetUserFilterActivationMutation()
	const deleteMutation = useDeleteUserFilterMutation()
	const isActionPending =
		activationMutation.isPending || deleteMutation.isPending
	const filters = useMemo(
		() =>
			[...initialFilters].sort(
				(firstFilter, secondFilter) => firstFilter.id - secondFilter.id
			),
		[initialFilters]
	)

	async function handleToggleActivation(filter: UserFilter) {
		try {
			await activationMutation.mutateAsync({
				active: !filter.active,
				filterId: filter.id
			})
			toast.success(
				filter.active ? 'Фильтр отключен' : 'Фильтр применен'
			)
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	}

	async function handleConfirmDelete() {
		if (!deletingFilter) {
			return
		}

		try {
			await deleteMutation.mutateAsync(deletingFilter.id)
			toast.success('Фильтр удален')
			setDeletingFilter(null)
		} catch (error) {
			toast.error(getApiErrorMessage(error, 'Не удалось удалить фильтр'))
		}
	}

	return (
		<section className='rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 shadow-[0_14px_40px_var(--card-shadow)]'>
			<div className='mb-4 flex items-end justify-between gap-4'>
				<div>
					<div className='text-sm font-medium text-[var(--muted)]'>
						Фильтры
					</div>
					<h2 className='mt-1 text-2xl font-semibold tracking-normal'>
						Сохраненные фильтры
					</h2>
				</div>
				{filters.length ? (
					<div className='rounded-md bg-[var(--card-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--muted)]'>
						{filters.length}
					</div>
				) : null}
			</div>

			<InfoNote className='mb-4'>
				Активируйте нужный фильтр — только активные фильтры
				используются для отправки новых объявлений в Telegram-бот.
			</InfoNote>

			<div className='space-y-3'>
				{isError ? (
					<Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'>
						<CardContent>
							<div className='font-semibold'>Не удалось загрузить фильтры</div>
							<p className='mt-1 text-sm'>{getApiErrorMessage(error, 'Попробуйте ещё раз.')}</p>
						</CardContent>
					</Card>
				) : null}

				{!isError && filters.length === 0 ? (
					<UserFilterEmptyState />
				) : null}

				{filters.length ? (
					<div className='grid gap-2'>
						{filters.map(filter => (
							<UserFilterCard
								filter={filter}
								isActionPending={isActionPending}
								key={filter.id}
								onDelete={setDeletingFilter}
								onEdit={setEditingFilter}
								onToggleActivation={handleToggleActivation}
							/>
						))}
					</div>
				) : null}
			</div>

			{editingFilter ? (
				<UserFilterFormModal
					filter={editingFilter}
					isOpen={Boolean(editingFilter)}
					onClose={() => setEditingFilter(null)}
					onError={message => toast.error(message)}
					onSuccess={message => toast.success(message)}
				/>
			) : null}

			<ConfirmDialog
				description={
					deletingFilter
						? `Фильтр #${deletingFilter.id} будет удален. Это действие нельзя отменить.`
						: ''
				}
				isConfirming={deleteMutation.isPending}
				isOpen={Boolean(deletingFilter)}
				onCancel={() => setDeletingFilter(null)}
				onConfirm={handleConfirmDelete}
				title='Удалить фильтр?'
			/>
		</section>
	)
}
