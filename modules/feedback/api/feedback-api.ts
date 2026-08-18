import { httpClient } from '@/shared/api/http-client'
import { FEEDBACK_API } from '../model/constants'
import type { FeedbackRequest, FeedbackResponse } from '../model/types'

export async function createFeedback(
	data: FeedbackRequest
): Promise<FeedbackResponse> {
	const response = await httpClient.post<FeedbackResponse>(FEEDBACK_API, data)

	return response.data
}
