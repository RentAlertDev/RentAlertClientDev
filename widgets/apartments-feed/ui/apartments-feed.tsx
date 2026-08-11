'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import {
	ApartmentCard,
	ApartmentCardSkeleton,
	useApartments
} from '@/modules/apartment'
import {
	DEFAULT_FAVORITE_STATUS_ID,
	FAVORITES_MAX_SIZE,
	useAddFavoriteMutation,
	useFavoritesQuery
} from '@/modules/favorite'
import { PaginationControls, usePagination } from '@/modules/pagination'
import { UserFilterFormModal } from '@/modules/user-filter'
import { Button } from '@/shared/ui/button'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { Card, CardContent } from '@/shared/ui/card'
import { toast } from '@/shared/ui/toaster'
import { useScrollToContent } from '@/shared/hooks/use-scroll-to-content'

const APARTMENTS_PAGE_SIZE = 10

export function ApartmentsFeed() {
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
	const {
		debouncedPage,
		goToNextPage,
		goToPage,
		goToPreviousPage,
		isPageLocked,
		page
	} = usePagination()
	const apartmentsQuery = useApartments({
		page: debouncedPage,
		size: APARTMENTS_PAGE_SIZE
	})
	const favoritesQuery = useFavoritesQuery({
		page: 0,
		size: FAVORITES_MAX_SIZE,
		sort: ['createdAt,desc']
	})
	const addFavoriteMutation = useAddFavoriteMutation()
	const favoriteIds = new Set(
		favoritesQuery.data?.content.map(item => item.listing.id) ?? []
	)
	const addToFavorites = (listingId: number) => {
		addFavoriteMutation.mutate(
			{ listingId, listingStatusId: DEFAULT_FAVORITE_STATUS_ID },
			{
				onSuccess: () =>
					toast.success('Квартира добавлена в избранное'),
				onError: error =>
					toast.error(
						getApiErrorMessage(
							error,
							'Не удалось добавить квартиру в избранное'
						)
					)
			}
		)
	}
	const apartments = apartmentsQuery.data?.content ?? []
	const isInitialLoading = apartmentsQuery.isPending && !apartmentsQuery.data
	const isPageChanging = apartmentsQuery.isFetching && !isInitialLoading
	const isPaginationDisabled =
		isInitialLoading ||
		isPageChanging ||
		isPageLocked ||
		apartmentsQuery.isError
	const listRef = useScrollToContent({
		isReady: !apartmentsQuery.isFetching,
		pageKey: apartmentsQuery.data?.number
	})

	return (
		<main className='min-h-dvh bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-5 pb-[calc(24px+env(safe-area-inset-bottom))]'>
				<header className='flex flex-col gap-4'>
					<div className='flex items-end justify-between gap-4'>
						<div>
							<div className='text-sm font-medium text-[var(--muted)]'>
								RentAlert
							</div>
							<h1 className='mt-2 text-3xl font-semibold tracking-normal'>
								Квартиры
							</h1>
						</div>
					</div>

					<Button
						className='w-full justify-center sm:w-fit'
						onClick={() => setIsFilterModalOpen(true)}
					>
						<SlidersHorizontal aria-hidden className='size-4' />
						Настроить поиск
					</Button>
				</header>

				{apartmentsQuery.isError ? (
					<Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'>
						<CardContent>
							<div className='font-semibold'>
								Не получилось загрузить квартиры
							</div>
							<p className='mt-1 text-sm'>
								Открой приложение заново и попробуй еще раз.
							</p>
						</CardContent>
					</Card>
				) : null}

				<section className='min-h-[520px] scroll-mt-4' ref={listRef}>
					{isInitialLoading ? (
						<div
							aria-label='Загружаем квартиры'
							className='grid w-full gap-4'
							role='status'
						>
							{Array.from({ length: 3 }).map((_, index) => (
								<ApartmentCardSkeleton key={index} />
							))}
						</div>
					) : (
						<div className='grid w-full gap-4 transition-opacity duration-200 data-[fetching=true]:opacity-60' data-fetching={isPageChanging}>
							{apartments.map(apartment => (
								<ApartmentCard
									apartment={apartment}
									isFavorite={favoriteIds.has(apartment.id)}
									isFavoritePending={
										addFavoriteMutation.isPending &&
										addFavoriteMutation.variables
											?.listingId === apartment.id
									}
									key={apartment.id}
									onAddFavorite={() =>
										addToFavorites(apartment.id)
									}
								/>
							))}
						</div>
					)}
				</section>

				<PaginationControls
					currentPage={page}
					isDisabled={isPaginationDisabled}
					isLastPage={apartmentsQuery.data?.last}
					onNextPage={() => goToNextPage(apartmentsQuery.data?.last)}
					onPageChange={nextPage =>
						goToPage(nextPage, apartmentsQuery.data?.totalPages)
					}
					onPreviousPage={goToPreviousPage}
					totalPages={apartmentsQuery.data?.totalPages}
				/>
			</div>

			{isFilterModalOpen ? (
				<UserFilterFormModal
					isOpen={isFilterModalOpen}
					onClose={() => setIsFilterModalOpen(false)}
					onError={message => toast.error(message)}
					onSuccess={message => toast.success(message)}
				/>
			) : null}
		</main>
	)
}
