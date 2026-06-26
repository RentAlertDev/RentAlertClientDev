import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string
	children: ReactNode
	variant?: 'surface' | 'primary' | 'danger' | 'overlay' | 'overlayDanger'
}

const variantClasses = {
	surface:
		'border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--card-muted)]',
	primary:
		'border border-transparent bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90',
	danger:
		'border border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] hover:bg-[color-mix(in_srgb,var(--danger-bg)_82%,var(--danger-text))]',
	overlay:
		'border border-white/20 bg-black/50 text-white shadow-[0_10px_28px_rgba(0,0,0,0.24)] backdrop-blur-md hover:bg-black/65',
	overlayDanger:
		'border border-white/20 bg-black/50 text-white shadow-[0_10px_28px_rgba(0,0,0,0.24)] backdrop-blur-md hover:border-red-300/45 hover:bg-red-500/75'
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
			className={cn(variantClasses[variant], className)}
			size='icon'
			title={label}
			type={type}
			{...props}
		>
			{children}
		</Button>
	)
}
