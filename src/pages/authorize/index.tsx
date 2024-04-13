import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import LoadingPage from '../../components/loading'
import { showToastType, useToast } from '../../components/toast'
import { authorize } from '../../services/authService'
import toProblemDetails from '../../utils/toProblemDetails'

const Authorize = () => {
	const { isAuthenticated, isLoading, getAccessTokenSilently, logout } =
		useAuth0()
	const { showToast } = useToast() as showToastType

	const [token, setToken] = useState<string>()
	const hasFetched = useRef(false)

	const navigate = useNavigate()
	const fetchUser = async () => {
		if (hasFetched.current) return

		const token = await getAccessTokenSilently({
			authorizationParams: {
				scope: 'read:current_user',
			},
		})
		if (token?.length > 0) setToken(token)
		hasFetched.current = true
	}

	const fetchRegister = async (token: string) => {
		try {
			await authorize(token)

			navigate('/dashboard')
		} catch (error) {
			const problemDetails = toProblemDetails(error)

			showToast(problemDetails?.detail ?? 'Error desconocido', 'Error')
			logout()
			navigate('/')
		}
	}

	useEffect(() => {
		if (!isLoading) {
			if (isAuthenticated) {
				fetchUser()
				return
			}
			navigate('/', { replace: true })
		}
	}, [isLoading, isAuthenticated])

	useEffect(() => {
		if (hasFetched && token && token.length > 0) {
			fetchRegister(token)
		}
	}, [token])

	return <LoadingPage />
}

export default Authorize
