'use client'

import { useMutation } from '@tanstack/react-query'
import { createFeedback } from '../api/feedback-api'

export function useCreateFeedbackMutation() {
	return useMutation({ mutationFn: createFeedback })
}
