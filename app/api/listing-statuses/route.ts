import { proxyBackendRequest } from '@/shared/api/backend-proxy'

export async function GET() {
	return proxyBackendRequest({
		method: 'GET',
		path: '/api/v1/listings/statuses'
	})
}
