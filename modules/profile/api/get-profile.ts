import { httpClient } from '@/shared/api/http-client'
import { PROFILE_API } from '../model/constants'
import type { UserProfile } from '../model/types'

export async function getProfile(): Promise<UserProfile> {
	const response = await httpClient.get<UserProfile>(PROFILE_API.me)

	return response.data
}
