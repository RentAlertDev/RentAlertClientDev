import type { Apartment, ApartmentApiItem } from '@/modules/apartment'

export enum FavoriteStatusName { Interested = 'INTERESTED', WaitingResponse = 'WAITING_RESPONSE', ViewingScheduled = 'VIEWING_SCHEDULED', Reserved = 'RESERVED', Viewed = 'VIEWED', Agreed = 'AGREED' }
export interface FavoriteStatusInfo { id: number; name: FavoriteStatusName; color?: string; description?: string }
export interface FavoriteStatusOption { id: number; name: FavoriteStatusName; description: string }
export interface FavoriteListing { listing: Apartment; status?: FavoriteStatusInfo; viewingDate?: string; createdAt?: string; updatedAt?: string }
export interface FavoriteApiItem { listing: ApartmentApiItem; status?: FavoriteStatusInfo; viewingDate?: string; createdAt?: string; updatedAt?: string }
export interface FavoritesPageMeta { number: number; size: number; totalElements: number; totalPages: number }
export interface FavoritesApiPage { content: FavoriteApiItem[]; page?: FavoritesPageMeta; number?: number; size?: number; totalElements?: number; totalPages?: number; first?: boolean; last?: boolean }
export interface FavoritesPage extends FavoritesPageMeta { content: FavoriteListing[]; first: boolean; last: boolean }
export interface GetFavoritesParams { page?: number; size?: number; sort?: string[]; status?: FavoriteStatusName }
export interface FavoriteCreateRequest { listingId: number; listingStatusId: number; viewingDate?: string }
export interface FavoriteUpdateStatusRequest { listingStatusId: number; viewingDate?: string }
