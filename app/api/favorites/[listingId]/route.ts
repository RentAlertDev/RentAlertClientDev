import type { NextRequest } from 'next/server'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

interface RouteContext { params: Promise<{ listingId: string }> }
export async function PUT(request: NextRequest, context: RouteContext) {
	const { listingId } = await context.params
	return proxyBackendRequest({ method: 'PUT', path: `/api/v1/favorites/${encodeURIComponent(listingId)}`, body: await request.json() })
}
export async function DELETE(_request: NextRequest, context: RouteContext) {
	const { listingId } = await context.params
	return proxyBackendRequest({ method: 'DELETE', path: `/api/v1/favorites/${encodeURIComponent(listingId)}` })
}
