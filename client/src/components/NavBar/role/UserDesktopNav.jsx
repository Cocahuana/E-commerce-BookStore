import React from 'react';
import { HStack } from '@chakra-ui/react';
import { Link as BuenLink } from 'react-router-dom';
import Drawer from '../../Cart/Drawer';
import FavouriteList from '../../UserProfile/FavouriteList';
import BtnDarkMode from '../../buttons/BtnDarkMode';
import BtnLandingPage from '../../buttons/BtnLandingPage';
import UserProfileDropdown from '../../UserProfile/UserProfileDropdown';
import CartDrawer from '../../Cart/Drawer';

const UserDesktopNav = () => {
	return (
		<HStack w='100%' h={'100%'} justify='space-around' fontSize={'20px'}>
			<HStack spacing='50px' justify='flex-start' h='100%' p='10px'>
				<BtnLandingPage />
				<BuenLink to='/us'>About</BuenLink>
				<BuenLink to='/books'>Books</BuenLink>
			</HStack>
			<HStack justify={'flex-end'} spacing='50px' h='100%' p='10px'>
				<FavouriteList widt={'10%'} dis={'none'} />
				<BtnDarkMode />
				<CartDrawer />
				<UserProfileDropdown />
			</HStack>
		</HStack>
	);
};

export default UserDesktopNav;
