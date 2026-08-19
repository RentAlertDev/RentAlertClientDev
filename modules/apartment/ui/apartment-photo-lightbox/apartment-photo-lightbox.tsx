'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { IconButton } from '@/shared/ui/icon-button'

interface ApartmentPhotoLightboxProps {
	alt: string
	initialIndex?: number
	onClose: () => void
	photos: string[]
}

export function ApartmentPhotoLightbox({ alt, initialIndex = 0, onClose, photos }: ApartmentPhotoLightboxProps) {
	const [activeIndex, setActiveIndex] = useState(initialIndex)
	const trackRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const track = trackRef.current
		if (track) {
			track.scrollLeft = initialIndex * track.clientWidth
		}

		const bodyOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			document.body.style.overflow = bodyOverflow
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [initialIndex, onClose])

	function scrollToIndex(index: number) {
		const track = trackRef.current
		if (!track) {
			return
		}

		const clamped = Math.max(0, Math.min(index, photos.length - 1))
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
		<div className='fixed inset-0 z-[100] bg-black'>
			<div className='no-scrollbar flex h-full w-full touch-pan-x snap-x snap-mandatory overflow-x-auto' onScroll={handleScroll} ref={trackRef}>
				{photos.map((photo, index) => (
					<div className='relative h-full w-full shrink-0 snap-start' key={`${photo}-${index}`}>
						<Image alt={`${alt} — фото ${index + 1}`} className='object-contain' fill sizes='100vw' src={photo} />
					</div>
				))}
			</div>

			<div className='pointer-events-none absolute left-4 top-[calc(1rem+env(safe-area-inset-top))] rounded-md bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur'>
				{activeIndex + 1} / {photos.length}
			</div>

			<div className='absolute right-4 top-[calc(1rem+env(safe-area-inset-top))]'>
				<IconButton label='Закрыть' onClick={onClose} variant='overlay'>
					<X aria-hidden className='size-5' />
				</IconButton>
			</div>

			{photos.length > 1 ? (
				<>
					<div className='pointer-events-none absolute inset-y-0 left-2 hidden items-center sm:flex'>
						<IconButton className='pointer-events-auto' disabled={activeIndex === 0} label='Предыдущее фото' onClick={() => scrollToIndex(activeIndex - 1)} variant='overlay'>
							<ChevronLeft aria-hidden className='size-5' />
						</IconButton>
					</div>
					<div className='pointer-events-none absolute inset-y-0 right-2 hidden items-center sm:flex'>
						<IconButton className='pointer-events-auto' disabled={activeIndex === photos.length - 1} label='Следующее фото' onClick={() => scrollToIndex(activeIndex + 1)} variant='overlay'>
							<ChevronRight aria-hidden className='size-5' />
						</IconButton>
					</div>
					<div className='pointer-events-none absolute inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] flex justify-center gap-1.5'>
						{photos.map((photo, index) => (
							<button
								aria-label={`Показать фото ${index + 1}`}
								className={cn(
									'pointer-events-auto h-1.5 rounded-full bg-white/50 transition-all',
									index === activeIndex ? 'w-4 bg-white' : 'w-1.5 hover:bg-white/75'
								)}
								key={`${photo}-${index}-dot`}
								onClick={() => scrollToIndex(index)}
								type='button'
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	)
}
