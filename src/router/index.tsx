import { createBrowserRouter } from 'react-router-dom'

import { RecipeProvider } from '../context/recipeContext'
import TokenProvider from '../context/tokenContext'
import MainLayout from '../layouts/main'
import Protected from '../layouts/protected'
import Authorize from '../pages/authorize'
import Dashboard from '../pages/dashboard'
import ErrorPage from '../pages/errorPage'
import CreateRecipe from '../pages/recipes/createRecipe'
import UnProtected from '../pages/unprotected'

export const router = createBrowserRouter([
	{
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		path: '/',
		children: [
			{
				element: <UnProtected />,
				index: true,
			},
			{
				element: <Authorize />,
				path: '/authorize',
			},
			{
				element: (
					<TokenProvider>
						<Protected />
					</TokenProvider>
				),
				path: '/dashboard',
				children: [
					{
						element: (
							<RecipeProvider>
								<Dashboard />
							</RecipeProvider>
						),
						index: true,
					},
					{
						element: <CreateRecipe />,
						path: 'recipes',
					},
				],
			},
		],
	},
])
