'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import {
	BOTTOM_NAVIGATION_ITEMS,
	BottomNavigationIcon,
	BottomNavigationRoute
} from '../model/routes'

const bottomNavigationIcons = {
	[BottomNavigationIcon.Apartments]: Home,
	[BottomNavigationIcon.Profile]: User
}

function isRouteActive(pathname: string, href: BottomNavigationRoute) {
	if (href === BottomNavigationRoute.Apartments) {
		return pathname === href
	}

	return pathname.startsWith(href)
}

export function BottomNavigation() {
	const pathname = usePathname()

	return (
		<nav
			aria-label='Основная навигация'
			className='fixed inset-x-0 bottom-0 z-50 border-t border-[var(--card-border)] bg-[color-mix(in_srgb,var(--card)_88%,transparent)] px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_32px_var(--card-shadow)] backdrop-blur-xl'
		>
			<div className='mx-auto grid max-w-3xl grid-cols-2 gap-2'>
				{BOTTOM_NAVIGATION_ITEMS.map(item => {
					const Icon = bottomNavigationIcons[item.icon]
					const isActive = isRouteActive(pathname, item.href)

					return (
						<Link
							aria-current={isActive ? 'page' : undefined}
							className={cn(
								'flex h-12 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition active:scale-[0.98]',
								isActive
									? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
									: 'text-[var(--muted)] hover:bg-[var(--card-muted)] hover:text-[var(--foreground)]'
							)}
							href={item.href}
							key={item.href}
						>
							<Icon aria-hidden className='size-5' />
							<span>{item.label}</span>
						</Link>
					)
				})}
			</div>
		</nav>
	)
}
