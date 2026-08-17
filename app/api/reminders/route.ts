import { type NextRequest } from 'next/server'
import type { Reminder, ReminderRequest } from '@/modules/reminder'
import { proxyBackendRequest } from '@/shared/api/backend-proxy'

const BACKEND_REMINDERS_PATH = '/api/v1/reminders'

export async function GET() {
	return proxyBackendRequest<Reminder[]>({
		method: 'GET',
		path: BACKEND_REMINDERS_PATH
	})
}

export async function POST(request: NextRequest) {
	const body = (await request.json()) as ReminderRequest

	return proxyBackendRequest<Reminder>({
		body,
		method: 'POST',
		path: BACKEND_REMINDERS_PATH
	})
}
