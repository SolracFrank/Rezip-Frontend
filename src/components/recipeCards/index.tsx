import { memo, useState } from 'react'
import { clsx } from 'clsx'
import { XCircleIcon } from 'lucide-react'

import { RecipeType } from '../../types/RecipeTypes'
import Modal from '../modal'

import AddFavorite from './addFavorite'
import CardImage from './cardImage'

interface CardProps {
	recipe: RecipeType
	deleteCard: (id: string) => void
	updateCard: (id: string, owner?: string) => void
	deletable?: boolean
}
const card = ({
	recipe,
	deleteCard,
	updateCard,
	deletable = false,
}: CardProps) => {
	const [modalOpen, setModalOpen] = useState(false)

	const { name, id, description, procedures, createdBy } = recipe
	return (
		<div
			onClick={() => {
				updateCard(id ?? '', createdBy)
			}}
			className={clsx('card')}
			key={id}>
			<div className='card-title'>
				<h1>{name}</h1>
				<div className='separator'></div>
			</div>
			<div className='card-content'>
				<CardImage src={id ?? ''} />
				<p>
					<span>Descripción </span>
					{description}
				</p>
				<p className='procedure'>{procedures}</p>
				{createdBy && createdBy.trim().length > 0 && (
					<>
						<span>Autor:</span>
						<p>{createdBy}</p>
					</>
				)}

				{deletable && (
					<button
						className='close-btn'
						title='close-card'
						name={id}
						onClick={e => {
							e.stopPropagation()
							setModalOpen(true)
						}}>
						<XCircleIcon />
					</button>
				)}

				<AddFavorite id={id ?? ''} />
			</div>
			{modalOpen && (
				<Modal
					onClose={() => {
						setModalOpen(false)
					}}
					onConfirm={() => {
						setModalOpen(false)
						deleteCard(id ?? '')
					}}
				/>
			)}
		</div>
	)
}

const Card = memo(card)
export default Card
