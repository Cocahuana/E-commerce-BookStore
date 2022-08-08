import React from 'react';
import { Link as BuenLink } from 'react-router-dom';
import {
	Text,
	useColorModeValue,
	useBreakpointValue,
	useColorMode,
	Highlight,
} from '@chakra-ui/react';
const BtnLandingPage = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<BuenLink to='/'>
			<Text
				textAlign={useBreakpointValue({
					base: 'center',
					md: 'left',
				})}
				color={useColorModeValue('gray.800', 'white')}>
				<Highlight
					query={'E-Book'}
					styles={{
						px: '1',
						py: '1',
						rounded: 'xl',
						bg: 'brand.pepe',
						color: 'white',
					}}>
					E-BookStore
				</Highlight>
			</Text>
		</BuenLink>
	);
};

export default BtnLandingPage;
