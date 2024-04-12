import './modal.css'

interface ModalProps {
	onClose: () => void
	onConfirm: () => void
}
const Modal = ({ onClose, onConfirm }: ModalProps) => {
	return (
		<div className='modal' onClick={e => e.stopPropagation()}>
			<h1>¿Seguro desea eliminar?</h1>
			<div className='divisor'></div>
			<div className='modal-btn'>
				<button
					className='accept'
					onClick={() => {
						onConfirm()
					}}>
					Aceptar
				</button>
				<button
					className='cancel'
					onClick={() => {
						onClose()
					}}>
					Cancelar
				</button>
			</div>
		</div>
	)
}

export default Modal
