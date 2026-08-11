export function getSafeStatusColor(color?: string) {
	if (!color || !/^#[\da-f]{6}$/i.test(color)) {
		return undefined
	}

	return color
}
