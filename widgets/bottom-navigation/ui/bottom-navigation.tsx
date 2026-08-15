'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, Heart, Home, User } from 'lucide-react'
import { useUpcomingViewingsCountQuery } from '@/modules/calendar'
import { cn } from '@/shared/lib/utils'
import {
	BOTTOM_NAVIGATION_ITEMS,
	BottomNavigationIcon,
	BottomNavigationRoute
} from '../model/routes'

const bottomNavigationIcons = {
	[BottomNavigationIcon.Apartments]: Home,
	[BottomNavigationIcon.Favorites]: Heart,
	[BottomNavigationIcon.Calendar]: CalendarDays,
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
	const upcomingQuery = useUpcomingViewingsCountQuery()
	const upcomingCount = upcomingQuery.data ?? 0

	return (
		<nav
			aria-label='Основная навигация'
			className='fixed inset-x-0 bottom-0 z-50 border-t border-[var(--card-border)] bg-[color-mix(in_srgb,var(--card)_88%,transparent)] px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_32px_var(--card-shadow)] backdrop-blur-xl'
		>
			<div className='mx-auto grid max-w-3xl grid-cols-4 gap-1 rounded-[1.35rem] bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)] p-1'>
				{BOTTOM_NAVIGATION_ITEMS.map(item => {
					const Icon = bottomNavigationIcons[item.icon]
					const isActive = isRouteActive(pathname, item.href)

					return (
						<Link
							aria-current={isActive ? 'page' : undefined}
							className={cn(
								'flex h-16 min-w-0 flex-col items-center justify-center gap-1 rounded-[1.1rem] text-[11px] font-semibold leading-none transition active:scale-[0.98]',
								isActive
									? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_10px_28px_var(--card-shadow)]'
									: 'text-[var(--muted)] hover:bg-[var(--card-muted)] hover:text-[var(--foreground)]'
							)}
							href={item.href}
							key={item.href}
						>
							<span className='relative'><Icon aria-hidden className='size-5 shrink-0' />{item.icon === BottomNavigationIcon.Calendar && upcomingCount > 0 ? <span aria-label={`Предстоящих просмотров: ${upcomingCount}`} className='absolute -right-3 -top-2 grid min-w-5 place-items-center rounded-full border-2 border-[var(--card)] bg-[#147bf3] px-1 text-[10px] font-bold leading-4 text-white'>{upcomingCount > 99 ? '99+' : upcomingCount}</span> : null}</span>
							<span className='max-w-full truncate px-1'>
								{item.label}
							</span>
						</Link>
					)
				})}
			</div>
		</nav>
	)
}
