import { RouterProvider } from 'react-router-dom'

import ToastProvider from './components/toast'
import { router } from './router'

const App = () => {
	return (
		<>
			<ToastProvider>
				<RouterProvider router={router} />
			</ToastProvider>
		</>
	)
}

export default App
