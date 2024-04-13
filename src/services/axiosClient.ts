import axios from 'axios'

const api = axios.create({
	baseURL: import.meta.env.VITE_API_CLIENT,
	headers: {
		'Content-Type': 'application/json',
	},
})

// api.interceptors.response.use(
// 	response => response,
// 	async error => {
// 		const axiosError = error as AxiosError

// 		if (
// 			axiosError.response?.status === 401 &&
// 			axiosError.response.headers['www-authenticate']?.includes(
// 				'error_description="The token expired at'
// 			)
// 		) {
// 			if (!error.config._retry) {
// 				error.config._retry = true

// 				const accessToken = await refreshTokenSilently()

// 				if (accessToken) {
// 					api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
// 					return api(error.config)
// 				}
// 			}
// 		}

// 		return Promise.reject(error)
// 	}
// )

const getAuthTokenAxios = () => {
	return api.defaults.headers.common.Authorization?.toString().split(' ')[0]
}

const setAuthTokenAxios = (accessToken: string | undefined) => {
	api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}
const removeAuthTokenAxios = () => {
	delete api.defaults.headers.common.Authorization
}

export default {
	get: api.get,
	post: api.post,
	put: api.put,
	delete: api.delete,
	patch: api.patch,
	setAuthTokenAxios,
	removeAuthTokenAxios,
	getAuthTokenAxios,
}
