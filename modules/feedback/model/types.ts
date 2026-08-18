export interface FeedbackRequest {
	message?: string
	rating: number
}

export interface FeedbackResponse {
	id: number
	userId: number
	username?: string
	message?: string
	rating: number
	createdAt?: string
	updatedAt?: string
}
