'use client'

import { useQuery } from '@tanstack/react-query'
import { getAppSettings } from '../api/get-app-settings'

export function useAppSettingsQuery() {
	return useQuery({ queryKey: ['app-settings'], queryFn: getAppSettings, staleTime: 24 * 60 * 60 * 1000 })
}
