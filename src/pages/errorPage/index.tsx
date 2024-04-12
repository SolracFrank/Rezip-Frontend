import { Link, useRouteError } from 'react-router-dom'

import {} from './error.css'

interface ErrorData {
	status: number
	statusText?: string
	message?: string
	error?: { message: string; stack: string }
	data: string
}

const ErrorPage = () => {
	const rawError = useRouteError()

	const error: ErrorData | undefined =
		typeof rawError === 'object' ? (rawError as ErrorData) : undefined
	console.error(error)
	return (
		<div id='error-page' className='page'>
			<p className='font-thin text-3xl text-center'>
				{error && (
					<p className='italic'>
						{error.status} {': '}
						{error.statusText}
					</p>
				)}
				{error?.error && <p className='font-semibold'>{error.error.message}</p>}
			</p>
			<div className='mt-4'>
				{error && error.status >= 400 && error.status < 500 && (
					<Link className='button-back' to='/'>
						Go back home
					</Link>
				)}
			</div>
		</div>
	)
}

export default ErrorPage
