'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { FavoriteCard, FAVORITES_PAGE_SIZE, FavoritesEmptyState, FavoritesSkeleton, useFavoritesQuery, useRemoveFavoriteMutation } from '@/modules/favorite'
import { PaginationControls, usePagination } from '@/modules/pagination'
import { Button } from '@/shared/ui/button'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { Card, CardContent } from '@/shared/ui/card'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import { toast } from '@/shared/ui/toaster'

export function FavoritesFeed() {
	const [removingId, setRemovingId] = useState<number | null>(null)
	const { debouncedPage, goToNextPage, goToPage, goToPreviousPage, isPageLocked, page } = usePagination()
	const query = useFavoritesQuery({ page: debouncedPage, size: FAVORITES_PAGE_SIZE, sort: ['createdAt,desc'] })
	const removeMutation = useRemoveFavoriteMutation()
	const confirmRemove = () => {
		if (removingId === null) return
		removeMutation.mutate(removingId, { onSuccess: () => { setRemovingId(null); toast.success('Объявление удалено из избранного') }, onError: error => toast.error(getApiErrorMessage(error, 'Не удалось удалить из избранного')) })
	}
	const isLoading = query.isPending && !query.data
	return <main className='min-h-dvh bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
		<div className='mx-auto flex w-full max-w-3xl flex-col gap-5 pb-6'>
			<header><div className='text-sm font-medium text-[var(--muted)]'>RentAlert</div><h1 className='mt-2 text-3xl font-semibold'>Избранное</h1><p className='mt-1 text-sm text-[var(--muted)]'>Квартиры, которые вы сохранили</p></header>
			{query.isError && <Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'><CardContent><div className='font-semibold'>Не удалось загрузить избранное</div><p className='mt-1 text-sm'>Проверьте соединение и попробуйте ещё раз.</p><Button className='mt-4' onClick={() => query.refetch()} variant='outline'><RefreshCw className='size-4' />Повторить</Button></CardContent></Card>}
			{isLoading ? <FavoritesSkeleton /> : !query.isError && query.data?.content.length === 0 ? <FavoritesEmptyState /> : <div className='grid gap-4'>{query.data?.content.map(favorite => <FavoriteCard favorite={favorite} isRemoving={removeMutation.isPending && removingId === favorite.listing.id} key={favorite.listing.id} onRemove={() => setRemovingId(favorite.listing.id)} />)}</div>}
			{query.data && query.data.totalPages > 1 && <PaginationControls currentPage={page} isDisabled={query.isFetching || isPageLocked} isLastPage={query.data.last} onNextPage={() => goToNextPage(query.data?.last)} onPageChange={next => goToPage(next, query.data?.totalPages)} onPreviousPage={goToPreviousPage} totalPages={query.data.totalPages} />}
		</div>
		<ConfirmDialog description='Карточка исчезнет из вашего списка избранного.' isConfirming={removeMutation.isPending} isOpen={removingId !== null} onCancel={() => setRemovingId(null)} onConfirm={confirmRemove} title='Удалить из избранного?' />
	</main>
}
