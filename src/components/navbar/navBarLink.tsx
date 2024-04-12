import { Link, LinkProps } from 'react-router-dom'
import { clsx } from 'clsx'

import { NavBarEnum } from './navBarEnum'

interface NavBarLinkProps extends LinkProps {
	activePath: string
	expectedPath: NavBarEnum
	children: React.ReactNode
}
const NavBarLink = ({
	activePath,
	expectedPath,
	children,
	...props
}: NavBarLinkProps) => {
	return (
		<Link
			{...props}
			className={clsx('navbar-link', {
				'navbar-link-current': activePath == expectedPath,
			})}>
			{children}
		</Link>
	)
}

export default NavBarLink
