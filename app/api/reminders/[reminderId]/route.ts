import { type NextRequest } from 'next/server'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

interface ReminderRouteContext {
	params: Promise<{
		reminderId: string
	}>
}

export async function DELETE(
	_request: NextRequest,
	context: ReminderRouteContext
) {
	const { reminderId } = await context.params

	return proxyBackendRequest({
		method: 'DELETE',
		path: `/api/v1/reminders/${reminderId}`
	})
}
