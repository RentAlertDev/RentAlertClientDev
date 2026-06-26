import type { ElementType, HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'

interface CardProps extends HTMLAttributes<HTMLElement> {
	as?: ElementType
}

export function Card({ as: Component = 'div', className, ...props }: CardProps) {
	return (
		<Component
			className={cn(
				'rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-[0_14px_40px_rgba(15,23,42,0.08)]',
				className
			)}
			{...props}
		/>
	)
}

interface CardContentProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
	className?: string
}

export function CardContent({ className, ...props }: CardContentProps) {
	return <div className={cn('p-4', className)} {...props} />
}
