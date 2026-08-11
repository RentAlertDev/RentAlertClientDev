import { FAVORITE_STATUS_LABELS } from '../model/constants'
import { getSafeStatusColor } from '../model/get-status-color'
import type { FavoriteStatusInfo } from '../model/types'

export function FavoriteStatusBadge({ status }: { status?: FavoriteStatusInfo }) {
	if (!status) return null
	const color = getSafeStatusColor(status.color)

	return (
		<span
			className='inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold'
			style={
				color
					? {
							backgroundColor: `color-mix(in srgb, ${color} 16%, transparent)`,
							borderColor: color,
							color: `color-mix(in srgb, ${color} 72%, var(--foreground))`
						}
					: undefined
			}
			title={status.description}
		>
			{status.description || FAVORITE_STATUS_LABELS[status.name] || status.name}
		</span>
	)
}
