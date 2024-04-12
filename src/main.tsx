import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'

import TokenProvider from './context/tokenContext.tsx'
import App from './App.tsx'

import './index.css'

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const client = import.meta.env.VITE_AUTH0_CLIENT
const audience = import.meta.env.VITE_AUTH0_AUDIENCE
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Auth0Provider
			domain={domain}
			clientId={client}
			authorizationParams={{
				redirect_uri: window.location.origin + '/authorize',
				audience: audience,
				scope:
					'read:current_user update:current_user_metadata openid profile email read:messages write:messages',
			}}>
			<TokenProvider>
				<App />
			</TokenProvider>
		</Auth0Provider>
	</StrictMode>
)
