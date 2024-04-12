import { InputHTMLAttributes } from 'react'
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
} from 'react-hook-form'

import './forms.css'

interface InputProps<TData extends FieldValues>
	extends InputHTMLAttributes<HTMLInputElement> {
	fieldName: Path<TData>
	register: UseFormRegister<TData>
	placeholder: string
	errors: FieldErrors<TData>
	className?: string
}

const Input = <TData extends Record<string, unknown>>({
	placeholder,
	fieldName,
	errors,
	className,
	register,
	...props
}: InputProps<TData>) => {
	return (
		<div className={className}>
			<div className='relative'>
				<input
					className='input-base'
					id={fieldName}
					type='text'
					{...props}
					{...register(fieldName)}
					placeholder={placeholder}></input>
			</div>
			<div>
				{errors[fieldName] && (
					<span className='text-error'>
						{errors[fieldName]?.message?.toString()}
					</span>
				)}
			</div>
		</div>
	)
}

export default Input
