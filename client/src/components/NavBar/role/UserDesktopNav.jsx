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

import BtnSignIn from '../../buttons/BtnSignIn';
import BtnSignUp from '../../buttons/BtnSignUp';
import BtnDarkMode from '../../buttons/BtnDarkMode';
import BtnLandingPage from '../../buttons/BtnLandingPage';
import UserProfileDropdown from '../../UserProfile/UserProfileDropdown';

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
				<Drawer />
				<BtnDarkMode />
				<UserProfileDropdown />
			</HStack>
		</HStack>
	);
};

export default UserDesktopNav;
