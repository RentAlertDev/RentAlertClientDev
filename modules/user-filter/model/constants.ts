export const USER_FILTER_API = {
	root: '/api/filters',
	byId: (filterId: number) => `/api/filters/${filterId}`,
	activation: (filterId: number, active: boolean) =>
		`/api/filters/${filterId}/activation/${active}`
}

export const USER_FILTER_QUERY_KEYS = {
	all: ['user-filters'] as const
}
