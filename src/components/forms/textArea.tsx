import { TextareaHTMLAttributes, useEffect, useRef, useState } from 'react'
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
} from 'react-hook-form'
import { clsx } from 'clsx'

import './forms.css'

interface InputProps<TData extends FieldValues>
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	fieldName: Path<TData>
	resize: boolean
	register: UseFormRegister<TData>
	placeholder: string
	errors: FieldErrors<TData>
	className?: string
}

const TextArea = <TData extends Record<string, unknown>>({
	placeholder,
	fieldName,
	resize = true,
	errors,
	register,
	className,
	...props
}: InputProps<TData>) => {
	const [watcher, setWatcher] = useState(0)
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (!ref.current) return
		const textArea = ref.current.querySelector<HTMLTextAreaElement>('textarea')
		if (textArea) {
			textArea.style.height = `auto`
			textArea.style.height = `${textArea.scrollHeight}px`
		}
	}, [watcher])

	return (
		<div className={className}>
			<div className='relative' ref={ref}>
				<textarea
					className={clsx('input-base', {
						'no-resize': !resize,
					})}
					id={fieldName}
					{...props}
					{...register(fieldName, {
						onChange(e) {
							props.onChange?.(e)
							setWatcher(prev => prev + 1)
						},
					})}
					placeholder={placeholder}
					style={{ overflow: 'hidden', height: 'auto' }}></textarea>
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

export default TextArea
