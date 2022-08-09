import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import axios from 'axios';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import './index.css';
import theme from './components/theme/index';
import './components/theme/styleFont.css';
import { AuthContextProvider } from './components/firebase/context';

/* Deploy front Start */
// require('dotenv').config();
// require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config();
//We need to settle the port for back when we work with the actions. REACT_APP is mandatory, otherwise, it will not work properly
//In order to use Vite, we need to use import.meta.env instead of dotenv.config() and process.env
axios.defaults.baseURL =
	import.meta.env.VITE_APP_API || 'http://localhost:3001';

/* Deploy front End */
//blank screen bug

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<AuthContextProvider>
				<ChakraProvider theme={theme}>
					<ColorModeProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</ColorModeProvider>
				</ChakraProvider>
			</AuthContextProvider>
		</Provider>
	</React.StrictMode>
);
