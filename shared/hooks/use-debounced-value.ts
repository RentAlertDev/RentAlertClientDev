'use client'

import { useEffect, useState } from 'react'

export function useDebouncedValue<TValue>(value: TValue, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timerId = window.setTimeout(() => setDebouncedValue(value), delay)

		return () => window.clearTimeout(timerId)
	}, [delay, value])

	return debouncedValue
}
