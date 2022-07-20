import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import store from './../redux/store/index';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import './index.css';
import theme from './components/theme/index';
import './components/theme/styleFont.css';

/* Deploy front Start */
import dotenv from 'dotenv';
// dotenv.config();
//We need to settle the port for back when we work with the actions. REACT_APP is mandatory, otherwise, it will not work properly
// axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
/* Deploy front End */

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
);
