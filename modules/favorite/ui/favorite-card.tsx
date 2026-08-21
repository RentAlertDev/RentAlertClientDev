'use client'

import { useState } from 'react'
import { BedDouble, CalendarDays, ExternalLink, EyeOff, Layers3, MapPin, Ruler, Trash2 } from 'lucide-react'
import { ApartmentDetailModal } from '@/modules/apartment/ui/apartment-detail-modal'
import { formatApartmentArea, formatApartmentFloor, formatApartmentRooms, getApartmentPhotos } from '@/modules/apartment/model/formatters'
import { ApartmentFact } from '@/modules/apartment/ui/apartment-fact'
import { ApartmentPhotoCarousel } from '@/modules/apartment/ui/apartment-photo-carousel'
import { ApartmentPrice } from '@/modules/apartment/ui/apartment-price'
import { getApartmentPricePair } from '@/modules/apartment/model/formatters'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import type { FavoriteListing, FavoriteStatusOption } from '../model/types'
import { FavoriteStatusBadge } from './favorite-status-badge'
import { FavoriteStatusControl } from './favorite-status-control'

interface Props { favorite: FavoriteListing; isHiding?: boolean; isRemoving?: boolean; onHide?: () => void; onRemove: () => void; statuses: FavoriteStatusOption[]; usdToBynRate?: number }
export function FavoriteCard({ favorite, isHiding, isRemoving, onHide, onRemove, statuses, usdToBynRate }: Props) {
	const { listing } = favorite
	const prices = getApartmentPricePair(listing, usdToBynRate)
	const address = [listing.microdistrict, listing.street, listing.metroStation].filter(Boolean).join(' · ')
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
			<div className='relative aspect-[16/9] overflow-hidden bg-[var(--image-surface)]'>
				<ApartmentPhotoCarousel alt={listing.title} className='absolute inset-0' photos={getApartmentPhotos(listing)} />
				<span className='absolute left-3 top-3 rounded-md bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur'>{listing.source}</span>
				<div className='absolute right-3 top-3'>
					<IconButton disabled={isHiding} label='Скрыть объявление' onClick={event => { event.stopPropagation(); onHide?.() }} variant='overlayDanger'>
						<EyeOff aria-hidden className='size-5' />
					</IconButton>
				</div>
			</div>
			<CardContent className='space-y-4'>
				<div className='flex items-start justify-between gap-3'><div className='min-w-0'><h2 className='line-clamp-2 text-lg font-semibold'>{listing.title}</h2>{address && <p className='mt-1 flex items-center gap-1.5 truncate text-sm text-[var(--muted)]'><MapPin className='size-4 shrink-0' />{address}</p>}</div><div className='shrink-0 text-right'><ApartmentPrice price={prices.primary} />{prices.secondary ? <div className='mt-1 text-[var(--muted)]'><ApartmentPrice price={prices.secondary} size='sm' /></div> : null}</div></div>
				<div className='grid grid-cols-3 gap-2'><ApartmentFact icon={BedDouble} label='Комнаты' value={formatApartmentRooms(listing)} /><ApartmentFact icon={Ruler} label='Площадь' value={formatApartmentArea(listing.areaTotal)} /><ApartmentFact icon={Layers3} label='Этаж' value={formatApartmentFloor(listing)} /></div>
				<div className='flex flex-wrap items-center gap-2'><FavoriteStatusBadge status={favorite.status} />{favorite.viewingDate && <span className='inline-flex items-center gap-1.5 text-xs text-[var(--muted)]'><CalendarDays className='size-4' />{new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(favorite.viewingDate))}</span>}</div>
				<div onClick={event => event.stopPropagation()}><FavoriteStatusControl favorite={favorite} statuses={statuses} /></div>
				<div className='grid grid-cols-2 gap-2' onClick={event => event.stopPropagation()}><Button disabled={isRemoving} onClick={onRemove} variant='destructive'><Trash2 className='size-4' />Удалить</Button>{listing.sourceUrl ? <Button onClick={() => window.open(listing.sourceUrl, '_blank', 'noopener,noreferrer')} variant='outline'><ExternalLink className='size-4' />Открыть</Button> : <span />}</div>
			</CardContent>
		</Card>

		<ApartmentDetailModal
			apartment={listing}
			isOpen={isDetailOpen}
			onClose={() => setIsDetailOpen(false)}
			usdToBynRate={usdToBynRate}
		/>
	</>
}
