export enum PaginationItemKind {
	Page = 'page',
	Ellipsis = 'ellipsis'
}

export interface PaginationItem {
	id: string
	kind: PaginationItemKind
	label: string
	page?: number
}

export function getPaginationItems(
	currentPage: number,
	totalPages?: number
): PaginationItem[] {
	if (!totalPages || totalPages <= 1) {
		return []
	}

	const currentPageNumber = currentPage + 1
	const pages = new Set([
		1,
		totalPages,
		currentPageNumber,
		currentPageNumber - 1,
		currentPageNumber + 1
	])

	if (currentPageNumber <= 3) {
		pages.add(2)
		pages.add(3)
	}

	if (currentPageNumber >= totalPages - 2) {
		pages.add(totalPages - 1)
		pages.add(totalPages - 2)
	}

	const visiblePages = Array.from(pages)
		.filter(page => page >= 1 && page <= totalPages)
		.sort((a, b) => a - b)

	return visiblePages.reduce<PaginationItem[]>((items, page, index) => {
		const previousPage = visiblePages[index - 1]

		if (previousPage && page - previousPage > 1) {
			if (page - previousPage === 2) {
				const middlePage = previousPage + 1

				items.push({
					id: `page-${middlePage}`,
					kind: PaginationItemKind.Page,
					label: String(middlePage),
					page: middlePage - 1
				})
			} else {
				items.push({
					id: `ellipsis-${previousPage}-${page}`,
					kind: PaginationItemKind.Ellipsis,
					label: '...'
				})
			}
		}

		items.push({
			id: `page-${page}`,
			kind: PaginationItemKind.Page,
			label: String(page),
			page: page - 1
		})

		return items
	}, [])
}
