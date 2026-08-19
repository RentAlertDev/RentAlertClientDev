'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { IconButton } from '@/shared/ui/icon-button'
import { APARTMENT_FALLBACK_PHOTO_URL } from '../../model/constants'

interface ApartmentPhotoCarouselProps {
	alt: string
	className?: string
	onPhotoClick?: (index: number) => void
	photos: string[]
}

export function ApartmentPhotoCarousel({ alt, className, onPhotoClick, photos }: ApartmentPhotoCarouselProps) {
	const slides = photos.length > 0 ? photos : [APARTMENT_FALLBACK_PHOTO_URL]
	const [activeIndex, setActiveIndex] = useState(0)
	const trackRef = useRef<HTMLDivElement>(null)

	function scrollToIndex(index: number) {
		const track = trackRef.current
		if (!track) {
			return
		}

		const clamped = Math.max(0, Math.min(index, slides.length - 1))
		track.scrollTo({ behavior: 'smooth', left: clamped * track.clientWidth })
	}

	function handleScroll() {
		const track = trackRef.current
		if (!track) {
			return
		}

		const index = Math.round(track.scrollLeft / track.clientWidth)
		setActiveIndex(prev => (prev === index ? prev : index))
	}

	return (
		<div className={cn('group/carousel relative aspect-[16/10] overflow-hidden bg-[var(--image-surface)]', className)}>
			<div className='no-scrollbar flex h-full w-full touch-pan-x snap-x snap-mandatory overflow-x-auto' onScroll={handleScroll} ref={trackRef}>
				{slides.map((photo, index) => (
					<div className='relative h-full w-full shrink-0 snap-start' key={`${photo}-${index}`}>
						<Image alt={`${alt} — фото ${index + 1}`} className='object-cover' fill priority={index === 0} sizes='(max-width: 768px) 100vw, 768px' src={photo} />
						{onPhotoClick ? (
							<button
								aria-label={`Открыть фото ${index + 1} на весь экран`}
								className='absolute inset-0 cursor-zoom-in'
								onClick={event => { event.stopPropagation(); onPhotoClick(index) }}
								type='button'
							/>
						) : null}
					</div>
				))}
			</div>

			{slides.length > 1 ? (
				<>
					<div className='pointer-events-none absolute inset-y-0 left-2 flex items-center opacity-0 transition-opacity group-hover/carousel:opacity-100'>
						<IconButton className='pointer-events-auto' disabled={activeIndex === 0} label='Предыдущее фото' onClick={event => { event.stopPropagation(); scrollToIndex(activeIndex - 1) }} variant='overlay'>
							<ChevronLeft aria-hidden className='size-5' />
						</IconButton>
					</div>
					<div className='pointer-events-none absolute inset-y-0 right-2 flex items-center opacity-0 transition-opacity group-hover/carousel:opacity-100'>
						<IconButton className='pointer-events-auto' disabled={activeIndex === slides.length - 1} label='Следующее фото' onClick={event => { event.stopPropagation(); scrollToIndex(activeIndex + 1) }} variant='overlay'>
							<ChevronRight aria-hidden className='size-5' />
						</IconButton>
					</div>
					<div className='pointer-events-none absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5'>
						{slides.map((photo, index) => (
							<button
								aria-label={`Показать фото ${index + 1}`}
								className={cn(
									'pointer-events-auto h-1.5 rounded-full bg-white/50 transition-all',
									index === activeIndex ? 'w-4 bg-white' : 'w-1.5 hover:bg-white/75'
								)}
								key={`${photo}-${index}-dot`}
								onClick={event => { event.stopPropagation(); scrollToIndex(index) }}
								type='button'
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	)
}
