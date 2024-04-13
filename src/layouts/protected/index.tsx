import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import LoadingPage from '../../components/loading'

const Protected = () => {
	const { isLoading, isAuthenticated } = useAuth0()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isLoading) {
			if (!isAuthenticated) {
				navigate('/', { replace: true })
			}
		}
	}, [isLoading, isAuthenticated])

	return <div>{isLoading ? <LoadingPage /> : <Outlet />}</div>
}

export default Protected
