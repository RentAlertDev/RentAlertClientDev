'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, RefreshCw } from 'lucide-react'
import {
	HIDDEN_LISTINGS_PAGE_SIZE,
	HiddenListingCard,
	HiddenListingsEmptyState,
	HiddenListingsSkeleton,
	useHiddenListingsQuery,
	useRemoveHiddenListingMutation
} from '@/modules/hidden-listing'
import { PaginationControls, usePagination } from '@/modules/pagination'
import { findCurrencyRate, useCurrencyRatesQuery } from '@/modules/currency-rate'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { useScrollToContent } from '@/shared/hooks/use-scroll-to-content'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { toast } from '@/shared/ui/toaster'

export function HiddenListingsFeed() {
	const [restoringId, setRestoringId] = useState<number | null>(null)
	const { goToNextPage, goToPage, goToPreviousPage, isPageLocked, page } = usePagination()
	const query = useHiddenListingsQuery({ page, size: HIDDEN_LISTINGS_PAGE_SIZE })
	const currencyRatesQuery = useCurrencyRatesQuery()
	const usdToBynRate = findCurrencyRate(currencyRatesQuery.data?.rates, 'USD', 'BYN')
	const removeMutation = useRemoveHiddenListingMutation()
	const isLoading = query.isPending && !query.data
	const listRef = useScrollToContent({
		isReady: !query.isFetching,
		pageKey: query.data?.number
	})

	async function handleRestore(listingId: number) {
		setRestoringId(listingId)

		try {
			await removeMutation.mutateAsync(listingId)
			toast.success('Объявление возвращено — уведомления по нему снова активны')
		} catch (error) {
			toast.error(getApiErrorMessage(error, 'Не удалось вернуть объявление'))
		} finally {
			setRestoringId(null)
		}
	}

	return (
		<main className='min-h-dvh bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-5 pb-6'>
				<header className='space-y-2'>
					<Link
						className='inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]'
						href='/profile'
					>
						<ChevronLeft aria-hidden className='size-4' />
						Профиль
					</Link>
					<h1 className='text-3xl font-semibold'>Скрытые объявления</h1>
					<p className='text-sm text-[var(--muted)]'>Квартиры, которые вы скрыли через бота</p>
				</header>

				{query.isError ? (
					<Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'>
						<CardContent>
							<div className='font-semibold'>Не удалось загрузить скрытые объявления</div>
							<p className='mt-1 text-sm'>{getApiErrorMessage(query.error, 'Попробуйте ещё раз.')}</p>
							<Button className='mt-4' onClick={() => query.refetch()} variant='outline'>
								<RefreshCw aria-hidden className='size-4' />
								Повторить
							</Button>
						</CardContent>
					</Card>
				) : null}

				<section className='scroll-mt-4' ref={listRef}>
					{isLoading ? (
						<HiddenListingsSkeleton />
					) : !query.isError && query.data?.content.length === 0 ? (
						<HiddenListingsEmptyState />
					) : (
						<div className='grid gap-4'>
							{query.data?.content.map(listing => (
								<HiddenListingCard
									isRestoring={restoringId === listing.id}
									key={listing.id}
									listing={listing}
									onRestore={() => handleRestore(listing.id)}
									usdToBynRate={usdToBynRate}
								/>
							))}
						</div>
					)}
				</section>

				{query.data && query.data.totalPages > 1 ? (
					<PaginationControls
						currentPage={page}
						isDisabled={query.isFetching || isPageLocked}
						isLastPage={query.data.last}
						onNextPage={() => goToNextPage(query.data?.last)}
						onPageChange={next => goToPage(next, query.data?.totalPages)}
						onPreviousPage={goToPreviousPage}
						totalPages={query.data.totalPages}
					/>
				) : null}
			</div>
		</main>
	)
}
