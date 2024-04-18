import { memo, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'

import Card from '../../components/recipeCards'
import { useToast } from '../../components/toast'
import { useRecipes } from '../../context/recipeContext'
import useAuthToken from '../../hooks/useAuthToken'
import {
	deleteRecipe,
	getAllGeneralRecipes,
	getAllRecipes,
} from '../../services/recipesService'
import { RecipeType } from '../../types/RecipeTypes'
import toProblemDetails from '../../utils/toProblemDetails'
import { ShowContentEnum } from '../dashboard/contentEnum'

enum ModeEnum {
	Own = 'own',
	General = 'general',
}

const ShowRecipes = memo(function ShowRecipes() {
	const { handleShowContent, handleUpdateContent } = useRecipes()
	const [loading, setLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [ownMode, setOwnMode] = useState(ModeEnum.Own)

	const [recipes, setRecipes] = useState<RecipeType[]>()
	const token = useAuthToken()

	const { showToast } = useToast()

	useEffect(() => {
		fetchOwnRecipes()
	}, [ownMode])

	const fetchOwnRecipes = async () => {
		try {
			if (loading) return
			await token()
			let response: AxiosResponse<RecipeType[], unknown>
			if (ownMode == ModeEnum.Own) {
				response = await getAllRecipes()
			} else {
				response = await getAllGeneralRecipes()
			}
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

	const handleMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		if (Object.values(ModeEnum).includes(value as ModeEnum)) {
			setOwnMode(value as ModeEnum)
		}
	}
	return (
		<div className='recipe-container'>
			<select defaultValue={ModeEnum.Own} onChange={handleMode}>
				<option value={ModeEnum.Own}>Propias</option>
				<option value={ModeEnum.General}>Todas</option>
			</select>
			<div className='title'>
				{' '}
				Tus <span>recetas</span>
			</div>
			<div className='card-container'>
				{recipes && recipes.length > 0
					? recipes.map(recipe => (
							<Card
								deletable={ownMode == ModeEnum.Own}
								key={recipe.id}
								recipe={recipe}
								deleteCard={deleteCard}
								updateCard={handleUpdateContent}
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
