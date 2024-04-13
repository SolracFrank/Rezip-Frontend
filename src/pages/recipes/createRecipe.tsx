import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'

import FileInput from '../../components/forms/fileInput'
import Input from '../../components/forms/input'
import TextArea from '../../components/forms/textArea'
import { useToast } from '../../components/toast'
import useAuthToken from '../../hooks/useAuthToken'
import { createRecipeSchema } from '../../schemas/recipeSchema'
import { addRecipe } from '../../services/recipesService'
import { RecipeType } from '../../types/RecipeTypes'
import { ACCEPTED_MIMETYPES } from '../../utils/recipeLogoRequirements'
import toProblemDetails from '../../utils/toProblemDetails'

import './recipes.css'

const CreateRecipe = () => {
	const [loading, setLoading] = useState(false)
	const { showToast } = useToast()
	const token = useAuthToken()
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<RecipeType>({ resolver: zodResolver(createRecipeSchema) })

	const onSubmit: SubmitHandler<RecipeType> = async data => {
		try {
			if (loading) return
			setLoading(true)
			await token()
			const response = await addRecipe(data)
			showToast(response.data, 'Success')
		} catch (error) {
			const problemDetails = toProblemDetails(error)
			setError('root', {
				type: 'manual',
				message: problemDetails?.detail ?? 'error desconocido',
			})
			showToast(problemDetails?.detail ?? 'Unknown error', 'Error')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className='form'>
				<Input<RecipeType>
					type='text'
					fieldName='name'
					errors={errors}
					placeholder='Nombre'
					register={register}
				/>
				<Input<RecipeType>
					type='text'
					fieldName='description'
					errors={errors}
					placeholder='Descripción'
					register={register}
				/>
				<TextArea<RecipeType>
					fieldName='procedures'
					resize={false}
					rows={10}
					errors={errors}
					placeholder='Procedimiento'
					register={register}
				/>
				<FileInput<RecipeType>
					fieldName='logo'
					display='Seleccionar logo'
					accept={ACCEPTED_MIMETYPES}
					errors={errors}
					placeholder='Logo'
					register={register}
				/>
				{errors.root && errors.root.message && (
					<div className='errors'>
						<p>{errors.root.message}</p>
					</div>
				)}
				<button
					type='submit'
					className={clsx('submit-btn', {
						'animate-pulsing': loading,
					})}
					disabled={loading}>
					{''}
					{loading ? 'Guardando' : 'Guardar'}
				</button>
			</form>
		</div>
	)
}

export default CreateRecipe
