'use client'

import type { ChangeEvent } from 'react'
import type {
	FieldErrors,
	UseFormRegister
} from 'react-hook-form'
import type { UserFilterFormValues } from '../model/types'

interface UserFilterFormFieldsProps {
	currencies: string[]
	errors: FieldErrors<UserFilterFormValues>
	isCurrenciesLoading?: boolean
	register: UseFormRegister<UserFilterFormValues>
}

interface NumberFieldConfig {
	key: keyof UserFilterFormValues
	label: string
	placeholder: string
}

const fields: NumberFieldConfig[] = [
	{
		key: 'priceFrom',
		label: 'Цена от',
		placeholder: '500'
	},
	{
		key: 'priceTo',
		label: 'Цена до',
		placeholder: '1500'
	},
	{
		key: 'roomsFrom',
		label: 'Комнат от',
		placeholder: '1'
	},
	{
		key: 'roomsTo',
		label: 'Комнат до',
		placeholder: '3'
	},
	{
		key: 'areaFrom',
		label: 'Площадь от',
		placeholder: '35'
	},
	{
		key: 'areaTo',
		label: 'Площадь до',
		placeholder: '80'
	}
]

export function UserFilterFormFields({
	currencies,
	errors,
	isCurrenciesLoading,
	register
}: UserFilterFormFieldsProps) {
	return (
		<div className='grid grid-cols-2 gap-3'>
			<label className='col-span-2 space-y-2'>
				<span className='text-sm font-semibold'>Валюта цен</span>
				<select className='h-11 w-full rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] px-3 text-sm outline-none transition focus:border-[var(--primary)]' disabled={isCurrenciesLoading || currencies.length === 0} {...register('currency')}>
					{currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
				</select>
				{errors.currency?.message ? <span className='block text-xs font-medium text-[var(--danger-text)]'>{errors.currency.message}</span> : null}
			</label>
			{fields.map(field => (
				<NumberField
					error={errors[field.key]?.message}
					field={field}
					key={field.key}
					register={register}
				/>
			))}
		</div>
	)
}

interface NumberFieldProps {
	error?: string
	field: NumberFieldConfig
	register: UseFormRegister<UserFilterFormValues>
}

function NumberField({ error, field, register }: NumberFieldProps) {
	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '')
	}

	return (
		<label className='space-y-2'>
			<span className='text-sm font-semibold'>{field.label}</span>
			<input
				aria-invalid={Boolean(error)}
				className='h-11 w-full rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] px-3 text-sm outline-none transition focus:border-[var(--primary)] aria-invalid:border-[var(--danger-border)]'
				inputMode='numeric'
				placeholder={field.placeholder}
				type='text'
				{...register(field.key, {
					onChange: handleChange
				})}
			/>
			{error ? (
				<span className='block text-xs font-medium text-[var(--danger-text)]'>
					{error}
				</span>
			) : null}
		</label>
	)
}
