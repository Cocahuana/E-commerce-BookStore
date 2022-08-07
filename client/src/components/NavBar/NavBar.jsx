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
import Drawer from '../Cart/Drawer';
import Signout from '../SignOut/Signout';
import ProfileImage from '../UserProfile/ProfileImage';
import FavouriteList from '../UserProfile/FavouriteList';
import { useSelector, useDispatch } from 'react-redux';
import { checkStates } from '../../redux/actions';
import VisitorDesktopNav from './role/VisitorDesktopNav';
import VisitorMobileNav from './role/VisitorMobileNav';

export default function NavBar() {
	const dispatch = useDispatch();
	const { isOpen, onToggle } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	const { userRole, isSignedIn } = useSelector((state) => state);

	/*
	Basically, it asks if isSignedIn is false, it renders the navBar with the SignIn - SignUp, 
	if it's true( which means you are logged in), it renders the signout button
	*/

	useEffect(() => {
		dispatch(checkStates());
	}, [dispatch, userRole]);

	return (
		//------------------///
		<Box
			position='fixed'
			width='100%'
			zIndex={3}
			backdropFilter={'auto'}
			backdropBlur='8px'>
			<Flex
				bg={useColorModeValue('whiteAlpha.800', 'gray.700')}
				color={useColorModeValue('gray.600', 'white')}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				//borderStyle={'solid'}
				//borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}
				boxShadow={useColorModeValue(
					'0 4px 6px rgba(160,174,192,0.6)',
					'0 4px 6px rgba(9,17,28,0.9'
				)}>
				<Flex
					flex={{ base: 1, md: 'auto' }}
					ml={{ base: -2 }}
					display={{ base: 'flex', md: 'none' }}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? (
								<VisitorMobileNav w={3} h={3} />
							) : (
								<VisitorMobileNav w={5} h={5} />
							)
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex>
					<VisitorDesktopNav />
				</Flex>
			</Flex>
		</Box>
	);
}
