'use client'

import { Toaster as SonnerToaster, toast } from 'sonner'

export { toast }

export function Toaster() {
	return (
		<SonnerToaster
			closeButton
			duration={2600}
			position='top-center'
			richColors
			toastOptions={{
				classNames: {
					closeButton:
						'!border-[var(--card-border)] !bg-[var(--card)] !text-[var(--foreground)]',
					description: '!text-[var(--muted)]',
					toast:
						'!rounded-lg !border !border-[var(--card-border)] !bg-[var(--card)] !text-[var(--foreground)] !shadow-[0_18px_60px_rgba(0,0,0,0.22)]'
				}
			}}
		/>
	)
}
