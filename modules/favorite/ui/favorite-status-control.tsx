'use client'

import {
	CalendarDays,
	CircleCheck,
	Eye,
	LockKeyhole,
	MessageCircle,
	SearchCheck
} from 'lucide-react'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'
import { cn } from '@/shared/lib/utils'
import { toast } from '@/shared/ui/toaster'
import { useUpdateFavoriteStatusMutation } from '../hooks/use-update-favorite-status-mutation'
import { FAVORITE_STATUS_OPTIONS } from '../model/constants'
import { FavoriteStatusName, type FavoriteListing } from '../model/types'

interface FavoriteStatusControlProps {
	favorite: FavoriteListing
}

const statusIcons = {
	[FavoriteStatusName.Interested]: Eye,
	[FavoriteStatusName.WaitingResponse]: MessageCircle,
	[FavoriteStatusName.ViewingScheduled]: CalendarDays,
	[FavoriteStatusName.Reserved]: LockKeyhole,
	[FavoriteStatusName.Viewed]: SearchCheck,
	[FavoriteStatusName.Agreed]: CircleCheck
}

export function FavoriteStatusControl({
	favorite
}: FavoriteStatusControlProps) {
	const mutation = useUpdateFavoriteStatusMutation()

	return (
		<div className='rounded-md border border-[var(--card-border)] bg-[var(--card-muted)] p-3'>
			<div className='mb-2 text-xs font-medium text-[var(--muted)]'>
				Изменить статус
			</div>
			<div className='flex flex-wrap gap-2'>
				{FAVORITE_STATUS_OPTIONS.map(option => {
					const Icon = statusIcons[option.name]
					const isCurrent = favorite.status?.name === option.name

					return (
						<button
							aria-pressed={isCurrent}
							className={cn(
								'inline-flex min-h-8 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition active:scale-[.98] disabled:pointer-events-none disabled:opacity-60',
								isCurrent
									? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]'
									: 'border-[var(--card-border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)]'
							)}
							disabled={mutation.isPending || isCurrent}
							key={option.name}
							onClick={() =>
								mutation.mutate(
									{
										data: {
											listingStatusId: option.id,
											...(favorite.viewingDate
												? { viewingDate: favorite.viewingDate }
												: {})
										},
										listingId: favorite.listing.id
									},
									{
										onError: error =>
											toast.error(
												getApiErrorMessage(
													error,
													'Не удалось обновить статус'
												)
											),
										onSuccess: () =>
											toast.success('Статус обновлён')
									}
								)
							}
							type='button'
						>
							<Icon aria-hidden className='size-3.5' />
							{option.label}
						</button>
					)
				})}
			</div>
		</div>
	)
}
