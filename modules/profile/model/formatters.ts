export function formatProfileDate(value: string) {
	const date = new Date(value)

	if (Number.isNaN(date.getTime())) {
		return value
	}

	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date)
}

export function formatBotStatus(value: string) {
	if (value === 'ACTIVE') {
		return 'Активен'
	}

	return value
}

export function formatUserRole(value: string) {
	if (value === 'USER') {
		return 'Пользователь'
	}

	return value
}
