import type { NextRequest } from 'next/server'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

export async function GET(request: NextRequest) {
	const query = request.nextUrl.searchParams.toString()
	return proxyBackendRequest({ method: 'GET', path: `/api/v1/favorites${query ? `?${query}` : ''}` })
}
export async function POST(request: NextRequest) {
	return proxyBackendRequest({ method: 'POST', path: '/api/v1/favorites', body: await request.json() })
}
