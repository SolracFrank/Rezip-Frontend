import { useEffect, useState } from 'react'
import { BookHeart, ChefHat, CirclePlus, Menu } from 'lucide-react'

import CreateRecipe from '../recipes/createRecipe'
import ShowRecipes from '../recipes/showRecipes'
import ViewRecipe from '../recipes/viewRecipe'

import { ShowContentEnum } from './contentEnum'

const Dashboard = () => {
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [recipeEdit, setRecipeEdit] = useState('')

	const [showContent, setShowContent] = useState<ShowContentEnum>(
		ShowContentEnum.ShowRecipes
	)

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

	const handleUpdateContent = (id: string) => {
		setRecipeEdit(id)
		setShowContent(ShowContentEnum.View)
	}

	const handleBack = (value: ShowContentEnum) => {
		setRecipeEdit('')
		setShowContent(value)
	}
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
						<ShowRecipes
							handleShowContent={handleShowContent}
							updateCard={handleUpdateContent}
						/>
					</>
				)}
				{showContent == ShowContentEnum.AddRecipes && (
					<>
						<CreateRecipe />
					</>
				)}
				{showContent == ShowContentEnum.Favorites && <></>}
				{showContent == ShowContentEnum.View && (
					<ViewRecipe id={recipeEdit} handleBack={handleBack}></ViewRecipe>
				)}
			</section>
		</div>
	)
}

export default Dashboard
