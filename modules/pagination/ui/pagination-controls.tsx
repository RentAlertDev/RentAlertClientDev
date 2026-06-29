import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import { cn } from '@/shared/lib/utils'
import { getPaginationItems, PaginationItemKind } from '../model'

interface PaginationControlsProps {
	currentPage: number
	isDisabled?: boolean
	isLastPage?: boolean
	onNextPage: () => void
	onPageChange: (page: number) => void
	onPreviousPage: () => void
	totalPages?: number
}

export function PaginationControls({
	currentPage,
	isDisabled,
	isLastPage,
	onNextPage,
	onPageChange,
	onPreviousPage,
	totalPages
}: PaginationControlsProps) {
	const paginationItems = getPaginationItems(currentPage, totalPages)

	if (!paginationItems.length) {
		return null
	}

	return (
		<nav
			aria-label='Пагинация квартир'
			className='flex w-full items-center justify-center gap-2 py-2'
		>
			<IconButton
				className='size-9 shadow-none'
				disabled={currentPage === 0 || isDisabled}
				label='Предыдущая страница'
				onClick={onPreviousPage}
			>
				<ChevronLeft aria-hidden className='size-4' />
			</IconButton>

			<div className='flex max-w-[calc(100vw-128px)] items-center gap-1 overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-1 shadow-[0_10px_28px_var(--card-shadow)]'>
				{paginationItems.map(item => {
					if (item.kind === PaginationItemKind.Ellipsis) {
						return (
							<span
								aria-hidden
								className='grid size-8 place-items-center text-sm font-semibold text-[var(--muted)]'
								key={item.id}
							>
								{item.label}
							</span>
						)
					}

					const isCurrent = item.page === currentPage

					return (
						<Button
							aria-current={isCurrent ? 'page' : undefined}
							className={cn(
								'size-8 rounded-md px-0 py-0 text-sm shadow-none',
								isCurrent
									? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
									: 'bg-transparent text-[var(--foreground)] hover:bg-[var(--card-muted)]'
							)}
							disabled={isDisabled || isCurrent}
							key={item.id}
							onClick={() => {
								if (typeof item.page === 'number') {
									onPageChange(item.page)
								}
							}}
							variant='ghost'
						>
							{item.label}
						</Button>
					)
				})}
			</div>

			<IconButton
				className='size-9 shadow-none'
				disabled={isLastPage || isDisabled}
				label='Следующая страница'
				onClick={onNextPage}
			>
				<ChevronRight aria-hidden className='size-4' />
			</IconButton>
		</nav>
	)
}
