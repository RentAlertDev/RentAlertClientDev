import type { NextRequest } from 'next/server'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

export async function PUT(request: NextRequest) {
	return proxyBackendRequest({ body: await request.json(), method: 'PUT', path: '/api/v1/profiles' })
}
