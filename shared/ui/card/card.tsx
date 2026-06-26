import type { ElementType, HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'

interface CardProps extends HTMLAttributes<HTMLElement> {
	as?: ElementType
}

export function Card({ as: Component = 'div', className, ...props }: CardProps) {
	return (
		<Component
			className={cn(
				'rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] shadow-[0_14px_40px_var(--card-shadow)]',
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
