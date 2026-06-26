import Image from 'next/image'
import { Heart, MapPin, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'
import { IconButton } from '@/shared/ui/icon-button'
import { APARTMENT_FALLBACK_PHOTO_URL } from '../model/constants'
import {
	formatApartmentArea,
	formatApartmentFloor,
	formatApartmentHouseType,
	formatApartmentRooms,
	getApartmentPricePair
} from '../model/formatters'
import type { Apartment } from '../model/types'
import { ApartmentFact } from './apartment-fact'
import { ApartmentPrice } from './apartment-price'

interface ApartmentCardProps {
	apartment: Apartment
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
	const prices = getApartmentPricePair(apartment)

	return (
		<Card as='article' className='overflow-hidden'>
			<div className='relative aspect-[16/10] overflow-hidden bg-[color-mix(in_srgb,var(--foreground)_8%,var(--surface))]'>
				<Image
					alt={apartment.title}
					className='h-full w-full object-cover'
					fill
					sizes='(max-width: 768px) 100vw, 768px'
					src={apartment.previewPhoto ?? APARTMENT_FALLBACK_PHOTO_URL}
				/>

				<div className='absolute left-3 top-3 rounded-md bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur'>
					{apartment.source}
				</div>

				<div className='absolute right-3 top-3 flex gap-2'>
					<IconButton
						className='bg-black/45 text-white backdrop-blur hover:bg-black/60'
						label={
							apartment.isFavorite
								? 'Убрать из избранного'
								: 'Добавить в избранное'
						}
					>
						<Heart
							aria-hidden
							className='size-5'
							fill={
								apartment.isFavorite ? 'currentColor' : 'none'
							}
						/>
					</IconButton>
					<IconButton label='Удалить квартиру' variant='danger'>
						<Trash2 aria-hidden className='size-5' />
					</IconButton>
				</div>
			</div>

			<CardContent className='space-y-4'>
				<div className='flex items-start justify-between gap-4'>
					<div className='min-w-0 space-y-1'>
						<h2 className='line-clamp-2 text-lg font-semibold leading-snug text-[var(--foreground)]'>
							{apartment.title}
						</h2>
						<div className='flex items-center gap-1.5 text-sm text-[var(--muted)]'>
							<MapPin aria-hidden className='size-4 shrink-0' />
							<span className='truncate'>
								{apartment.street || 'Адрес не указан'}
								{apartment.metroStation
									? ` · ${apartment.metroStation}`
									: null}
							</span>
						</div>
					</div>

					<div className='shrink-0 text-right'>
						<div>
							<ApartmentPrice price={prices.primary} />
						</div>
						<div className='mt-1 text-[var(--muted)]'>
							<ApartmentPrice
								price={prices.secondary}
								size='sm'
							/>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
					<ApartmentFact
						label='Комнаты'
						value={formatApartmentRooms(apartment)}
					/>
					<ApartmentFact
						label='Площадь'
						value={formatApartmentArea(apartment.areaTotal)}
					/>
					<ApartmentFact
						label='Этаж'
						value={formatApartmentFloor(apartment)}
					/>
					<ApartmentFact
						label='Тип дома'
						value={formatApartmentHouseType(apartment.houseType)}
					/>
				</div>

				<p className='overflow-hidden text-sm leading-6 text-[var(--foreground)]/80 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]'>
					{apartment.description}
				</p>
			</CardContent>
		</Card>
	)
}
