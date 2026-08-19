'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, MapPin, X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import { APARTMENT_FALLBACK_PHOTO_URL } from '../../model/constants'
import { formatApartmentArea, formatApartmentFloor, formatApartmentHouseType, formatApartmentRooms, getApartmentPhotos, getApartmentPricePair } from '../../model/formatters'
import type { Apartment } from '../../model/types'
import { ApartmentFact } from '../apartment-fact'
import { ApartmentPhotoCarousel } from '../apartment-photo-carousel'
import { ApartmentPhotoLightbox } from '../apartment-photo-lightbox'
import { ApartmentPrice } from '../apartment-price'

interface ApartmentDetailModalProps {
	apartment: Apartment
	isOpen: boolean
	onClose: () => void
	usdToBynRate?: number
}

export function ApartmentDetailModal({ apartment, isOpen, onClose, usdToBynRate }: ApartmentDetailModalProps) {
	const prices = getApartmentPricePair(apartment, usdToBynRate)
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
	const photos = getApartmentPhotos(apartment)
	const slides = photos.length > 0 ? photos : [APARTMENT_FALLBACK_PHOTO_URL]

	useEffect(() => {
		if (!isOpen || lightboxIndex !== null) {
			return
		}

		const bodyOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setLightboxIndex(null)
				onClose()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			document.body.style.overflow = bodyOverflow
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, lightboxIndex, onClose])

	if (!isOpen) {
		return null
	}

	function handleClose() {
		setLightboxIndex(null)
		onClose()
	}

	return (
		<div
			className='fixed inset-0 z-[95] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6'
			onClick={event => {
				if (event.target === event.currentTarget) {
					handleClose()
				}
			}}
		>
			<div className='flex max-h-[92dvh] w-full max-w-lg flex-col overflow-y-auto rounded-t-xl bg-[var(--card)] text-[var(--foreground)] shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:rounded-lg'>
				<div className='relative aspect-[16/10] shrink-0 overflow-hidden bg-[var(--image-surface)]'>
					<ApartmentPhotoCarousel alt={apartment.title} className='absolute inset-0' onPhotoClick={setLightboxIndex} photos={slides} />
					<div className='pointer-events-none absolute left-3 top-3 rounded-md bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur'>{apartment.source}</div>
					<div className='absolute right-3 top-3'>
						<IconButton label='Закрыть' onClick={handleClose} variant='overlay'>
							<X aria-hidden className='size-5' />
						</IconButton>
					</div>
				</div>

				<div className='space-y-4 p-4'>
					<div className='flex items-start justify-between gap-4'>
						<div className='min-w-0 space-y-1'>
							<h2 className='text-lg font-semibold leading-snug'>{apartment.title}</h2>
							<div className='flex items-center gap-1.5 text-sm text-[var(--muted)]'>
								<MapPin aria-hidden className='size-4 shrink-0' />
								<span>
									{apartment.street || 'Адрес не указан'}
									{apartment.metroStation ? ` · ${apartment.metroStation}` : null}
								</span>
							</div>
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

					<div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
						<ApartmentFact label='Комнаты' value={formatApartmentRooms(apartment)} />
						<ApartmentFact label='Площадь' value={formatApartmentArea(apartment.areaTotal)} />
						<ApartmentFact label='Этаж' value={formatApartmentFloor(apartment)} />
						<ApartmentFact label='Тип дома' value={formatApartmentHouseType(apartment.houseType)} />
					</div>

					<p className='whitespace-pre-line text-sm leading-6 text-[var(--foreground)]/80'>{apartment.description}</p>

					{apartment.sourceUrl ? (
						<Button
							className='w-full'
							onClick={() =>
								window.open(
									apartment.sourceUrl,
									'_blank',
									'noopener,noreferrer'
								)
							}
							variant='outline'
						>
							<ExternalLink aria-hidden className='size-4' />
							Открыть на {apartment.source}
						</Button>
					) : null}
				</div>
			</div>

			{lightboxIndex !== null ? (
				<ApartmentPhotoLightbox
					alt={apartment.title}
					initialIndex={lightboxIndex}
					onClose={() => setLightboxIndex(null)}
					photos={slides}
				/>
			) : null}
		</div>
	)
}
