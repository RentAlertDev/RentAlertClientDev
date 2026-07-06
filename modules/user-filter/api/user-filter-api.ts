import { httpClient } from '@/shared/api/http-client'
import { USER_FILTER_API } from '../model/constants'
import type { UserFilter, UserFilterRequest } from '../model/types'

export async function getUserFilters() {
	const response = await httpClient.get<UserFilter[]>(USER_FILTER_API.root)

	return response.data
}

export async function getUserFilter(filterId: number) {
	const response = await httpClient.get<UserFilter>(
		USER_FILTER_API.byId(filterId)
	)

	return response.data
}

export async function createUserFilter(request: UserFilterRequest) {
	const response = await httpClient.post<UserFilter>(
		USER_FILTER_API.root,
		request
	)

	return response.data
}

export async function updateUserFilter(
	filterId: number,
	request: UserFilterRequest
) {
	const response = await httpClient.put<UserFilter>(
		USER_FILTER_API.byId(filterId),
		request
	)

	return response.data
}

export async function deleteUserFilter(filterId: number) {
	await httpClient.delete(USER_FILTER_API.byId(filterId))
}

export async function setUserFilterActivation(
	filterId: number,
	active: boolean
) {
	const response = await httpClient.patch<UserFilter>(
		USER_FILTER_API.activation(filterId, active)
	)

	return response.data
}
