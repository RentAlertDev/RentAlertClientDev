import type { NextRequest } from 'next/server'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

export async function POST(request: NextRequest) {
	return proxyBackendRequest({ method: 'POST', path: '/api/v1/feedback', body: await request.json() })
}
