interface ProfileFieldProps {
	label: string
	value: string
}

export function ProfileField({ label, value }: ProfileFieldProps) {
	return (
		<div className='rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
			<div className='text-xs font-semibold uppercase text-[var(--muted)]'>
				{label}
			</div>
			<div className='mt-1 break-words text-sm font-semibold'>{value}</div>
		</div>
	)
}
