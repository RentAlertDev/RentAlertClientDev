'use client'

import {
	ApartmentCard,
	formatApartmentsCount,
	useApartments
} from '@/modules/apartment'
import { PaginationControls, usePagination } from '@/modules/pagination'
import { Card, CardContent } from '@/shared/ui/card'
import { Loader } from '@/shared/ui/loader'
import { useStaggeredApartments } from '../hooks/use-staggered-apartments'

const APARTMENTS_PAGE_SIZE = 10

export function ApartmentsFeed() {
	const {
		debouncedPage,
		goToNextPage,
		goToPreviousPage,
		isPageLocked,
		page
	} = usePagination()
	const apartmentsQuery = useApartments({
		page: debouncedPage,
		size: APARTMENTS_PAGE_SIZE
	})
	const apartments = apartmentsQuery.data?.content ?? []
	const apartmentsTotal = apartmentsQuery.data?.totalElements ?? 0
	const { isRendering, visibleApartments } = useStaggeredApartments(
		apartments,
		apartmentsQuery.data?.number ?? debouncedPage
	)
	const isInitialLoading = apartmentsQuery.isPending && !apartmentsQuery.data
	const isPageChanging = apartmentsQuery.isFetching && !isInitialLoading
	const isListLoading = isInitialLoading || isPageChanging
	const isPaginationDisabled =
		isListLoading || isPageLocked || apartmentsQuery.isError || isRendering

	return (
		<main className='min-h-dvh bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-5 pb-[calc(24px+env(safe-area-inset-bottom))]'>
				<header className='flex items-end justify-between gap-4'>
					<div>
						<div className='text-sm font-medium text-[var(--muted)]'>
							RentAlert
						</div>
						<h1 className='mt-2 text-3xl font-semibold tracking-normal'>
							Квартиры
						</h1>
					</div>

					{apartmentsQuery.data ? (
						<Card className='shrink-0 shadow-none'>
							<CardContent className='px-3 py-2.5 text-right'>
								<div className='text-sm font-semibold leading-none'>
									{formatApartmentsCount(apartmentsTotal)}
								</div>
							</CardContent>
						</Card>
					) : null}
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

				<section className='grid min-h-[520px] place-items-center gap-4'>
					{isListLoading ? (
						<Loader label='Загружаем квартиры' />
					) : (
						<div className='grid w-full gap-4'>
							{visibleApartments.map(apartment => (
								<ApartmentCard
									apartment={apartment}
									key={apartment.id}
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
					onPreviousPage={goToPreviousPage}
					totalPages={apartmentsQuery.data?.totalPages}
				/>
			</div>
		</main>
	)
}
