'use client'

import type { ChangeEvent } from 'react'
import type { UserFilterFormValues } from '../model/types'

interface UserFilterFormFieldsProps {
	values: UserFilterFormValues
	onChange: (values: UserFilterFormValues) => void
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
	values,
	onChange
}: UserFilterFormFieldsProps) {
	function handleChange(
		key: keyof UserFilterFormValues,
		event: ChangeEvent<HTMLInputElement>
	) {
		onChange({
			...values,
			[key]: event.target.value
		})
	}

	return (
		<div className='grid grid-cols-2 gap-3'>
			{fields.map(field => (
				<label className='space-y-2' key={field.key}>
					<span className='text-sm font-semibold'>{field.label}</span>
					<input
						className='h-11 w-full rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] px-3 text-sm outline-none transition focus:border-[var(--primary)]'
						inputMode='numeric'
						min={0}
						onChange={event => handleChange(field.key, event)}
						placeholder={field.placeholder}
						type='number'
						value={values[field.key]}
					/>
				</label>
			))}
		</div>
	)
}
