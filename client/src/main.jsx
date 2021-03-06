import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import axios from 'axios';
import store from './../redux/store/index';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import theme from './components/theme/index';
import './components/theme/styleFont.css';

/* Deploy front Start */
// dotenv.config();
//We need to settle the port for back when we work with the actions. REACT_APP is mandatory, otherwise, it will not work properly
//In order to use Vite, we need to use import.meta.env instead of dotenv.config() and process.env
axios.defaults.baseURL =
	import.meta.env.REACT_APP_API || 'http://localhost:3001';
/* Deploy front End */

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store} >
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
