'use client'

import { useQuery } from '@tanstack/react-query'
import { FavoriteStatusName } from '@/modules/favorite'
import { toDateKey } from '../model/date-utils'
import { getCalendarViewings } from '../api/calendar-api'

export function useUpcomingViewingsCountQuery() {
	const now = new Date()
	const end = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
	return useQuery({
		queryKey: ['calendar', 'upcoming-count', toDateKey(now)],
		queryFn: async () => {
			const events = await getCalendarViewings({ from: toDateKey(now), to: toDateKey(end) })
			return events.filter(event => event.status === FavoriteStatusName.ViewingScheduled && new Date(event.viewingDate) >= new Date()).length
		},
		staleTime: 30_000
	})
}
