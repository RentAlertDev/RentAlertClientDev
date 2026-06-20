import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'
import type {
	TelegramLoginRequest,
	TelegramLoginResponse
} from '@/modules/telegram-auth'

const BACKEND_BASE_URL =
	process.env.BACKEND_BASE_URL ?? 'http://193.180.211.20:7777'

export async function POST(request: NextRequest) {
	const body = (await request.json()) as TelegramLoginRequest

	try {
		const response = await axios.post<TelegramLoginResponse>(
			`${BACKEND_BASE_URL}/api/v1/auth/login`,
			body,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return NextResponse.json(response.data, {
			status: response.status
		})
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return NextResponse.json(
				error.response?.data ?? {
					message: error.message
				},
				{
					status: error.response?.status ?? 500
				}
			)
		}

		return NextResponse.json(
			{
				message: 'Unknown auth proxy error'
			},
			{
				status: 500
			}
		)
	}
}
