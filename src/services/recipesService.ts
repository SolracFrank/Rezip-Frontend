import { RecipeType } from '../types/RecipeTypes'
import { formBuilder } from '../utils/formBuilder'

import axiosClient from './axiosClient'

export const addRecipe = async (recipe: RecipeType) => {
	const formData = formBuilder(recipe)

	const response = await axiosClient.post<RecipeType>('recipes', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
	return response
}

export const getAllRecipes = async () => {
	const response = await axiosClient.get<RecipeType[]>('recipes')

	return response
}
export const getRecipeLogo = async (id: string) => {
	const response = await axiosClient.get(`recipes/logo/${id}`, {
		responseType: 'blob',
	})
	const url = window.URL.createObjectURL(new Blob([response.data]))
	return url
}

export const deleteRecipe = async (id: string) => {
	const response = await axiosClient.delete<string>(`recipes/${id}`)

	return response
}

export const getRecipeById = async (id: string) => {
	const response = await axiosClient.get<RecipeType>(`recipes/${id}`)

	return response
}

export const updateRecipe = async (recipe: RecipeType) => {
	const formData = formBuilder(recipe)

	const response = await axiosClient.put<string>(
		`recipes/${recipe.id}`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	)
	return response
}
