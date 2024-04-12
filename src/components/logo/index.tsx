import { memo, useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { ImageIcon, Upload } from 'lucide-react'

import { getRecipeLogo } from '../../services/recipesService'

interface RecipeLogoProps {
	src: string
	altSrc?: string
	className?: string
	hoverBehavior?: boolean
}

const RecipeLogo = ({
	src,
	altSrc,
	className,
	hoverBehavior = false,
}: RecipeLogoProps) => {
	const [logoUrl, setLogoUrl] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [IsHovering, setIsHovering] = useState(false)

	const logoRef = useRef<HTMLDivElement>(null)

	function mouseEnter() {
		setIsHovering(true)
	}
	function mouseLeave() {
		setIsHovering(false)
	}
	useEffect(() => {
		fetch()

		if (logoRef.current) {
			logoRef.current.addEventListener('mouseenter', mouseEnter)
			logoRef.current.addEventListener('mouseleave', mouseLeave)
			return () => {
				document.removeEventListener('mouseenter', mouseEnter)
				document.removeEventListener('mouseleave', mouseLeave)
			}
		}
	}, [])

	const fetch = async () => {
		if (loading) return
		try {
			setLoading(true)
			const url = await getRecipeLogo(src)
			setLogoUrl(url)
		} catch (error) {
			setError(true)
		} finally {
			setLoading(false)
		}
	}

	const handleRightClick = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		e.preventDefault()
	}

	return (
		<div className={className} ref={logoRef}>
			{loading || error ? (
				<ImageIcon
					className={clsx({
						'animate-pulsing': loading,
					})}
				/>
			) : (
				<>
					<img
						draggable={false}
						onContextMenu={handleRightClick}
						src={altSrc ?? logoUrl}></img>
					{IsHovering && hoverBehavior && <Upload></Upload>}
				</>
			)}
		</div>
	)
}

export default memo(RecipeLogo)

// `https://localhost:7200/api/recipes/logo/${src}`
