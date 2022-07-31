import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	fonts: {
		heding: 'Poppins',
		body: 'Poppins',
	},
	colors: {
		brand: {
			//pepe is a light cian color
			pepe: '#64c2e4',
			// pepemuyoscuro is a lighten black color
			pepemuyoscuro: '#293241',
			// pepeoscuro is a dark cian color
			pepeoscuro: '#3d5a80',
			//pepeclaro is a white color
			pepeclaro: '#e0fbfc',
		},
	},
});

export default theme;
