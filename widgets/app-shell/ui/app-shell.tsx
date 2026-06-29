import type { ReactNode } from 'react'
import { BottomNavigation } from '@/widgets/bottom-navigation'

interface AppShellProps {
	children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
	return (
		<div className='min-h-dvh bg-[var(--background)] text-[var(--foreground)]'>
			<div className='pb-[calc(82px+env(safe-area-inset-bottom))]'>
				{children}
			</div>
			<BottomNavigation />
		</div>
	)
}
