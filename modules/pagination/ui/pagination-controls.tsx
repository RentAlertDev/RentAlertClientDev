import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IconButton } from '@/shared/ui/icon-button'

interface PaginationControlsProps {
	currentPage: number
	isDisabled?: boolean
	isLastPage?: boolean
	onNextPage: () => void
	onPreviousPage: () => void
	totalPages?: number
}

export function PaginationControls({
	currentPage,
	isDisabled,
	isLastPage,
	onNextPage,
	onPreviousPage,
	totalPages
}: PaginationControlsProps) {
	return (
		<nav
			aria-label='Пагинация квартир'
			className='flex items-center justify-center gap-3 py-2'
		>
			<IconButton
				className='border-transparent bg-transparent shadow-none hover:bg-[color-mix(in_srgb,var(--foreground)_7%,transparent)]'
				disabled={currentPage === 0 || isDisabled}
				label='Предыдущая страница'
				onClick={onPreviousPage}
			>
				<ChevronLeft aria-hidden className='size-5' />
			</IconButton>

			<div className='min-w-20 text-center text-sm font-medium text-[var(--muted)]'>
				{currentPage + 1}
				{totalPages ? ` / ${totalPages}` : null}
			</div>

			<IconButton
				className='border-transparent bg-transparent shadow-none hover:bg-[color-mix(in_srgb,var(--foreground)_7%,transparent)]'
				disabled={isLastPage || isDisabled}
				label='Следующая страница'
				onClick={onNextPage}
			>
				<ChevronRight aria-hidden className='size-5' />
			</IconButton>
		</nav>
	)
}
