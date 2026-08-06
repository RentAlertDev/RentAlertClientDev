import axios from 'axios'

export const httpClient = axios.create({
	headers: {
		'Accept-Language': 'ru'
	},
	withCredentials: true
})
