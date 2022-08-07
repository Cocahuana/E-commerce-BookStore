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
	Drawer,
} from '@chakra-ui/react';
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
} from '@chakra-ui/icons';
import { Link as BuenLink } from 'react-router-dom';
import Signout from '../SignOut/Signout';
import ProfileImage from '../UserProfile/ProfileImage';
import FavouriteList from '../UserProfile/FavouriteList';

const UserProfileDropdown = () => {
	return (
		<Menu>
			<MenuButton
				as={Button}
				rounded={'full'}
				variant={'link'}
				cursor={'pointer'}
				minW={0}>
				<ProfileImage tamaño='sm' />
			</MenuButton>
			<MenuList bg={useColorModeValue('white', 'gray.700')}>
				<MenuItem
					_focus={{ boxShadow: 'none' }}
					_hover={{
						bg: useColorModeValue('white', 'none'),
						cursor: 'default',
					}}>
					<FavouriteList widt={'100%'} />
				</MenuItem>

				<MenuItem
					_hover={{
						bg: useColorModeValue('white', 'none'),
						cursor: 'default',
					}}>
					<BuenLink to='/profile'>
						<Button as={'a'} fontSize={'md'} w={'250px'}>
							Profile
						</Button>
					</BuenLink>
				</MenuItem>

				<MenuItem w={'100%'} _hover={{ bg: 'none', cursor: 'default' }}>
					<Drawer widt={'215px'} />
				</MenuItem>

				<MenuDivider />
				<MenuItem _hover={{ bg: 'none', cursor: 'default' }}>
					<Signout wid='100%' />
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default UserProfileDropdown;
