export interface ProblemDetail {
	type: string | undefined | null
	title: string | undefined | null
	status: number | undefined | null
	detail: string | undefined | null
	instance: string | undefined | null
	errors?: Record<string, string[]> | undefined | null
}
