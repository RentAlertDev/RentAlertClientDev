'use client'

import { useEffect, useState } from 'react'
import {
	PAGE_CHANGE_DEBOUNCE_MS,
	PAGE_CHANGE_LOCK_MS
} from '../model/constants'

function useDebouncedValue<TValue>(value: TValue, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timerId = window.setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => window.clearTimeout(timerId)
	}, [delay, value])

	return debouncedValue
}

export function usePagination() {
	const [page, setPage] = useState(0)
	const [isPageLocked, setIsPageLocked] = useState(false)
	const debouncedPage = useDebouncedValue(page, PAGE_CHANGE_DEBOUNCE_MS)

	function lockPageChange() {
		setIsPageLocked(true)

		window.setTimeout(() => {
			setIsPageLocked(false)
		}, PAGE_CHANGE_LOCK_MS)
	}

	function goToPreviousPage() {
		if (isPageLocked) {
			return
		}

		setPage(currentPage => Math.max(0, currentPage - 1))
		lockPageChange()
	}

	function goToNextPage(lastPage?: boolean) {
		if (lastPage || isPageLocked) {
			return
		}

		setPage(currentPage => currentPage + 1)
		lockPageChange()
	}

	return {
		debouncedPage,
		goToNextPage,
		goToPreviousPage,
		isPageLocked,
		page
	}
}
