import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'icon' | 'default'
	variant?: 'default' | 'ghost' | 'destructive' | 'outline'
}

const variantClasses = {
	default:
		'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90',
	ghost:
		'bg-transparent text-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]',
	destructive:
		'border border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] hover:bg-[color-mix(in_srgb,var(--danger-bg)_82%,var(--danger-text))]',
	outline:
		'border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--foreground)_8%,var(--surface))]'
}

const sizeClasses = {
	default: 'h-10 px-4 py-2',
	icon: 'size-10'
}

export function Button({
	className,
	size = 'default',
	type = 'button',
	variant = 'default',
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(
				'inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium transition active:scale-95 disabled:pointer-events-none disabled:opacity-50',
				variantClasses[variant],
				sizeClasses[size],
				className
			)}
			type={type}
			{...props}
		/>
	)
}
