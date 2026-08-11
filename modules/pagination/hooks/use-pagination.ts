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

	function changePage(nextPage: number) {
		if (nextPage === page || isPageLocked) {
			return
		}

		setPage(nextPage)
		lockPageChange()
	}

	function goToPreviousPage() {
		changePage(Math.max(0, page - 1))
	}

	function goToNextPage(lastPage?: boolean) {
		if (lastPage) {
			return
		}

		changePage(page + 1)
	}

	function goToPage(nextPage: number, totalPages?: number) {
		const lastPage = totalPages ? totalPages - 1 : nextPage
		const boundedPage = Math.min(Math.max(0, nextPage), lastPage)

		changePage(boundedPage)
	}

	function resetPage() {
		setPage(0)
	}

	return {
		debouncedPage,
		goToNextPage,
		goToPage,
		goToPreviousPage,
		isPageLocked,
		page,
		resetPage
	}
}
