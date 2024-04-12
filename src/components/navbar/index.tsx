import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from 'lucide-react'

import { NavBarEnum } from './navBarEnum'
import NavBarLink from './navBarLink'

const NavBar = () => {
	const { isAuthenticated, logout, loginWithRedirect, user, isLoading } =
		useAuth0()
	const [activePath, setActivePath] = useState<string>('')
	useEffect(() => {
		const params = window.location.pathname.split('/')
		setActivePath(params[params.length - 1])
	}, [])

	return (
		<>
			{isLoading ? (
				<></>
			) : (
				<nav className='navbar'>
					<div className='navbar-element'>
						<NavBarLink
							activePath={activePath}
							expectedPath={NavBarEnum.Home}
							to='/'>
							Home
						</NavBarLink>
					</div>
					<div className='navbar-collection'>
						{isAuthenticated ? (
							<>
								<div className='navbar-element'>
									<NavBarLink
										activePath={activePath}
										expectedPath={NavBarEnum.Dashboard}
										to='/dashboard'>
										Dashboard
									</NavBarLink>
								</div>
								<div className='navbar-element'>
									<NavBarLink
										activePath={activePath}
										expectedPath={NavBarEnum.Dashboard}
										to=''>
										{user?.picture ? (
											<img
												className='user-navigation'
												src={user?.picture}
												alt=''
											/>
										) : (
											<User />
										)}
									</NavBarLink>
								</div>
								<button
									title='logout'
									name='logout'
									className='navbar-element element-closed'
									onClick={() => {
										logout()
									}}>
									Logout
								</button>
							</>
						) : (
							<>
								<button
									title='login'
									name='login'
									className='navbar-element'
									onClick={() => {
										loginWithRedirect()
									}}>
									Sign In
								</button>
							</>
						)}
					</div>
				</nav>
			)}
		</>
	)
}

export default NavBar
