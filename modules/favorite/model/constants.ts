import { FavoriteStatusName } from './types'
export const FAVORITES_API = '/api/favorites'
export const FAVORITE_STATUSES_API = '/api/listing-statuses'
export const FAVORITES_PAGE_SIZE = 6
export const FAVORITES_MAX_SIZE = 30
export const FAVORITE_STATUS_LABELS: Record<FavoriteStatusName, string> = {
	[FavoriteStatusName.Interested]: 'Интересно',
	[FavoriteStatusName.WaitingResponse]: 'Жду ответа',
	[FavoriteStatusName.ViewingScheduled]: 'Просмотр назначен',
	[FavoriteStatusName.Reserved]: 'Забронировано',
	[FavoriteStatusName.Viewed]: 'Просмотрено',
	[FavoriteStatusName.Agreed]: 'Договорились'
}
