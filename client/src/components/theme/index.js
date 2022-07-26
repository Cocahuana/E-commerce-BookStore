import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	fonts: {
		heding: 'Poppins',
		body: 'Poppins',
	},
	colors: {
		brand: {
			pepe: '#64c2e4',
			pepemuyoscuro: '#293241',
			pepeoscuro: '#3d5a80',
			pepeclaro: '#e0fbfc',
		},
	},
});

export default theme;
