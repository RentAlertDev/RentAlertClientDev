import { Building2, type LucideIcon } from 'lucide-react'

interface ApartmentFactProps {
	icon?: LucideIcon
	label: string
	value: string
}

export function ApartmentFact({ icon: Icon = Building2, label, value }: ApartmentFactProps) {
	return (
		<div className='rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
			<div className='mb-1 flex items-center gap-1.5 text-xs uppercase text-[var(--muted)]'>
				<Icon aria-hidden className='size-3.5' />
				{label}
			</div>
			<div className='truncate text-sm font-semibold'>{value}</div>
		</div>
	)
}
