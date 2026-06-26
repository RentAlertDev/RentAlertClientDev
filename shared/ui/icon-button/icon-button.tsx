import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string
	children: ReactNode
	variant?: 'surface' | 'primary' | 'danger'
}

const variantClasses = {
	surface:
		'border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] text-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--foreground)_8%,var(--surface))]',
	primary:
		'border border-transparent bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90',
	danger:
		'border border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] hover:bg-[color-mix(in_srgb,var(--danger-bg)_82%,var(--danger-text))]'
}

export function IconButton({
	label,
	children,
	className,
	type = 'button',
	variant = 'surface',
	...props
}: IconButtonProps) {
	return (
		<Button
			aria-label={label}
			className={cn(
				variantClasses[variant],
				className
			)}
			size='icon'
			title={label}
			type={type}
			{...props}
		>
			{children}
		</Button>
	)
}
