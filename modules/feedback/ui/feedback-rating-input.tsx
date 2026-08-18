'use client'

import { Star } from 'lucide-react'

interface FeedbackRatingInputProps {
	disabled?: boolean
	onChange: (value: number) => void
	value: number
}

const RATING_VALUES = [1, 2, 3, 4, 5]

export function FeedbackRatingInput({ disabled, onChange, value }: FeedbackRatingInputProps) {
	return (
		<div aria-label='Оценка' className='flex items-center gap-1' role='radiogroup'>
			{RATING_VALUES.map(star => (
				<button
					aria-checked={value === star}
					aria-label={`${star} из 5`}
					className='grid size-11 place-items-center rounded-md text-[var(--muted)] transition disabled:opacity-50 data-[active=true]:text-[#f5a623]'
					data-active={star <= value}
					disabled={disabled}
					key={star}
					onClick={() => onChange(star)}
					role='radio'
					type='button'
				>
					<Star aria-hidden className='size-7' fill={star <= value ? 'currentColor' : 'none'} />
				</button>
			))}
		</div>
	)
}
