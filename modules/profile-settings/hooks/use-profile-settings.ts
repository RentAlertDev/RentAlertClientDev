'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	confirmEmailActivation,
	getNotificationSettings,
	prepareEmailActivation,
	updateNotificationSettings,
	updateProfileSettings
} from '../api/profile-settings-api'

export function useNotificationSettingsQuery() {
	return useQuery({ queryKey: ['profile', 'notifications'], queryFn: getNotificationSettings, staleTime: 60_000 })
}

export function useUpdateNotificationSettingsMutation() {
	const client = useQueryClient()
	return useMutation({ mutationFn: updateNotificationSettings, onSuccess: data => client.setQueryData(['profile', 'notifications'], data) })
}

export function useUpdateProfileSettingsMutation() {
	const client = useQueryClient()
	return useMutation({ mutationFn: updateProfileSettings, onSuccess: (data, variables) => client.setQueryData(['profile', 'me'], { ...data, quietFrom: variables.quietFrom ?? undefined, quietTo: variables.quietTo ?? undefined }) })
}

export function usePrepareEmailActivationMutation() {
	return useMutation({ mutationFn: prepareEmailActivation })
}

export function useConfirmEmailActivationMutation() {
	return useMutation({ mutationFn: confirmEmailActivation })
}
