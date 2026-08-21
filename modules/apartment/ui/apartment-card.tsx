'use client'

import { useState } from 'react'
import { BedDouble, Clock3, ExternalLink, EyeOff, Heart, Layers3, MapPin, Ruler, TrainFront } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import { formatApartmentArea, formatApartmentFloor, formatApartmentMetroStation, formatApartmentParsedAt, formatApartmentRooms, getApartmentPhotos, getApartmentPricePair } from '../model/formatters'
import type { Apartment } from '../model/types'
import { ApartmentDetailModal } from './apartment-detail-modal'
import { ApartmentFact } from './apartment-fact'
import { ApartmentPhotoCarousel } from './apartment-photo-carousel'
import { ApartmentPrice } from './apartment-price'

interface ApartmentCardProps {
	apartment: Apartment
	isFavorite?: boolean
	isFavoritePending?: boolean
	isHiding?: boolean
	onAddFavorite?: () => void
	onHide?: () => void
	usdToBynRate?: number
}

export function ApartmentCard({ apartment, isFavorite, isFavoritePending, isHiding, onAddFavorite, onHide, usdToBynRate }: ApartmentCardProps) {
	const prices = getApartmentPricePair(apartment, usdToBynRate)
	const parsedAtLabel = formatApartmentParsedAt(apartment.parsedAt)
	const [isDetailOpen, setIsDetailOpen] = useState(false)
	return <>
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
			<div className='relative aspect-[16/10] overflow-hidden bg-[var(--image-surface)]'>
				<ApartmentPhotoCarousel alt={apartment.title} className='absolute inset-0' photos={getApartmentPhotos(apartment)} />
				<div className='absolute left-3 top-3 rounded-md bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur'>{apartment.source}</div>
				<div className='absolute right-3 top-3 flex flex-col items-end gap-2'>
					<IconButton disabled={isFavorite || isFavoritePending} label={isFavorite ? 'Уже в избранном' : 'Добавить в избранное'} onClick={event => { event.stopPropagation(); onAddFavorite?.() }} variant='overlay'>
						<Heart aria-hidden className='size-5' fill={isFavorite ? 'currentColor' : 'none'} />
					</IconButton>
					<IconButton disabled={isHiding} label='Скрыть объявление' onClick={event => { event.stopPropagation(); onHide?.() }} variant='overlayDanger'>
						<EyeOff aria-hidden className='size-5' />
					</IconButton>
				</div>
			</div>
			<CardContent className='space-y-4'>
				<div className='flex items-start justify-between gap-4'>
					<div className='min-w-0 space-y-1'><h2 className='line-clamp-2 text-lg font-semibold leading-snug text-[var(--foreground)]'>{apartment.title}</h2><div className='flex items-center gap-1.5 text-sm text-[var(--muted)]'><MapPin aria-hidden className='size-4 shrink-0' /><span className='truncate'>{apartment.street || 'Адрес не указан'}</span></div></div>
					<div className='shrink-0 text-right'><ApartmentPrice price={prices.primary} />{prices.secondary ? <div className='mt-1 text-[var(--muted)]'><ApartmentPrice price={prices.secondary} size='sm' /></div> : null}</div>
				</div>
				<div className='grid grid-cols-2 gap-2 sm:grid-cols-4'><ApartmentFact icon={BedDouble} label='Комнаты' value={formatApartmentRooms(apartment)} /><ApartmentFact icon={Ruler} label='Площадь' value={formatApartmentArea(apartment.areaTotal)} /><ApartmentFact icon={Layers3} label='Этаж' value={formatApartmentFloor(apartment)} /><ApartmentFact icon={TrainFront} label='Метро' value={formatApartmentMetroStation(apartment.metroStation)} /></div>
				<p className='overflow-hidden text-sm leading-6 text-[var(--foreground)]/80 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]'>{apartment.description}</p>
				{parsedAtLabel ? (
					<div className='flex items-center gap-1.5 text-xs text-[var(--muted)]'>
						<Clock3 aria-hidden className='size-3.5' />
						Объявление получено {parsedAtLabel}
					</div>
				) : null}
				{apartment.sourceUrl ? (
					<Button
						className='w-full'
						onClick={event => {
							event.stopPropagation()
							window.open(
								apartment.sourceUrl,
								'_blank',
								'noopener,noreferrer'
							)
						}}
						variant='outline'
					>
						<ExternalLink aria-hidden className='size-4' />
						Открыть
					</Button>
				) : null}
			</CardContent>
		</Card>

		<ApartmentDetailModal
			apartment={apartment}
			isOpen={isDetailOpen}
			onClose={() => setIsDetailOpen(false)}
			usdToBynRate={usdToBynRate}
		/>
	</>
}
