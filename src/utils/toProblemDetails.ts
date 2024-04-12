import { AxiosError } from 'axios'

import { ProblemDetail } from '../interface/problemDetails'

const toProblemDetails = (error: unknown): ProblemDetail | undefined => {
	const axiosError = error as AxiosError
	if (!axiosError.isAxiosError) {
		return
	}

	const problemDetail = axiosError.response?.data as ProblemDetail

	return problemDetail
}

export default toProblemDetails
