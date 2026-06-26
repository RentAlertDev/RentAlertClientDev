import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'

interface SkeletonProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
	className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
	return (
		<div
			className={cn(
				'animate-pulse rounded-md bg-[color-mix(in_srgb,var(--foreground)_10%,var(--surface))]',
				className
			)}
			{...props}
		/>
	)
}
