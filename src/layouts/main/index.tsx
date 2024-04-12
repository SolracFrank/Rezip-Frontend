import { Outlet } from 'react-router-dom'

import NavBar from '../../components/navbar'

const MainLayout = () => {
	return (
		<div className='main font-nnt'>
			<NavBar />
			<div className='content'>
				<Outlet></Outlet>
			</div>
		</div>
	)
}

export default MainLayout
