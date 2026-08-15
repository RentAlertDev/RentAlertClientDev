import { httpClient } from '@/shared/api/http-client'
import type { AppSettings } from '../model/types'

export async function getAppSettings() {
	const response = await httpClient.get<AppSettings>('/api/app-settings')
	return response.data
}
