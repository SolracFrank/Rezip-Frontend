import { useAuth0 } from '@auth0/auth0-react'

import axiosClient from '../services/axiosClient'
const useAuthToken = () => {
	const { getAccessTokenSilently } = useAuth0()

	const audience = import.meta.env.VITE_AUTH0_AUDIENCE

	const fetchToken = async () => {
		try {
			const accessToken = await getAccessTokenSilently({
				authorizationParams: {
					audience: audience,

					scope: 'read:current_user',
				},
			})
			axiosClient.setAuthTokenAxios(accessToken)
		} catch (error) {
			console.error('Error al obtener el token:', error)
		}
	}

	return fetchToken
}

export default useAuthToken
