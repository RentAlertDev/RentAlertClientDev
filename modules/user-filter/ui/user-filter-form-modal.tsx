'use client'

import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import {
	mapFilterToFormValues,
	mapFormValuesToRequest
} from '../model/formatters'
import type { UserFilter, UserFilterFormValues } from '../model/types'
import { useCreateUserFilterMutation } from '../hooks/use-create-user-filter-mutation'
import { useSetUserFilterActivationMutation } from '../hooks/use-set-user-filter-activation-mutation'
import { useUpdateUserFilterMutation } from '../hooks/use-update-user-filter-mutation'
import { UserFilterFormFields } from './user-filter-form-fields'

interface UserFilterFormModalProps {
	filter?: UserFilter | null
	isOpen: boolean
	onClose: () => void
	onSuccess?: (message: string) => void
}

function getErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message
	}

	return 'Не удалось сохранить фильтр'
}

export function UserFilterFormModal({
	filter,
	isOpen,
	onClose,
	onSuccess
}: UserFilterFormModalProps) {
	const [values, setValues] = useState<UserFilterFormValues>(
		mapFilterToFormValues(filter ?? undefined)
	)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const createFilterMutation = useCreateUserFilterMutation()
	const updateFilterMutation = useUpdateUserFilterMutation()
	const activationMutation = useSetUserFilterActivationMutation()
	const isEditMode = Boolean(filter)
	const isSubmitting =
		createFilterMutation.isPending ||
		updateFilterMutation.isPending ||
		activationMutation.isPending

	if (!isOpen) {
		return null
	}

	async function saveFilter() {
		const request = mapFormValuesToRequest(values)

		if (filter) {
			return updateFilterMutation.mutateAsync({
				filterId: filter.id,
				request
			})
		}

		return createFilterMutation.mutateAsync(request)
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setErrorMessage(null)

		try {
			await saveFilter()
			onSuccess?.(isEditMode ? 'Фильтр сохранен' : 'Фильтр создан')
			onClose()
		} catch (error) {
			setErrorMessage(getErrorMessage(error))
		}
	}

	async function handleSaveAndApply() {
		setErrorMessage(null)

		try {
			const savedFilter = await saveFilter()

			try {
				await activationMutation.mutateAsync({
					active: true,
					filterId: savedFilter.id
				})
				onSuccess?.('Фильтр применен')
				onClose()
			} catch {
				setErrorMessage(
					'Фильтр сохранен, но не удалось его применить'
				)
			}
		} catch (error) {
			setErrorMessage(getErrorMessage(error))
		}
	}

	return (
		<div
			className='fixed inset-0 z-[80] flex items-end justify-center bg-black/55 px-3 pb-3 pt-10 backdrop-blur-sm sm:items-center sm:p-6'
			onMouseDown={event => {
				if (event.target === event.currentTarget && !isSubmitting) {
					onClose()
				}
			}}
		>
			<form
				className='max-h-[calc(100dvh-32px)] w-full max-w-lg overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]'
				onSubmit={handleSubmit}
			>
				<div className='flex items-start justify-between gap-4 border-b border-[var(--card-border)] p-4'>
					<div>
						<div className='text-sm font-medium text-[var(--muted)]'>
							Поиск квартир
						</div>
						<h2 className='mt-1 text-2xl font-semibold'>
							{isEditMode
								? 'Редактировать фильтр'
								: 'Настроить поиск'}
						</h2>
					</div>
					<IconButton
						disabled={isSubmitting}
						label='Закрыть'
						onClick={onClose}
					>
						<X aria-hidden className='size-5' />
					</IconButton>
				</div>

				<div className='max-h-[calc(100dvh-220px)] overflow-y-auto p-4'>
					<UserFilterFormFields
						onChange={setValues}
						values={values}
					/>

					{errorMessage ? (
						<div className='mt-4 rounded-md border border-[var(--danger-border)] bg-[var(--danger-bg)] px-3 py-2 text-sm text-[var(--danger-text)]'>
							{errorMessage}
						</div>
					) : null}
				</div>

				<div className='grid gap-2 border-t border-[var(--card-border)] p-4 sm:grid-cols-2'>
					<Button disabled={isSubmitting} type='submit' variant='outline'>
						Сохранить
					</Button>
					<Button
						disabled={isSubmitting}
						onClick={handleSaveAndApply}
						type='button'
					>
						Сохранить и применить
					</Button>
				</div>
			</form>
		</div>
	)
}
