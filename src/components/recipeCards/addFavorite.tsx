import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { HeartIcon } from 'lucide-react'

import { useRecipes } from '../../context/recipeContext'
import useAuthToken from '../../hooks/useAuthToken'
import {
	addFavoriteById,
	removeFavoriteById,
} from '../../services/recipesService'

interface AddFavoriteProps {
	id: string
}

const AddFavorite = ({ id }: AddFavoriteProps) => {
	const { favoritesId, setFavoritesId } = useRecipes()
	const token = useAuthToken()
	const [isFavorite, setIsFavorite] = useState(false)
	const [isChanging, setIsChanging] = useState(false)

	const GetIsFavorite = () => {
		if (favoritesId) {
			const favorite = favoritesId.includes(id)
			setIsFavorite(favorite)
		}
	}
	useEffect(() => {
		GetIsFavorite()
	}, [favoritesId])

	const addFavorite = async () => {
		try {
			if (isChanging) return
			setIsChanging(true)
			await token()
			const response = await addFavoriteById(id)
			if (response.status == 200) {
				setIsFavorite(true)
				const newIdGroup = new Set(favoritesId)
				newIdGroup.add(id)
				setFavoritesId(Array.from(newIdGroup))
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsChanging(false)
		}
	}

	const removeFavorite = async () => {
		try {
			if (isChanging) return
			setIsChanging(true)
			await token()
			const response = await removeFavoriteById(id)
			if (response.status == 200) {
				setIsFavorite(false)
				const newIdGroup = new Set(favoritesId)
				newIdGroup.delete(id)
				setFavoritesId(Array.from(newIdGroup))
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsChanging(false)
		}
	}

	return (
		<>
			<button
				className={clsx('favorite-btn')}
				title={`${isFavorite ? 'add-favorite' : 'remove-favorite'}`}
				name={id}
				onClick={e => {
					e.stopPropagation()
					if (isFavorite) {
						//todo
						removeFavorite()
					} else {
						addFavorite()
					}
				}}>
				<HeartIcon
					className={clsx('fill-hovering', {
						'fill-favorite': isFavorite && !isChanging,
						'fill-loading': isChanging,
					})}
				/>
			</button>
		</>
	)
}

export default AddFavorite
