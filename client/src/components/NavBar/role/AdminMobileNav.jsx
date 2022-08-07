import React, { useEffect } from 'react';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Switch,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	useColorMode,
	Center,
	HStack,
	Menu,
	MenuButton,
	Avatar,
	MenuList,
	MenuItem,
	MenuDivider,
	Highlight,
} from '@chakra-ui/react';
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
} from '@chakra-ui/icons';
import { Link as BuenLink } from 'react-router-dom';
import Drawer from '../../Cart/Drawer';
import Signout from '../../SignOut/Signout';
import ProfileImage from '../../UserProfile/ProfileImage';
import FavouriteList from '../../UserProfile/FavouriteList';
import { useSelector, useDispatch } from 'react-redux';
import { checkStates } from '../../../redux/actions';
import BtnDarkMode from '../../buttons/BtnDarkMode';
import BtnAdminDashboard from '../../buttons/BtnAdminDashboard';

const AdminMobileNav = () => {
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
					<BtnAdminDashboard />
				</MenuItem>
				<MenuItem>
					<Signout />
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default AdminMobileNav;
