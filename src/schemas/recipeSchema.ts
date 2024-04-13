import { z, ZodType } from 'zod'

import { RecipeType } from '../types/RecipeTypes'
import {
	ACCEPTED_IMAGE_TYPES,
	ACCEPTED_MIMETYPES,
	MAX_IMAGE_SIZE,
} from '../utils/recipeLogoRequirements'

export const createRecipeSchema: ZodType<RecipeType> = z.object({
	name: z
		.string()
		.min(1, { message: 'Nombre es requerido' })
		.max(100, { message: 'El máximo largo es 100' }),
	description: z
		.string()
		.max(100, { message: 'El máximo largo es 100' })
		.optional(),
	procedures: z.string().min(1, { message: 'Es requerido' }),
	logo: z
		.any()
		.refine(files => files && files.length > 0, 'El logo es requerido.')
		.refine(
			files => files[0]?.size <= MAX_IMAGE_SIZE,
			`El tamaño máximo de la imagen es de ${MAX_IMAGE_SIZE}`
		)
		.refine(
			files => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
			`Solo se aceptan formatos de imagen ${ACCEPTED_MIMETYPES}`
		),
})

export const updateRecipeSchema: ZodType<RecipeType> = z.object({
	name: z
		.string()
		.min(1, { message: 'Nombre es requerido' })
		.max(100, { message: 'El máximo largo es 100' }),
	description: z
		.string()
		.max(100, { message: 'El máximo largo es 100' })
		.optional(),
	procedures: z.string().min(1, { message: 'Es requerido' }),
	logo: z
		.any()
		.optional()
		.refine(files => {
			return (
				files.length === 0 ||
				(files?.[0]?.size <= MAX_IMAGE_SIZE && files?.[0]?.size > 0)
			)
		}, `El tamaño máximo de la imagen es de ${MAX_IMAGE_SIZE}`)
		.optional()
		.refine(
			files =>
				!files ||
				files.length === 0 ||
				(files[0] && ACCEPTED_IMAGE_TYPES.includes(files[0]?.type)),
			`Solo se aceptan formatos de imagen ${ACCEPTED_MIMETYPES}`
		)
		.optional(),
})

export const logoOnlySchema: ZodType<Partial<RecipeType>> = z.object({
	logo: z
		.any()
		.refine(files => files && files.length > 0, 'El logo es requerido.')
		.refine(
			files => files[0]?.size <= MAX_IMAGE_SIZE,
			`El tamaño máximo de la imagen es de ${MAX_IMAGE_SIZE}`
		)
		.refine(
			files => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
			`Solo se aceptan formatos de imagen ${ACCEPTED_MIMETYPES}`
		),
})
