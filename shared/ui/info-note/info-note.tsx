import { Info } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

interface InfoNoteProps {
	children: ReactNode
	className?: string
}

export function InfoNote({ children, className }: InfoNoteProps) {
	return (
		<div
			className={cn(
				'flex gap-3 rounded-md border border-[color-mix(in_srgb,var(--ring)_32%,transparent)] bg-[color-mix(in_srgb,var(--ring)_9%,var(--card))] px-3 py-3 text-sm leading-5 text-[var(--foreground)]',
				className
			)}
		>
			<div className='grid size-7 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--ring)_16%,transparent)] text-[var(--ring)]'>
				<Info aria-hidden className='size-4' />
			</div>
			<p className='pt-0.5'>{children}</p>
		</div>
	)
}
