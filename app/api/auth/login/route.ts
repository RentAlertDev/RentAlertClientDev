import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'
import type {
	TelegramLoginRequest,
	TelegramLoginResponse
} from '@/modules/telegram-auth'
import { getAccessToken } from '@/modules/telegram-auth/model/get-access-token'
import { AUTH_COOKIE_NAME } from '@/shared/api/auth-session'
import { getRequiredServerEnv } from '@/shared/config/env.server'

export async function POST(request: NextRequest) {
	const body = (await request.json()) as TelegramLoginRequest

	try {
		const backendBaseUrl = getRequiredServerEnv('BACKEND_BASE_URL')
		const response = await axios.post<TelegramLoginResponse>(
			`${backendBaseUrl}/api/v1/auth/login`,
			body,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		const result = NextResponse.json(response.data, {
			status: response.status
		})
		const accessToken = getAccessToken(response.data)

		if (accessToken) {
			result.cookies.set(AUTH_COOKIE_NAME, accessToken, {
				httpOnly: true,
				maxAge: response.data.expiresIn,
				path: '/',
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production'
			})
		}

		return result
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
				message:
					error instanceof Error
						? error.message
						: 'Unknown auth proxy error'
			},
			{
				status: 500
			}
		)
	}
}
