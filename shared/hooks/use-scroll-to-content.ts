'use client'

import { useEffect, useRef } from 'react'

interface UseScrollToContentParams {
	isReady: boolean
	pageKey?: number
}

export function useScrollToContent({
	isReady,
	pageKey
}: UseScrollToContentParams) {
	const targetRef = useRef<HTMLElement>(null)
	const previousPageRef = useRef<number | undefined>(undefined)
	const hasLoadedFirstPageRef = useRef(false)

	useEffect(() => {
		if (!isReady || pageKey === undefined) {
			return
		}

		if (!hasLoadedFirstPageRef.current) {
			hasLoadedFirstPageRef.current = true
			previousPageRef.current = pageKey
			return
		}

		if (previousPageRef.current === pageKey) {
			return
		}

		previousPageRef.current = pageKey
		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches
		const frameId = window.requestAnimationFrame(() => {
			targetRef.current?.scrollIntoView({
				behavior: prefersReducedMotion ? 'auto' : 'smooth',
				block: 'start'
			})
		})

		return () => window.cancelAnimationFrame(frameId)
	}, [isReady, pageKey])

	return targetRef
}
