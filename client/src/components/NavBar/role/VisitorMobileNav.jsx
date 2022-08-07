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
import BtnDarkMode from '../../buttons/BtnDarkMode';

const VisitorMobileNav = () => {
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
					<BtnDarkMode />
				</MenuItem>
				<MenuItem>
					<BuenLink to='/us'>About us</BuenLink>
				</MenuItem>
				<MenuItem>
					<BuenLink to='/books'>Books</BuenLink>
				</MenuItem>
				<MenuItem>
					<BuenLink to='/login'>Sign In</BuenLink>
				</MenuItem>
				<MenuItem>
					<BuenLink to='/register'>Sign Up</BuenLink>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default VisitorMobileNav;
