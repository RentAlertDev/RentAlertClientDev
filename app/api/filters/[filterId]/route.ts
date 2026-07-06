import { type NextRequest } from 'next/server'
import type { UserFilter, UserFilterRequest } from '@/modules/user-filter'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

interface FilterRouteContext {
	params: Promise<{
		filterId: string
	}>
}

async function getFilterPath(context: FilterRouteContext) {
	const { filterId } = await context.params

	return `/api/v1/filters/${filterId}`
}

export async function GET(
	_request: NextRequest,
	context: FilterRouteContext
) {
	return proxyBackendRequest<UserFilter>({
		method: 'GET',
		path: await getFilterPath(context)
	})
}

export async function PUT(
	request: NextRequest,
	context: FilterRouteContext
) {
	const body = (await request.json()) as UserFilterRequest

	return proxyBackendRequest<UserFilter>({
		body,
		method: 'PUT',
		path: await getFilterPath(context)
	})
}

export async function DELETE(
	_request: NextRequest,
	context: FilterRouteContext
) {
	return proxyBackendRequest({
		method: 'DELETE',
		path: await getFilterPath(context)
	})
}
