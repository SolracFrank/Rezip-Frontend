import { InputHTMLAttributes, useState } from 'react'
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
} from 'react-hook-form'
import { FolderOpenIcon } from 'lucide-react'

import './forms.css'

interface InputProps<TData extends FieldValues>
	extends InputHTMLAttributes<HTMLInputElement> {
	fieldName: Path<TData>
	register: UseFormRegister<TData>
	placeholder: string
	errors: FieldErrors<TData>
	className?: string
	display?: string
}

const FileInput = <TData extends Record<string, unknown>>({
	placeholder,
	fieldName,
	errors,
	className,
	display = 'Seleccionar archivo',
	register,
	...props
}: InputProps<TData>) => {
	const [selectedFile, setSelectedFile] = useState<string>(display)

	return (
		<div className={className}>
			<div className='file-space'>
				<div>
					<button type='button' className='file-btn cursor-pointer'>
						<label className='' htmlFor='file'>
							<FolderOpenIcon />
							<span>Examinar</span>
						</label>
					</button>
				</div>
				<div className='input-file'>
					<input
						hidden
						id='file'
						type='file'
						{...props}
						{...register(fieldName, {
							onChange(e) {
								if (e.target.files === null) return
								const file = e.target.files[0] as File
								setSelectedFile(file?.name)
							},
						})}
						placeholder={placeholder}
					/>
					<label className=''>{selectedFile}</label>
				</div>
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

export default FileInput
