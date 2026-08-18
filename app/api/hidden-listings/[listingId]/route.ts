import type { NextRequest } from 'next/server'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

interface RouteContext { params: Promise<{ listingId: string }> }
export async function DELETE(_request: NextRequest, context: RouteContext) {
	const { listingId } = await context.params
	return proxyBackendRequest({ method: 'DELETE', path: `/api/v1/hidden-listings/${encodeURIComponent(listingId)}` })
}
