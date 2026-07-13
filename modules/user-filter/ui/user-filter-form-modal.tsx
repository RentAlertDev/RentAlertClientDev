'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import {
	mapFilterToFormValues,
	mapFormValuesToRequest
} from '../model/formatters'
import type { UserFilter, UserFilterFormValues } from '../model/types'
import { userFilterFormSchema } from '../model/validation'
import { useCreateUserFilterMutation } from '../hooks/use-create-user-filter-mutation'
import { useSetUserFilterActivationMutation } from '../hooks/use-set-user-filter-activation-mutation'
import { useUpdateUserFilterMutation } from '../hooks/use-update-user-filter-mutation'
import { UserFilterFormFields } from './user-filter-form-fields'

interface UserFilterFormModalProps {
	filter?: UserFilter | null
	isOpen: boolean
	onClose: () => void
	onError?: (message: string) => void
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
	onError,
	onSuccess
}: UserFilterFormModalProps) {
	const form = useForm<UserFilterFormValues>({
		defaultValues: mapFilterToFormValues(filter ?? undefined),
		mode: 'onSubmit',
		resolver: zodResolver(userFilterFormSchema)
	})
	const createFilterMutation = useCreateUserFilterMutation()
	const updateFilterMutation = useUpdateUserFilterMutation()
	const activationMutation = useSetUserFilterActivationMutation()
	const isEditMode = Boolean(filter)
	const isSubmitting =
		createFilterMutation.isPending ||
		updateFilterMutation.isPending ||
		activationMutation.isPending

	useEffect(() => {
		if (!isOpen) {
			return
		}

		const bodyOverflow = document.body.style.overflow
		const htmlOverflow = document.documentElement.style.overflow

		document.body.style.overflow = 'hidden'
		document.documentElement.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = bodyOverflow
			document.documentElement.style.overflow = htmlOverflow
		}
	}, [isOpen])

	if (!isOpen) {
		return null
	}

	async function saveFilter(values: UserFilterFormValues) {
		const request = mapFormValuesToRequest(values)

		if (filter) {
			return updateFilterMutation.mutateAsync({
				filterId: filter.id,
				request
			})
		}

		return createFilterMutation.mutateAsync(request)
	}

	async function handleSave(values: UserFilterFormValues) {
		try {
			await saveFilter(values)
			onSuccess?.(isEditMode ? 'Фильтр сохранен' : 'Фильтр создан')
			onClose()
		} catch (error) {
			onError?.(getErrorMessage(error))
		}
	}

	async function handleSaveAndApply(values: UserFilterFormValues) {
		try {
			const savedFilter = await saveFilter(values)

			try {
				await activationMutation.mutateAsync({
					active: true,
					filterId: savedFilter.id
				})
				onSuccess?.('Фильтр применен')
				onClose()
			} catch {
				onError?.(
					'Фильтр сохранен, но не удалось его применить'
				)
			}
		} catch (error) {
			onError?.(getErrorMessage(error))
		}
	}

	return (
		<div
			className='fixed inset-0 z-[80] flex touch-none items-end justify-center overflow-hidden bg-black/55 px-3 pb-3 pt-10 backdrop-blur-sm sm:items-center sm:p-6'
			onTouchMove={event => {
				if (event.target === event.currentTarget) {
					event.preventDefault()
				}
			}}
			onWheel={event => {
				if (event.target === event.currentTarget) {
					event.preventDefault()
				}
			}}
		>
			<form
				className='max-h-[calc(100dvh-32px)] w-full max-w-lg touch-auto overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]'
				onSubmit={form.handleSubmit(handleSave)}
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

				<div className='max-h-[calc(100dvh-220px)] overflow-y-auto overscroll-contain p-4'>
					<UserFilterFormFields
						errors={form.formState.errors}
						register={form.register}
					/>
				</div>

				<div className='grid gap-2 border-t border-[var(--card-border)] p-4 sm:grid-cols-2'>
					<Button disabled={isSubmitting} type='submit' variant='outline'>
						Сохранить
					</Button>
					<Button
						disabled={isSubmitting}
						onClick={form.handleSubmit(handleSaveAndApply)}
						type='button'
					>
						Сохранить и применить
					</Button>
				</div>
			</form>
		</div>
	)
}
