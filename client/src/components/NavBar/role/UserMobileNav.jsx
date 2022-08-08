import React from 'react';
import {
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as BuenLink } from 'react-router-dom';
import Signout from '../../SignOut/Signout';
import BtnDarkMode from '../../buttons/BtnDarkMode';
import CartDrawer from '../../Cart/Drawer';
import FavouriteList from '../../UserProfile/FavouriteList';

const UserMobileNav = () => {
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label='Options'
				icon={<HamburgerIcon />}
				variant='outline'
			/>
			<MenuList>
				<MenuItem>
					<BtnDarkMode /> <FavouriteList widt={'10%'} dis={'none'} />{' '}
					<CartDrawer />
				</MenuItem>
				<MenuItem>
					<BuenLink to='/us'>About us</BuenLink>
				</MenuItem>
				<MenuItem>
					<BuenLink to='/books'>Books</BuenLink>
				</MenuItem>
				<MenuItem>
					<Signout />
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default UserMobileNav;
