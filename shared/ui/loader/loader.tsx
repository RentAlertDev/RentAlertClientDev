import { cn } from '@/shared/lib/utils'

interface LoaderProps {
	className?: string
	label?: string
}

export function Loader({ className, label = 'Загрузка' }: LoaderProps) {
	return (
		<div
			aria-label={label}
			className={cn('flex items-center justify-center gap-1.5', className)}
			role='status'
		>
			{Array.from({ length: 3 }).map((_, index) => (
				<span
					className='size-2 rounded-full bg-[var(--primary)] opacity-70 [animation:loader-bounce_900ms_ease-in-out_infinite]'
					key={index}
					style={{
						animationDelay: `${index * 140}ms`
					}}
				/>
			))}
			<span className='sr-only'>{label}</span>
		</div>
	)
}
