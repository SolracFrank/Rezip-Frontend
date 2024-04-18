import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { Edit, XCircleIcon } from 'lucide-react'

import Input from '../../components/forms/input'
import TextArea from '../../components/forms/textArea'
import LoadingPage from '../../components/loading'
import RecipeLogo from '../../components/logo'
import { useToast } from '../../components/toast'
import useAuthToken from '../../hooks/useAuthToken'
import { logoOnlySchema, updateRecipeSchema } from '../../schemas/recipeSchema'
import { getRecipeById, updateRecipe } from '../../services/recipesService'
import { RecipeType } from '../../types/RecipeTypes'
import { ACCEPTED_MIMETYPES } from '../../utils/recipeLogoRequirements'
import toProblemDetails from '../../utils/toProblemDetails'
import { ShowContentEnum } from '../dashboard/contentEnum'

import './recipes.css'
interface ViewRecipeProps {
	id: string
	handleBack: (value: ShowContentEnum) => void
	owner?: string
}

const ViewRecipe = ({ id, handleBack, owner }: ViewRecipeProps) => {
	const [loading, setLoading] = useState(false)
	const [recipe, setRecipe] = useState<RecipeType>()
	const [isEdit, setIsEdit] = useState(false)
	const [selectedFile, setSelectedFile] = useState<string>()
	const [newLogo, setNewLogo] = useState<string>()

	const { showToast } = useToast()
	const token = useAuthToken()

	const titleRef = useRef<HTMLDivElement>(null)
	const {
		register,
		handleSubmit,
		watch,
		setError,
		reset,
		formState: { errors },
	} = useForm<RecipeType>({
		resolver: zodResolver(updateRecipeSchema),
		defaultValues: recipe,
	})

	const fetchRecipe = async () => {
		try {
			await token()
			setLoading(true)
			console.log(id)

			const r = await getRecipeById(id)
			setRecipe(r.data)
			reset(r.data)
		} catch (error) {
			console.log(error)
			handleBack(ShowContentEnum.ShowRecipes)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if (loading) return

		fetchRecipe()
	}, [])

	useEffect(() => {
		if (!isEdit) {
			reset()
		} else {
			if (titleRef.current) {
				const div = titleRef.current
				div.querySelector('input')?.focus()
			}
		}
	}, [isEdit])

	const onSubmit: SubmitHandler<RecipeType> = async data => {
		try {
			if (loading) return
			data.id = recipe?.id
			await token()
			const response = await updateRecipe(data)
			if (response.status >= 200 && response.status < 300) {
				handleBack(ShowContentEnum.ShowRecipes)
			}
		} catch (error) {
			const problemDetails = toProblemDetails(error)
			setError('root', {
				type: 'manual',
				message: problemDetails?.detail ?? 'error desconocido',
			})
			console.error(error)
			showToast(problemDetails?.detail ?? 'Unknown error', 'Error')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const a = watch((data, { ..._arg }) => {
			const { logo } = data
			if (logo && logo != recipe?.logo) {
				const validate = logoOnlySchema.safeParse({ logo })
				if (validate.success) {
					const url = window.URL.createObjectURL(logo[0]!)
					setNewLogo(url)
				}
			}
		})

		return () => a.unsubscribe()
	}, [watch])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='view-container'>
			{loading ? (
				<LoadingPage />
			) : (
				<>
					<div className='view-title relative'>
						<div ref={titleRef}>
							<Input
								readOnly={!isEdit}
								className='view-input view-title-content'
								errors={errors}
								fieldName='name'
								register={register}
								placeholder=''
							/>
						</div>
						{!(owner && owner.trim().length > 0) && (
							<button
								type='button'
								name='edit-logo'
								title='edit-logo'
								className='edit-icon'
								onClick={() => {
									setIsEdit(prev => !prev)
									setSelectedFile(undefined)
									setNewLogo(undefined)
								}}>
								{isEdit ? <XCircleIcon /> : <Edit />}
							</button>
						)}
					</div>
					<div className='view-image-container'>
						<label htmlFor={`${isEdit && 'file'}`}>
							<RecipeLogo
								hoverBehavior
								altSrc={newLogo}
								className={clsx('view-image ', {
									'pointer-image': isEdit,
									'view-image-no-edit': !isEdit,
								})}
								src={id}
							/>
						</label>
						{selectedFile && (
							<div className='file-name'>
								<label> {selectedFile}</label>
							</div>
						)}
						<input
							hidden
							id='file'
							type='file'
							accept={ACCEPTED_MIMETYPES}
							{...register('logo', {
								onChange(e) {
									if (e.target.files === null) return
									const file = e.target.files[0] as File
									setSelectedFile(file?.name)
								},
							})}
						/>
						<div>
							{errors.logo && (
								<span className='text-error'>
									{errors.logo.message?.toString()}
								</span>
							)}
						</div>
					</div>
					<div className='view-body'>
						<label htmlFor='description'>Descripción</label>
						<Input
							readOnly={!isEdit}
							className='view-input view-desc'
							errors={errors}
							fieldName='description'
							register={register}
							placeholder=''
						/>

						<label htmlFor='procedures'>Procedimientos</label>
						<TextArea
							readOnly={!isEdit}
							className='view-input'
							errors={errors}
							fieldName='procedures'
							register={register}
							placeholder=''
							resize={false}
						/>
						{isEdit && (
							<div className='submit'>
								<button className='submit-recipe' type='submit'>
									Guardar cambios
								</button>
							</div>
						)}
					</div>
					<div>
						{errors.root && (
							<span className='text-error'>
								{errors.root.message?.toString()}
							</span>
						)}
					</div>
				</>
			)}
		</form>
	)
}

export default ViewRecipe
