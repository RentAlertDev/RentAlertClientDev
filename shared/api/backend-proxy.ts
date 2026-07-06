import axios, { type AxiosRequestConfig, type Method } from 'axios'
import { NextResponse } from 'next/server'
import {
	AuthTokenMissingError,
	getRequiredAuthSessionHeaders
} from '@/shared/api/auth-session'
import { getRequiredServerEnv } from '@/shared/config/env.server'

interface BackendProxyRequestConfig {
	body?: unknown
	method: Method
	path: string
}

export async function proxyBackendRequest<TResponse = unknown>({
	body,
	method,
	path
}: BackendProxyRequestConfig) {
	try {
		const backendBaseUrl = getRequiredServerEnv('BACKEND_BASE_URL')
		const authHeaders = await getRequiredAuthSessionHeaders()
		const requestConfig: AxiosRequestConfig = {
			headers: {
				Accept: 'application/json',
				...authHeaders
			},
			method,
			url: `${backendBaseUrl}${path}`
		}

		if (body !== undefined) {
			requestConfig.data = body
			requestConfig.headers = {
				...requestConfig.headers,
				'Content-Type': 'application/json'
			}
		}

		const response = await axios.request<TResponse>(requestConfig)

		if (response.status === 204 || response.data === undefined) {
			return new NextResponse(null, {
				status: response.status
			})
		}

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
						: 'Не удалось выполнить запрос'
			},
			{
				status: 500
			}
		)
	}
}
