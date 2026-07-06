import { type NextRequest } from 'next/server'
import type { UserFilter } from '@/modules/user-filter'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

interface FilterActivationRouteContext {
	params: Promise<{
		active: string
		filterId: string
	}>
}

export async function PATCH(
	_request: NextRequest,
	context: FilterActivationRouteContext
) {
	const { active, filterId } = await context.params

	return proxyBackendRequest<UserFilter>({
		method: 'PATCH',
		path: `/api/v1/filters/${filterId}/activation/${active}`
	})
}
