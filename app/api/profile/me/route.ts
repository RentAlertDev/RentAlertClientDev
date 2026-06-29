import axios from 'axios'
import { NextResponse } from 'next/server'
import type { UserProfile } from '@/modules/profile'
import {
	AuthTokenMissingError,
	getRequiredAuthSessionHeaders
} from '@/shared/api/auth-session'
import { getRequiredServerEnv } from '@/shared/config/env.server'

export async function GET() {
	try {
		const backendBaseUrl = getRequiredServerEnv('BACKEND_BASE_URL')
		const authHeaders = await getRequiredAuthSessionHeaders()
		const response = await axios.get<UserProfile>(
			`${backendBaseUrl}/api/v1/profiles/me`,
			{
				headers: {
					Accept: 'application/json',
					...authHeaders
				}
			}
		)

		return NextResponse.json(response.data, {
			status: response.status
		})
	} catch (error: unknown) {
		if (error instanceof AuthTokenMissingError) {
			return NextResponse.json(
				{
					message: 'Требуется авторизация'
				},
				{
					status: 401
				}
			)
		}

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
						: 'Не получилось загрузить профиль'
			},
			{
				status: 500
			}
		)
	}
}
