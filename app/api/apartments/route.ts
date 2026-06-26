import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'
import type { ApartmentsPageResponse } from '@/modules/apartment'
import {
	AuthTokenMissingError,
	getRequiredAuthSessionHeaders
} from '@/shared/api/auth-session'
import { getRequiredServerEnv } from '@/shared/config/env.server'

const DEFAULT_PAGE = 0
const DEFAULT_SIZE = 6
const MAX_SIZE = 20

function getPageParam(request: NextRequest) {
	const page = Number(request.nextUrl.searchParams.get('page'))

	if (!Number.isInteger(page) || page < 0) {
		return DEFAULT_PAGE
	}

	return page
}

function getSizeParam(request: NextRequest) {
	const size = Number(request.nextUrl.searchParams.get('size'))

	if (!Number.isInteger(size) || size < 1) {
		return DEFAULT_SIZE
	}

	return Math.min(size, MAX_SIZE)
}

export async function GET(request: NextRequest) {
	try {
		const backendBaseUrl = getRequiredServerEnv('BACKEND_BASE_URL')
		const authHeaders = await getRequiredAuthSessionHeaders()
		const response = await axios.get<ApartmentsPageResponse>(
			`${backendBaseUrl}/api/v1/listings`,
			{
				headers: {
					Accept: 'application/json',
					...authHeaders
				},
				params: {
					page: getPageParam(request),
					size: getSizeParam(request)
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
						: 'Не удалось загрузить квартиры'
			},
			{
				status: 500
			}
		)
	}
}
