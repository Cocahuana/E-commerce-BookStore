import React, { useEffect } from 'react';
import {
	Box,
	Flex,
	IconButton,
	useColorModeValue,
	useDisclosure,
	useColorMode,
	HStack,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { checkStates } from '../../redux/actions';
import VisitorDesktopNav from './role/VisitorDesktopNav';
import VisitorMobileNav from './role/VisitorMobileNav';
import BtnLandingPage from '../buttons/BtnLandingPage';
import UserDesktopNav from './role/UserDesktopNav';
import UserMobileNav from './role/UserMobileNav';
import AdminDesktopNav from './role/AdminDesktopNav';
import AdminMobileNav from './role/AdminMobileNav';
import UserProfileDropdown from '../UserProfile/UserProfileDropdown';

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
			h='8vh'
			zIndex={3}
			backdropFilter={'auto'}
			backdropBlur='8px'>
			<Flex
				w={'100%'}
				h={'100%'}
				bg={useColorModeValue('whiteAlpha.800', 'gray.700')}
				color={useColorModeValue('gray.600', 'white')}
				borderBottom={1}
				//borderStyle={'solid'}
				//borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}
				justify='center'
				boxShadow={useColorModeValue(
					'0 4px 6px rgba(160,174,192,0.6)',
					'0 4px 6px rgba(9,17,28,0.9'
				)}>
				<Flex
					flex={{ base: 1, md: 'auto' }}
					display={{ base: 'flex', md: 'flex', lg: 'none' }}>
					<HStack w='100%' px='10px'>
						<Flex
							w='100%'
							h='100%'
							px={{
								base: '10px',
								sm: '3px',
								md: '20px',
								lg: '50px',
							}}
							justify={'space-between'}
							align='center'>
							<IconButton
								onClick={onToggle}
								icon={
									userRole === 'Admin' ? (
										<AdminMobileNav w={5} h={5} />
									) : userRole === 'User' ? (
										<UserMobileNav w={5} h={5} />
									) : (
										<VisitorMobileNav w={5} h={5} />
									)
								}
								variant={'ghost'}
								aria-label={'Toggle Navigation'}
							/>

							<BtnLandingPage />
							{userRole === 'User' ? (
								<UserProfileDropdown />
							) : (
								<Box bg='blue' />
							)}
						</Flex>
					</HStack>
				</Flex>

				<Flex
					display={{ base: 'none', md: 'none', lg: 'flex' }}
					align={'center'}
					justifyContent='center'
					w={'70%'}
					h={'100%'}>
					{userRole === 'Admin' ? (
						<AdminDesktopNav />
					) : userRole === 'User' ? (
						<UserDesktopNav />
					) : (
						<VisitorDesktopNav />
					)}
				</Flex>
			</Flex>
		</Box>
	);
}
