import type { NextRequest } from 'next/server'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

export async function POST(request: NextRequest) {
	return proxyBackendRequest({ body: await request.json(), method: 'POST', path: '/api/v1/profiles/email/preparation' })
}
