import { type NextRequest } from 'next/server'
import type { UserFilter, UserFilterRequest } from '@/modules/user-filter'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

const BACKEND_FILTERS_PATH = '/api/v1/filters'

export async function GET() {
	return proxyBackendRequest<UserFilter[]>({
		method: 'GET',
		path: BACKEND_FILTERS_PATH
	})
}

export async function POST(request: NextRequest) {
	const body = (await request.json()) as UserFilterRequest

	return proxyBackendRequest<UserFilter>({
		body,
		method: 'POST',
		path: BACKEND_FILTERS_PATH
	})
}
