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

const VisitorDesktopNav = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack
			flex={{ base: 1, md: 0 }}
			justify={'flex-end'}
			direction={'row'}
			spacing={6}
			bg='red'>
			<BtnLandingPage bg='green' />
			<BuenLink bg='blue' to='/us'>
				About us
			</BuenLink>
			<BuenLink bg='pink' to='/books'>
				Books
			</BuenLink>
			<Center bg='orange.900'>
				<BtnDarkMode bg='orange.100' />
			</Center>

			<Drawer bg='violet' />
			<HStack bg='black'>
				<BtnSignIn />
				<BtnSignUp />
			</HStack>
		</Stack>
	);
};

export default VisitorDesktopNav;
