import { memo, useEffect, useState } from 'react'

import Card from '../../components/recipeCards'
import { useToast } from '../../components/toast'
import useAuthToken from '../../hooks/useAuthToken'
import { deleteRecipe, getAllRecipes } from '../../services/recipesService'
import { RecipeType } from '../../types/RecipeTypes'
import toProblemDetails from '../../utils/toProblemDetails'
import { ShowContentEnum } from '../dashboard/contentEnum'

interface ShowRecipesProps {
	handleShowContent: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void
	updateCard: (id: string) => void
}

const ShowRecipes = memo(function ShowRecipes({
	handleShowContent,
	updateCard,
}: ShowRecipesProps) {
	const [loading, setLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	const [recipes, setRecipes] = useState<RecipeType[]>()
	const token = useAuthToken()

	const { showToast } = useToast()

	useEffect(() => {
		fetchRecipes()
	}, [])

	const fetchRecipes = async () => {
		try {
			if (loading) return
			await token()
			const response = await getAllRecipes()
			setRecipes(response.data)
		} catch (error) {
			const problemDetails = toProblemDetails(error)
			showToast(problemDetails?.detail ?? 'Unknown error', 'Error')
			setIsError(true)
		} finally {
			setLoading(false)
		}
	}

	const deleteCard = async (id: string) => {
		try {
			const response = await deleteRecipe(id)

			if (response.status == 200) {
				const newRecipes = recipes?.filter(recipe => recipe.id != id)
				setRecipes(newRecipes)
			}
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div className='recipe-container'>
			<div className='title'>
				{' '}
				Tus <span>recetas</span>
			</div>
			<div className='card-container'>
				{recipes && recipes.length > 0
					? recipes.map(recipe => (
							<Card
								key={recipe.id}
								recipe={recipe}
								deleteCard={deleteCard}
								updateCard={updateCard}
							/>
						))
					: !loading && (
							<div className='advice'>
								{!isError ? (
									<button
										title='add-recipes'
										name={ShowContentEnum.AddRecipes}
										onClick={handleShowContent}>
										Añade tus recetas
									</button>
								) : (
									<p>Ocurrió un error, vuelve más tarde...</p>
								)}
							</div>
						)}
			</div>
		</div>
	)
})

export default ShowRecipes
