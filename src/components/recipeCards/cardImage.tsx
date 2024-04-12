import RecipeLogo from '../logo'

interface CardImageProps {
	src: string
}

const CardImage = ({ src }: CardImageProps) => {
	return <RecipeLogo src={src} className='card-image' />
}

export default CardImage

// `https://localhost:7200/api/recipes/logo/${src}`
