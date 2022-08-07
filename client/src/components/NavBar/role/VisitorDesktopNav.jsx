import React from 'react';
import { HStack } from '@chakra-ui/react';
import { Link as BuenLink } from 'react-router-dom';

import BtnSignIn from '../../buttons/BtnSignIn';
import BtnSignUp from '../../buttons/BtnSignUp';
import BtnDarkMode from '../../buttons/BtnDarkMode';
import BtnLandingPage from '../../buttons/BtnLandingPage';
import CartDrawer from '../../Cart/Drawer';

const VisitorDesktopNav = () => {
	return (
		<HStack w='100%' h={'100%'} justify='space-around' fontSize={'20px'}>
			<HStack spacing='50px' justify='flex-start' h='100%' p='10px'>
				<BtnLandingPage />
				<BuenLink to='/us'>About</BuenLink>
				<BuenLink to='/books'>Books</BuenLink>
			</HStack>
			<HStack justify={'flex-end'} spacing='50px' h='100%' p='10px'>
				<BtnDarkMode />
				<CartDrawer />
				<BtnSignIn />
				<BtnSignUp />
			</HStack>
		</HStack>
	);
};

export default VisitorDesktopNav;
