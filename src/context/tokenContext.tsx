import { createContext, FC, ReactNode, useContext } from 'react'

import useAuthToken from '../hooks/useAuthToken'

type FunctionType = (...args: unknown[]) => Promise<unknown>

export type TokenContextType = {
	fetchService: <T extends FunctionType>(
		serviceFunction: T,
		...args: Parameters<T>
	) => Promise<ReturnType<T>>
}

export const TokenContext = createContext<TokenContextType | null>(null)

interface TokenProviderProps {
	children: ReactNode
}

const TokenProvider: FC<TokenProviderProps> = ({ children }) => {
	const getToken = useAuthToken()

	const fetchService = async <T extends FunctionType>(
		serviceFunction: T,
		...args: Parameters<T>
	): Promise<ReturnType<T>> => {
		await getToken()

		return serviceFunction(...args) as Promise<ReturnType<T>>
	}

	return (
		<TokenContext.Provider value={{ fetchService }}>
			{children}
		</TokenContext.Provider>
	)
}

export default TokenProvider

export const useTokenContext = () => {
	const context = useContext(TokenContext)
	if (!context) {
		throw new Error('useTokenContext must be used within a TokenProvider')
	}
	return context
}
