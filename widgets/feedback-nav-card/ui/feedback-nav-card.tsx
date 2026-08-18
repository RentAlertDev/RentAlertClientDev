'use client'

import { useState } from 'react'
import { MessageSquareHeart } from 'lucide-react'
import { FeedbackFormModal } from '@/modules/feedback'
import { Card, CardContent } from '@/shared/ui/card'
import { toast } from '@/shared/ui/toaster'

export function FeedbackNavCard() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<button className='block w-full text-left' onClick={() => setIsOpen(true)} type='button'>
				<Card className='shadow-none transition hover:bg-[var(--card-muted)]'>
					<CardContent className='flex items-center gap-3'>
						<div className='grid size-10 shrink-0 place-items-center rounded-full bg-[var(--card-muted)] text-[var(--primary)]'>
							<MessageSquareHeart aria-hidden className='size-5' />
						</div>
						<div>
							<h2 className='font-semibold'>Оставить отзыв</h2>
							<p className='text-xs text-[var(--muted)]'>Помогите сделать сервис лучше</p>
						</div>
					</CardContent>
				</Card>
			</button>

			<FeedbackFormModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onError={message => toast.error(message)}
				onSuccess={message => toast.success(message)}
			/>
		</>
	)
}
