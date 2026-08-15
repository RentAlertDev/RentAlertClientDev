import type { NextRequest } from 'next/server'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

export async function GET(request: NextRequest) {
	const query = request.nextUrl.searchParams.toString()
	return proxyBackendRequest({ method: 'GET', path: `/api/v1/calendar/summary?${query}` })
}
