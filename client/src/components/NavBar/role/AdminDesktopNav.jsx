import React from 'react';
import { HStack } from '@chakra-ui/react';
import { Link as BuenLink } from 'react-router-dom';
import Drawer from '../../Cart/Drawer';
import Signout from '../../SignOut/Signout';
import FavouriteList from '../../UserProfile/FavouriteList';

import BtnDarkMode from '../../buttons/BtnDarkMode';
import BtnLandingPage from '../../buttons/BtnLandingPage';
import BtnAdminDashboard from '../../buttons/BtnAdminDashboard';

const AdminDesktopNav = () => {
	return (
		<HStack w='100%' h={'100%'} justify='space-around' fontSize={'20px'}>
			<HStack spacing='50px' justify='flex-start' h='100%' p='10px'>
				<BtnLandingPage />
				<BuenLink to='/us'>About</BuenLink>
				<BuenLink to='/books'>Books</BuenLink>
			</HStack>
			<HStack justify={'flex-end'} spacing='50px' h='100%' p='10px'>
				<BtnDarkMode />
				<BtnAdminDashboard />
				<Signout />
			</HStack>
		</HStack>
	);
};

export default AdminDesktopNav;
