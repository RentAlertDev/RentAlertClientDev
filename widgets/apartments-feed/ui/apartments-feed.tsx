'use client'

import { useState } from 'react'
import { ArrowUpDown, Search, SlidersHorizontal, X } from 'lucide-react'
import {
	APARTMENT_SOURCE_LABELS,
	ApartmentCard,
	ApartmentCardSkeleton,
	ApartmentSortValue,
	ApartmentsNoActiveFilter,
	useApartments
} from '@/modules/apartment'
import {
	FAVORITES_MAX_SIZE,
	FavoriteStatusName,
	useAddFavoriteMutation,
	useFavoriteStatusesQuery,
	useFavoritesQuery
} from '@/modules/favorite'
import { useHideListingMutation } from '@/modules/hidden-listing'
import { PaginationControls, usePagination } from '@/modules/pagination'
import {
	findCurrencyRate,
	useCurrencyRatesQuery
} from '@/modules/currency-rate'
import { UserFilterFormModal } from '@/modules/user-filter'
import { Button } from '@/shared/ui/button'
import {
	getApiErrorMessage,
	getApiErrorStatus
} from '@/shared/api/get-api-error-message'
import { Card, CardContent } from '@/shared/ui/card'
import { toast } from '@/shared/ui/toaster'
import { useScrollToContent } from '@/shared/hooks/use-scroll-to-content'
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value'

const APARTMENTS_PAGE_SIZE = 10

