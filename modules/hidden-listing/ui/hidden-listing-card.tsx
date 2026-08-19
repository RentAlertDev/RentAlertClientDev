'use client'

import { useState } from 'react'
import { ExternalLink, EyeOff, MapPin, RotateCcw } from 'lucide-react'
import {
	formatApartmentArea,
	formatApartmentFloor,
	formatApartmentRooms,
	getApartmentPhotos,
	getApartmentPricePair
} from '@/modules/apartment/model/formatters'
import { ApartmentDetailModal } from '@/modules/apartment/ui/apartment-detail-modal'
import { ApartmentFact } from '@/modules/apartment/ui/apartment-fact'
import { ApartmentPhotoCarousel } from '@/modules/apartment/ui/apartment-photo-carousel'
import { ApartmentPrice } from '@/modules/apartment/ui/apartment-price'
import type { Apartment } from '@/modules/apartment/model/types'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'

interface HiddenListingCardProps {
	isRestoring?: boolean
	listing: Apartment
	onRestore: () => void
	usdToBynRate?: number
}

export function HiddenListingCard({ isRestoring, listing, onRestore, usdToBynRate }: HiddenListingCardProps) {
	const prices = getApartmentPricePair(listing, usdToBynRate)
	const address = [listing.street, listing.metroStation].filter(Boolean).join(' · ')
	const [isDetailOpen, setIsDetailOpen] = useState(false)

	return (
		<>
		<Card
			as='article'
			className='cursor-pointer overflow-hidden'
			onClick={() => setIsDetailOpen(true)}
			onKeyDown={event => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault()
					setIsDetailOpen(true)
				}
			}}
			role='button'
			tabIndex={0}
		>
			<div className='relative aspect-[16/9] overflow-hidden bg-[var(--image-surface)] grayscale'>
				<ApartmentPhotoCarousel alt={listing.title} className='absolute inset-0' photos={getApartmentPhotos(listing)} />
				<span className='absolute left-3 top-3 rounded-md bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur'>
					{listing.source}
				</span>
				<span className='absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur'>
					<EyeOff aria-hidden className='size-3.5' />
					Скрыто
				</span>
			</div>
			<CardContent className='space-y-4'>
				<div className='flex items-start justify-between gap-3'>
					<div className='min-w-0'>
						<h2 className='line-clamp-2 text-lg font-semibold'>{listing.title}</h2>
						{address ? (
							<p className='mt-1 flex items-center gap-1.5 truncate text-sm text-[var(--muted)]'>
								<MapPin className='size-4 shrink-0' />
								{address}
							</p>
						) : null}
					</div>
					<div className='shrink-0 text-right'>
						<ApartmentPrice price={prices.primary} />
						{prices.secondary ? (
							<div className='mt-1 text-[var(--muted)]'>
								<ApartmentPrice price={prices.secondary} size='sm' />
							</div>
						) : null}
					</div>
				</div>
				<div className='grid grid-cols-3 gap-2'>
					<ApartmentFact label='Комнаты' value={formatApartmentRooms(listing)} />
					<ApartmentFact label='Площадь' value={formatApartmentArea(listing.areaTotal)} />
					<ApartmentFact label='Этаж' value={formatApartmentFloor(listing)} />
				</div>
				<div className='grid grid-cols-2 gap-2' onClick={event => event.stopPropagation()}>
					<Button disabled={isRestoring} onClick={onRestore} variant='outline'>
						<RotateCcw aria-hidden className='size-4' />
						{isRestoring ? 'Возвращаем…' : 'Вернуть'}
					</Button>
					{listing.sourceUrl ? (
						<Button
							onClick={() => window.open(listing.sourceUrl, '_blank', 'noopener,noreferrer')}
							variant='outline'
						>
							<ExternalLink aria-hidden className='size-4' />
							Открыть
						</Button>
					) : (
						<span />
					)}
				</div>
			</CardContent>
		</Card>

		<ApartmentDetailModal
			apartment={listing}
			isOpen={isDetailOpen}
			onClose={() => setIsDetailOpen(false)}
			usdToBynRate={usdToBynRate}
		/>
		</>
	)
}
