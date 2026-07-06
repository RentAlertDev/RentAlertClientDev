interface UserFilterValueProps {
	label: string
	value: string
}

export function UserFilterValue({ label, value }: UserFilterValueProps) {
	return (
		<div className='min-w-0'>
			<div className='text-[10px] font-semibold uppercase leading-none text-[var(--muted)]'>
				{label}
			</div>
			<div className='mt-1 truncate text-sm font-semibold'>{value}</div>
		</div>
	)
}
