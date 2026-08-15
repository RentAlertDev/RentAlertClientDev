import axios from 'axios'
import { getRequestLanguage } from '@/shared/lib/language-preference'

export const httpClient = axios.create({
	withCredentials: true
})

let accessToken: string | null = null

export function setHttpAccessToken(token: string | null) {
	accessToken = token
}

httpClient.interceptors.request.use(config => {
	config.headers.set('Accept-Language', getRequestLanguage())

	if (accessToken) {
		config.headers.set('Authorization', `Bearer ${accessToken}`)
	}

	return config
})
