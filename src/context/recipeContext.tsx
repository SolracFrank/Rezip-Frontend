import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

import useAuthToken from '../hooks/useAuthToken'
import { ShowContentEnum } from '../pages/dashboard/contentEnum'
import { getFavoritesId } from '../services/recipesService'
type RecipeContextType = {
	handleShowContent: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void
	setShowContent: React.Dispatch<React.SetStateAction<ShowContentEnum>>
	showContent: ShowContentEnum
	recipeEdit: string
	handleUpdateContent: (id: string) => void
	handleBack: (value: ShowContentEnum) => void
	favoritesId: string[] | undefined
	setFavoritesId: React.Dispatch<React.SetStateAction<string[] | undefined>>
	owner?: string
}

const RecipeContext = createContext<RecipeContextType | null>(null)

interface recipeContextProps {
	children: ReactNode
}

export const RecipeProvider = ({ children }: recipeContextProps) => {
	const token = useAuthToken()
	const [showContent, setShowContent] = useState<ShowContentEnum>(
		ShowContentEnum.ShowRecipes
	)
	const [recipeEdit, setRecipeEdit] = useState('')
	const [owner, setOwner] = useState<string>()

	const [favoritesId, setFavoritesId] = useState<string[]>()

	const fetchFavoritesId = async () => {
		try {
			await token()
			const response = await getFavoritesId()

			setFavoritesId(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchFavoritesId()
	}, [])

	const handleShowContent = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (e.target instanceof HTMLButtonElement) {
			const { name } = e.target
			if (Object.values(ShowContentEnum).includes(name as ShowContentEnum)) {
				setShowContent(name as ShowContentEnum)
			}
		}
	}

	const handleUpdateContent = (id: string, owner?: string) => {
		setRecipeEdit(id)
		setShowContent(ShowContentEnum.View)
		setOwner(owner)
	}

	const handleBack = (value: ShowContentEnum) => {
		setRecipeEdit('')
		setShowContent(value)
	}
	const value = useMemo(
		() => ({
			handleShowContent,
			setShowContent,
			showContent,
			recipeEdit,
			handleUpdateContent,
			handleBack,
			favoritesId,
			setFavoritesId,
			owner,
		}),
		[showContent, recipeEdit, favoritesId]
	)
	return (
		<RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
	)
}

export const useRecipes = () => {
	const context = useContext(RecipeContext) as RecipeContextType

	return context
}
