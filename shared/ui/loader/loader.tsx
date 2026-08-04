import { cn } from '@/shared/lib/utils'
import { RentAlertLoader } from '@/shared/ui/rent-alert-loader'

interface LoaderProps {
	className?: string
	label?: string
}

export function Loader({ className, label = 'Загрузка' }: LoaderProps) {
	return (
		<div
			aria-label={label}
			className={cn('flex items-center justify-center', className)}
			role='status'
		>
			<RentAlertLoader size={56} />
			<span className='sr-only'>{label}</span>
		</div>
	)
}
