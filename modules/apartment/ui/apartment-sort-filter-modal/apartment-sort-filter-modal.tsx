'use client'

import { X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import { APARTMENT_SOURCE_LABELS } from '../../model/constants'
import { ApartmentSortValue, ApartmentSource } from '../../model/types'

interface ApartmentSortFilterModalProps {
	isOpen: boolean
	onClose: () => void
	onSortChange: (sort: ApartmentSortValue | '') => void
	onSourcesChange: (sources: ApartmentSource[]) => void
	sort: ApartmentSortValue | ''
	sources: ApartmentSource[]
}

const SORT_OPTIONS: Array<{ label: string; value: ApartmentSortValue | '' }> = [
	{ label: 'Без сортировки', value: '' },
	{ label: 'Цена: сначала дешевле', value: ApartmentSortValue.PriceAsc },
	{ label: 'Цена: сначала дороже', value: ApartmentSortValue.PriceDesc },
	{ label: 'Дата получения: сначала новые', value: ApartmentSortValue.ParsedAtDesc },
	{ label: 'Дата получения: сначала старые', value: ApartmentSortValue.ParsedAtAsc }
]

const SOURCE_OPTIONS = Object.values(ApartmentSource)

export function ApartmentSortFilterModal({ isOpen, onClose, onSortChange, onSourcesChange, sort, sources }: ApartmentSortFilterModalProps) {
	if (!isOpen) {
		return null
	}

	function toggleSource(source: ApartmentSource) {
		onSourcesChange(
			sources.includes(source)
				? sources.filter(item => item !== source)
				: [...sources, source]
		)
	}

	function resetAll() {
		onSourcesChange([])
		onSortChange('')
	}

	return (
		<div
			className='fixed inset-0 z-[80] flex items-end justify-center bg-black/55 px-3 pb-3 pt-10 backdrop-blur-sm sm:items-center sm:p-6'
			onClick={event => {
				if (event.target === event.currentTarget) {
					onClose()
				}
			}}
		>
			<div className='max-h-[calc(100dvh-32px)] w-full max-w-md overflow-y-auto rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]'>
				<div className='flex items-start justify-between gap-4 border-b border-[var(--card-border)] p-4'>
					<div>
						<div className='text-sm font-medium text-[var(--muted)]'>Квартиры</div>
						<h2 className='mt-1 text-xl font-semibold'>Сортировка и фильтры</h2>
					</div>
					<IconButton label='Закрыть' onClick={onClose}>
						<X aria-hidden className='size-5' />
					</IconButton>
				</div>

				<div className='space-y-5 p-4'>
					<div>
						<div className='mb-2 text-sm font-semibold'>Провайдер</div>
						<div className='space-y-2'>
							{SOURCE_OPTIONS.map(source => (
								<label
									className='flex cursor-pointer items-center gap-2.5 rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] px-3 py-2.5 text-sm font-medium'
									key={source}
								>
									<input
										checked={sources.includes(source)}
										className='size-4 accent-[var(--primary)]'
										onChange={() => toggleSource(source)}
										type='checkbox'
									/>
									{APARTMENT_SOURCE_LABELS[source]}
								</label>
							))}
						</div>
					</div>

					<div>
						<div className='mb-2 text-sm font-semibold'>Сортировка</div>
						<div className='space-y-2'>
							{SORT_OPTIONS.map(option => (
								<label
									className='flex cursor-pointer items-center gap-2.5 rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] px-3 py-2.5 text-sm font-medium'
									key={option.value || 'none'}
								>
									<input
										checked={sort === option.value}
										className='size-4 accent-[var(--primary)]'
										name='apartment-sort'
										onChange={() => onSortChange(option.value)}
										type='radio'
									/>
									{option.label}
								</label>
							))}
						</div>
					</div>
				</div>

				<div className='grid gap-2 border-t border-[var(--card-border)] p-4 sm:grid-cols-2'>
					<Button onClick={resetAll} variant='outline'>
						Сбросить
					</Button>
					<Button onClick={onClose}>
						Готово
					</Button>
				</div>
			</div>
		</div>
	)
}
