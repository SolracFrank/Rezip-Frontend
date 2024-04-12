import axiosClient from './axiosClient'

export const authorize = async (token: string) => {
	return await axiosClient.post<boolean>(
		'account/register',
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
}
