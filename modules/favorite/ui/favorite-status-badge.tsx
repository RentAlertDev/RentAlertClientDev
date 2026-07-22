import { FAVORITE_STATUS_LABELS } from '../model/constants'
import type { FavoriteStatusInfo } from '../model/types'

export function FavoriteStatusBadge({ status }: { status?: FavoriteStatusInfo }) {
	if (!status) return null
	return <span className='inline-flex rounded-full border border-[var(--card-border)] bg-[var(--card-muted)] px-2.5 py-1 text-xs font-semibold' title={status.description}>{FAVORITE_STATUS_LABELS[status.name] ?? status.name}</span>
}
