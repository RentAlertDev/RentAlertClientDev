'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import { Loader } from '@/shared/ui/loader'
import {
	UserFilterCard,
	UserFilterEmptyState,
	UserFilterFormModal,
	useDeleteUserFilterMutation,
	useSetUserFilterActivationMutation,
	useUserFiltersQuery,
	type UserFilter
} from '@/modules/user-filter'

function getErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message
	}

	return 'Не удалось выполнить действие'
}

export function ProfileFilters() {
	const [editingFilter, setEditingFilter] = useState<UserFilter | null>(null)
	const [deletingFilter, setDeletingFilter] = useState<UserFilter | null>(
		null
	)
	const [message, setMessage] = useState<string | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const userFiltersQuery = useUserFiltersQuery()
	const activationMutation = useSetUserFilterActivationMutation()
	const deleteMutation = useDeleteUserFilterMutation()
	const isActionPending =
		activationMutation.isPending || deleteMutation.isPending
	const filters = useMemo(
		() =>
			[...(userFiltersQuery.data ?? [])].sort(
				(firstFilter, secondFilter) => firstFilter.id - secondFilter.id
			),
		[userFiltersQuery.data]
	)

	async function handleToggleActivation(filter: UserFilter) {
		setMessage(null)
		setErrorMessage(null)

		try {
			await activationMutation.mutateAsync({
				active: !filter.active,
				filterId: filter.id
			})
			setMessage(filter.active ? 'Фильтр отключен' : 'Фильтр применен')
		} catch (error) {
			setErrorMessage(getErrorMessage(error))
		}
	}

	async function handleConfirmDelete() {
		if (!deletingFilter) {
			return
		}

		setMessage(null)
		setErrorMessage(null)

		try {
			await deleteMutation.mutateAsync(deletingFilter.id)
			setMessage('Фильтр удален')
			setDeletingFilter(null)
		} catch {
			setErrorMessage(
				deletingFilter.active
					? 'Активный фильтр нельзя удалить. Сначала отключите его.'
					: 'Не удалось удалить фильтр'
			)
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

			<div className='space-y-3'>
				{message ? (
					<div className='rounded-md border border-[var(--success-border)] bg-[var(--success-bg)] px-3 py-2 text-sm font-semibold text-[var(--success-text)]'>
						{message}
					</div>
				) : null}

				{errorMessage ? (
					<div className='rounded-md border border-[var(--danger-border)] bg-[var(--danger-bg)] px-3 py-2 text-sm font-semibold text-[var(--danger-text)]'>
						{errorMessage}
					</div>
				) : null}

				{userFiltersQuery.isPending ? (
					<div className='grid min-h-32 place-items-center rounded-md bg-[var(--card-muted)]'>
						<Loader label='Загружаем фильтры' />
					</div>
				) : null}

				{userFiltersQuery.isError ? (
					<Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'>
						<CardContent>
							<div className='font-semibold'>
								Не получилось загрузить фильтры
							</div>
							<p className='mt-1 text-sm'>
								Открой приложение заново и попробуй еще раз.
							</p>
						</CardContent>
					</Card>
				) : null}

				{!userFiltersQuery.isPending && filters.length === 0 ? (
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
					onSuccess={setMessage}
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
