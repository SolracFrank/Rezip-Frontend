import { HeartIcon } from 'lucide-react'

interface AddFavoriteProps {
	id: string
}

const AddFavorite = ({ id }: AddFavoriteProps) => {
	return (
		<button
			className='favorite-btn'
			title='add-favorite'
			name={id}
			onClick={e => {
				e.stopPropagation()
			}}>
			<HeartIcon />
		</button>
	)
}

export default AddFavorite
