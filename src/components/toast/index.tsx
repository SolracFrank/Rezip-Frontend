import { createContext, useContext, useState } from 'react'
import { clsx } from 'clsx'
import { XIcon } from 'lucide-react'

import './toast.css'

type toastMode = 'Error' | 'Info' | 'Success'

interface ToastProps<TData> {
	toastInfo: TData | string
	mode: toastMode
	closeToast: () => void
}
const Toast = ({
	toastInfo,
	mode = 'Info',
	closeToast,
}: ToastProps<object>) => {
	return (
		<div className='toast-container'>
			<div
				className={clsx('toast', {
					'toast-error': mode == 'Error',
					'toast-success': mode == 'Success',
				})}>
				<div className='close'>
					<XIcon className='close-icon' onClick={closeToast} width={18} />
				</div>
				{typeof toastInfo == 'object' ? (
					Object.keys(toastInfo).map(key => {
						return (
							<p key={key}>
								<span style={{ fontWeight: 'bold' }}>{key + ' '}</span>
								{`${toastInfo[key as keyof typeof toastInfo]}`}
							</p>
						)
					})
				) : (
					<p>{toastInfo}</p>
				)}
			</div>
		</div>
	)
}
export type showToastType = {
	showToast: (
		toastInfo: string | object,
		mode: toastMode,
		duration?: number
	) => void
}
interface ToastContextProps {
	children: React.ReactNode
}
const toastContext = createContext<showToastType | null>(null)

const ToastProvider = ({ children }: ToastContextProps) => {
	const [toastProps, setToastProps] = useState<ToastProps<object> | null>(null)

	function closeToast() {
		setToastProps(null)
	}

	function showToast(
		toastInfo: string | object,
		mode: toastMode,
		duration = 3000
	) {
		setToastProps({ toastInfo, mode, closeToast })
		setTimeout(() => setToastProps(null), duration)
	}

	return (
		<toastContext.Provider value={{ showToast }}>
			{children}
			{toastProps && <Toast {...toastProps} />}
		</toastContext.Provider>
	)
}

export const useToast = () => useContext(toastContext) as showToastType

export default ToastProvider
