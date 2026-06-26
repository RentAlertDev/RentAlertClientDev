'use client'

import { useEffect, useState } from 'react'
import type { Apartment } from '@/modules/apartment'

const APARTMENT_RENDER_STEP_MS = 70

interface RenderState {
	pageKey: number
	visibleCount: number
}

export function useStaggeredApartments(
	apartments: Apartment[],
	pageKey: number
) {
	const [renderState, setRenderState] = useState<RenderState>({
		pageKey,
		visibleCount: 0
	})
	const visibleCount =
		renderState.pageKey === pageKey ? renderState.visibleCount : 0

	useEffect(() => {
		if (!apartments.length) {
			return
		}

		const timerId = window.setInterval(() => {
			setRenderState(currentState => {
				const currentVisibleCount =
					currentState.pageKey === pageKey
						? currentState.visibleCount
						: 0
				const nextVisibleCount = Math.min(
					currentVisibleCount + 1,
					apartments.length
				)

				if (nextVisibleCount >= apartments.length) {
					window.clearInterval(timerId)
				}

				return {
					pageKey,
					visibleCount: nextVisibleCount
				}
			})
		}, APARTMENT_RENDER_STEP_MS)

		return () => window.clearInterval(timerId)
	}, [apartments.length, pageKey])

	return {
		isRendering: visibleCount < apartments.length,
		visibleApartments: apartments.slice(0, visibleCount)
	}
}
