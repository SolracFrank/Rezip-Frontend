import { useEffect, useState } from 'react'
import { BookHeart, ChefHat, CirclePlus, Menu } from 'lucide-react'

import { useRecipes } from '../../context/recipeContext'
import CreateRecipe from '../recipes/createRecipe'
import ShowFavorites from '../recipes/favorites'
import ShowRecipes from '../recipes/showRecipes'
import ViewRecipe from '../recipes/viewRecipe'

import { ShowContentEnum } from './contentEnum'

const Dashboard = () => {
	const { handleBack, handleShowContent, recipeEdit, showContent, owner } =
		useRecipes()
	const [sidebarOpen, setSidebarOpen] = useState(true)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setSidebarOpen(true)
			} else {
				setSidebarOpen(false)
			}
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div>
			<nav className='dashboard-nav'>
				<button
					onClick={() => {
						setSidebarOpen(!sidebarOpen)
					}}>
					<Menu />
					Menu
				</button>
			</nav>
			{sidebarOpen && (
				<div className={'dashboard-side'}>
					<button
						title='show-recipes'
						name={ShowContentEnum.ShowRecipes}
						onClick={handleShowContent}>
						<ChefHat /> Recipes
					</button>
					<button
						title='add-recipes'
						name={ShowContentEnum.AddRecipes}
						onClick={handleShowContent}>
						<CirclePlus /> Add Recipe
					</button>
					<button
						title='favorites-recipes'
						name={ShowContentEnum.Favorites}
						onClick={handleShowContent}>
						<BookHeart /> Favorites
					</button>
					<div className='filler' />
				</div>
			)}
			<section className='dashboard-content'>
				{showContent == ShowContentEnum.ShowRecipes && (
					<>
						<ShowRecipes />
					</>
				)}
				{showContent == ShowContentEnum.AddRecipes && (
					<>
						<CreateRecipe />
					</>
				)}
				{showContent == ShowContentEnum.Favorites && (
					<>
						<ShowFavorites />
					</>
				)}
				{showContent == ShowContentEnum.View && (
					<ViewRecipe
						id={recipeEdit}
						handleBack={handleBack}
						owner={owner}></ViewRecipe>
				)}
			</section>
		</div>
	)
}

export default Dashboard
