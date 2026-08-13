'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import {
	FavoriteCard,
	FAVORITES_PAGE_SIZE,
	FavoritesEmptyState,
	FavoritesSkeleton,
	FavoriteStatusName,
	useFavoriteStatusesQuery,
	useFavoritesQuery,
	useRemoveFavoriteMutation
} from '@/modules/favorite'
import { PaginationControls, usePagination } from '@/modules/pagination'
import {
	findCurrencyRate,
	useCurrencyRatesQuery
} from '@/modules/currency-rate'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { useScrollToContent } from '@/shared/hooks/use-scroll-to-content'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import { toast } from '@/shared/ui/toaster'
import {
	FavoritesToolbar,
	type FavoritesSortDirection,
	type FavoritesSortField
} from './favorites-toolbar'

export function FavoritesFeed() {
	const [removingId, setRemovingId] = useState<number | null>(null)
	const [status, setStatus] = useState<FavoriteStatusName | ''>('')
	const [sortField, setSortField] =
		useState<FavoritesSortField>('createdAt')
	const [sortDirection, setSortDirection] =
		useState<FavoritesSortDirection>('desc')
	const {
		goToNextPage,
		goToPage,
		goToPreviousPage,
		isPageLocked,
		page,
		resetPage
	} = usePagination()
	const query = useFavoritesQuery({
		page,
		size: FAVORITES_PAGE_SIZE,
		sort: [`${sortField},${sortDirection}`],
		...(status ? { status } : {})
	})
	const statusesQuery = useFavoriteStatusesQuery()
	const currencyRatesQuery = useCurrencyRatesQuery()
	const usdToBynRate = findCurrencyRate(
		currencyRatesQuery.data?.rates,
		'USD',
		'BYN'
	)
	const removeMutation = useRemoveFavoriteMutation()
	const isLoading = query.isPending && !query.data
	const listRef = useScrollToContent({
		isReady: !query.isFetching,
		pageKey: query.data?.number
	})

	function confirmRemove() {
		if (removingId === null) return

		removeMutation.mutate(removingId, {
			onError: error =>
				toast.error(
					getApiErrorMessage(error, 'Не удалось удалить из избранного')
				),
			onSuccess: () => {
				setRemovingId(null)
				toast.success('Объявление удалено из избранного')
			}
		})
	}

	return (
		<main className='min-h-dvh bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-5 pb-6'>
				<header>
					<div className='text-sm font-medium text-[var(--muted)]'>RentAlert</div>
					<h1 className='mt-2 text-3xl font-semibold'>Избранное</h1>
					<p className='mt-1 text-sm text-[var(--muted)]'>Квартиры, которые вы сохранили</p>
				</header>

				<FavoritesToolbar
					onSortDirectionChange={value => {
						setSortDirection(value)
						resetPage()
					}}
					onSortFieldChange={value => {
						setSortField(value)
						resetPage()
					}}
					onStatusChange={value => {
						setStatus(value)
						resetPage()
					}}
					sortDirection={sortDirection}
					sortField={sortField}
					status={status}
					statuses={statusesQuery.data ?? []}
				/>

				{query.isError ? (
					<Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'>
						<CardContent>
							<div className='font-semibold'>Не удалось загрузить избранное</div>
							<p className='mt-1 text-sm'>Проверьте соединение и попробуйте ещё раз.</p>
							<Button className='mt-4' onClick={() => query.refetch()} variant='outline'>
								<RefreshCw aria-hidden className='size-4' />
								Повторить
							</Button>
						</CardContent>
					</Card>
				) : null}

				<section className='scroll-mt-4' ref={listRef}>
					{isLoading ? (
						<FavoritesSkeleton />
					) : !query.isError && query.data?.content.length === 0 ? (
						<FavoritesEmptyState />
					) : (
						<div className='grid gap-4'>
							{query.data?.content.map(favorite => (
								<FavoriteCard
									favorite={favorite}
									isRemoving={
										removeMutation.isPending &&
										removingId === favorite.listing.id
									}
									key={favorite.listing.id}
									onRemove={() => setRemovingId(favorite.listing.id)}
									statuses={statusesQuery.data ?? []}
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

			<ConfirmDialog
				description='Карточка исчезнет из вашего списка избранного.'
				isConfirming={removeMutation.isPending}
				isOpen={removingId !== null}
				onCancel={() => setRemovingId(null)}
				onConfirm={confirmRemove}
				title='Удалить из избранного?'
			/>
		</main>
	)
}