export function ApartmentsFeed() {
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState<ApartmentSortValue | ''>('')
	const debouncedSearch = useDebouncedValue(search.trim(), 400)
	const {
		debouncedPage,
		goToNextPage,
		goToPage,
		goToPreviousPage,
		isPageLocked,
		page,
		resetPage
	} = usePagination()
	const apartmentsQuery = useApartments({
		...(debouncedSearch ? { filter: debouncedSearch } : {}),
		...(sort ? { sort: [sort] } : {}),
		page: debouncedPage,
		size: APARTMENTS_PAGE_SIZE
	})
	const favoritesQuery = useFavoritesQuery({
		page: 0,
		size: FAVORITES_MAX_SIZE,
		sort: ['createdAt,desc']
	})
	const currencyRatesQuery = useCurrencyRatesQuery()
	const usdToBynRate = findCurrencyRate(
		currencyRatesQuery.data?.rates,
		'USD',
		'BYN'
	)
	const statusesQuery = useFavoriteStatusesQuery()
	const addFavoriteMutation = useAddFavoriteMutation()
	const hideListingMutation = useHideListingMutation()
	const [hiddenIds, setHiddenIds] = useState<Set<number>>(new Set())
	const favoriteIds = new Set(
		favoritesQuery.data?.content.map(item => item.listing.id) ?? []
	)
	const hideApartment = (listingId: number) => {
		setHiddenIds(previous => new Set(previous).add(listingId))
		hideListingMutation.mutate(listingId, {
			onError: error => {
				setHiddenIds(previous => {
					const next = new Set(previous)
					next.delete(listingId)
					return next
				})
				toast.error(
					getApiErrorMessage(error, 'Не удалось скрыть объявление')
				)
			}
		})
	}
	const addToFavorites = (listingId: number) => {
		const interestedStatus = statusesQuery.data?.find(
			status => status.name === FavoriteStatusName.Interested
		)

		if (!interestedStatus) {
			toast.error('Не удалось определить начальный статус избранного')
			return
		}

		addFavoriteMutation.mutate(
			{ listingId, listingStatusId: interestedStatus.id },
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
	const apartments = (apartmentsQuery.data?.content ?? []).filter(
		apartment => !hiddenIds.has(apartment.id)
	)
	const errorMessage = getApiErrorMessage(
		apartmentsQuery.error,
		'Не получилось загрузить квартиры'
	)
	const hasNoActiveFilter =
		apartmentsQuery.isError &&
		getApiErrorStatus(apartmentsQuery.error) === 404 &&
		errorMessage.toLocaleLowerCase('ru').includes('активн') &&
		errorMessage.toLocaleLowerCase('ru').includes('фильтр')
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
						{hasNoActiveFilter
							? 'Создать и применить фильтр'
							: 'Настроить поиск'}
					</Button>

					<label className='relative block'>
						<span className='sr-only'>Поиск по объявлениям</span>
						<Search
							aria-hidden
							className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]'
						/>
						<input
							className='h-11 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] pl-10 pr-10 text-sm outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--ring)]'
							onChange={event => {
								setSearch(event.target.value)
								resetPage()
							}}
							placeholder='Поиск по адресу и описанию'
							value={search}
						/>
						{search ? (
							<button
								aria-label='Очистить поиск'
								className='absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-[var(--muted)] hover:bg-[var(--card-muted)] hover:text-[var(--foreground)]'
								onClick={() => {
									setSearch('')
									resetPage()
								}}
								type='button'
							>
								<X aria-hidden className='size-4' />
							</button>
						) : null}
					</label>

					<label className='block'>
						<span className='mb-1.5 flex items-center gap-1 text-xs font-medium text-[var(--muted)]'>
							<ArrowUpDown aria-hidden className='size-3.5' />
							Сортировка
						</span>
						<select
							className='h-11 w-full rounded-md border border-[var(--card-border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--foreground)] outline-none transition focus:border-[var(--ring)] sm:w-fit'
							onChange={event => {
								setSort(event.target.value as ApartmentSortValue | '')
								resetPage()
							}}
							value={sort}
						>
							<option value=''>Без сортировки</option>
							<option value={ApartmentSortValue.SourceAsc}>
								Провайдер: {APARTMENT_SOURCE_LABELS.KUFAR} → {APARTMENT_SOURCE_LABELS.ONLINER} → {APARTMENT_SOURCE_LABELS.REALT}
							</option>
							<option value={ApartmentSortValue.SourceDesc}>
								Провайдер: {APARTMENT_SOURCE_LABELS.REALT} → {APARTMENT_SOURCE_LABELS.ONLINER} → {APARTMENT_SOURCE_LABELS.KUFAR}
							</option>
						</select>
					</label>
				</header>

				{apartmentsQuery.isError && !hasNoActiveFilter ? (
					<Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'>
						<CardContent>
							<div className='font-semibold'>
								{errorMessage}
							</div>
						</CardContent>
					</Card>
				) : null}

				<section className='min-h-[520px] scroll-mt-4' ref={listRef}>
					{hasNoActiveFilter ? (
						<ApartmentsNoActiveFilter
							message={errorMessage}
						/>
					) : isInitialLoading ? (
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
										statusesQuery.isPending ||
										(addFavoriteMutation.isPending &&
											addFavoriteMutation.variables
												?.listingId === apartment.id)
									}
									isHiding={
										hideListingMutation.isPending &&
										hideListingMutation.variables === apartment.id
									}
									key={apartment.id}
									onAddFavorite={() =>
										addToFavorites(apartment.id)
									}
									onHide={() => hideApartment(apartment.id)}
									usdToBynRate={usdToBynRate}
								/>
							))}
						</div>
					)}
				</section>

				{!hasNoActiveFilter && !apartmentsQuery.isError ? <PaginationControls
					currentPage={page}
					isDisabled={isPaginationDisabled}
					isLastPage={apartmentsQuery.data?.last}
					onNextPage={() => goToNextPage(apartmentsQuery.data?.last)}
					onPageChange={nextPage =>
						goToPage(nextPage, apartmentsQuery.data?.totalPages)
					}
					onPreviousPage={goToPreviousPage}
					totalPages={apartmentsQuery.data?.totalPages}
				/> : null}
			</div>

			{isFilterModalOpen ? (
				<UserFilterFormModal
					isOpen={isFilterModalOpen}
					onClose={() => setIsFilterModalOpen(false)}
					onError={message => toast.error(message)}
					onSuccess={message => {
						toast.success(message)
						apartmentsQuery.refetch()
					}}
				/>
			) : null}
		</main>
	)
}
