import { FavoriteStatusName } from './types'
export const FAVORITES_API = '/api/favorites'
export const FAVORITES_PAGE_SIZE = 30
export const FAVORITE_STATUS_LABELS: Record<FavoriteStatusName, string> = {
	[FavoriteStatusName.Interested]: 'Интересно', [FavoriteStatusName.WaitingResponse]: 'Жду ответа',
	[FavoriteStatusName.ViewingScheduled]: 'Просмотр назначен', [FavoriteStatusName.Reserved]: 'Забронировано',
	[FavoriteStatusName.Viewed]: 'Просмотрено', [FavoriteStatusName.Agreed]: 'Договорились'
}
// TODO: confirm status id for INTERESTED with backend.
export const DEFAULT_FAVORITE_STATUS_ID = 1
