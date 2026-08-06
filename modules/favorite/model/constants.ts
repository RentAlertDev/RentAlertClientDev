import { FavoriteStatusName } from './types'
export const FAVORITES_API = '/api/favorites'
export const FAVORITES_PAGE_SIZE = 30
export const FAVORITE_STATUS_LABELS: Record<FavoriteStatusName, string> = {
	[FavoriteStatusName.Interested]: 'Интересно', [FavoriteStatusName.WaitingResponse]: 'Жду ответа',
	[FavoriteStatusName.ViewingScheduled]: 'Просмотр назначен', [FavoriteStatusName.Reserved]: 'Забронировано',
	[FavoriteStatusName.Viewed]: 'Просмотрено', [FavoriteStatusName.Agreed]: 'Договорились'
}

// TODO: confirm the complete status id mapping with backend if seed values change.
export const FAVORITE_STATUS_IDS: Record<FavoriteStatusName, number> = {
	[FavoriteStatusName.Interested]: 1,
	[FavoriteStatusName.WaitingResponse]: 2,
	[FavoriteStatusName.ViewingScheduled]: 3,
	[FavoriteStatusName.Reserved]: 4,
	[FavoriteStatusName.Viewed]: 5,
	[FavoriteStatusName.Agreed]: 6
}

export const FAVORITE_STATUS_OPTIONS = Object.values(FavoriteStatusName).map(
	name => ({
		id: FAVORITE_STATUS_IDS[name],
		label: FAVORITE_STATUS_LABELS[name],
		name
	})
)

export const DEFAULT_FAVORITE_STATUS_ID =
	FAVORITE_STATUS_IDS[FavoriteStatusName.Interested]
