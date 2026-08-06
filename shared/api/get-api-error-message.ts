import axios from 'axios'

interface ApiErrorBody {
	error?: string
	message?: string
}

export function getApiErrorMessage(error: unknown, fallback: string) {
	if (!axios.isAxiosError<ApiErrorBody>(error)) {
		return fallback
	}

	const data = error.response?.data
	const message = data?.message ?? data?.error

	return typeof message === 'string' && message.trim() ? message : fallback
}
