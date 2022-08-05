import React, { useEffect } from 'react';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
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

	return userRole === 'Admin' ? (
		<Box
			position='fixed'
			width='100%'
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
								<CloseIcon w={3} h={3} />
							) : (
								<HamburgerIcon w={5} h={5} />
							)
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justify={{ base: 'center', md: 'start' }}>
					<BuenLink to='/'>
						<Text
							textAlign={useBreakpointValue({
								base: 'center',
								md: 'left',
							})}
							color={useColorModeValue('gray.800', 'white')}>
							<Highlight
								key='1'
								query={'Book'}
								styles={{
									px: '1',
									py: '1',
									rounded: 'xl',
									bg: 'brand.pepe',
									color: 'white',
								}}>
								E-BookStore
							</Highlight>
						</Text>
					</BuenLink>

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					spacing={6}>
					<Center>
						<Button
							size={'md'}
							aria-label='Toggle Color Mode'
							onClick={toggleColorMode}
							_focus={{ boxShadow: 'none' }}
							w='fit-content'>
							{colorMode === 'light' ? (
								<BsMoonStarsFill title='Toggle to dark mode' />
							) : (
								<BsSun title='Toggle to light mode' />
							)}
						</Button>
						{/* <Switch size={'lg'} onChange={toggleColorMode} /> */}
					</Center>

					<Drawer />

					<BuenLink to='/adminDashboard'>
						<Button as={'a'}>Admin</Button>
					</BuenLink>
					<Signout />
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	) : userRole === 'User' ? (
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
								<CloseIcon w={3} h={3} />
							) : (
								<HamburgerIcon w={5} h={5} />
							)
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justify={{ base: 'center', md: 'start' }}>
					<BuenLink to='/'>
						<Text
							textAlign={useBreakpointValue({
								base: 'center',
								md: 'left',
							})}
							color={useColorModeValue('gray.800', 'white')}>
							<Highlight
								query={'E-Book'}
								styles={{
									px: '1',
									py: '1',
									rounded: 'xl',
									bg: 'brand.pepe',
									color: 'white',
								}}>
								E-BookStore
							</Highlight>
						</Text>
					</BuenLink>

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					spacing={6}>
					<Center>
						<Button
							size={'md'}
							aria-label='Toggle Color Mode'
							onClick={toggleColorMode}
							_focus={{ boxShadow: 'none' }}
							w='fit-content'>
							{colorMode === 'light' ? (
								<BsMoonStarsFill title='Toggle to dark mode' />
							) : (
								<BsSun title='Toggle to light mode' />
							)}
						</Button>
						{/* <Switch size={'lg'} onChange={toggleColorMode} /> */}
					</Center>

					<FavouriteList widt={"10%"} dis={"none"}/>

					<Drawer />

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
								}}
							>
								<FavouriteList widt={"100%"}/>
							</MenuItem>

							


							<MenuItem
								_hover={{
									bg: useColorModeValue('white', 'none'),
									cursor: 'default',
								}}>
								<BuenLink to='/profile'>
									<Button
										as={'a'}
										fontSize={'md'}
										w={'250px'}>
										Profile
									</Button>
								</BuenLink>
							</MenuItem>

							<MenuItem w={"100%"}_hover={{ bg: 'none', cursor: 'default' }}>
							<Drawer widt={"100%"}/>
							</MenuItem>

							<MenuDivider />
							<MenuItem
								_hover={{ bg: 'none', cursor: 'default' }}>
								<Signout wid='100%' />
							</MenuItem>
						</MenuList>
					</Menu>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	) : (
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
								<CloseIcon w={3} h={3} />
							) : (
								<HamburgerIcon w={5} h={5} />
							)
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justify={{ base: 'center', md: 'start' }}>
					<BuenLink to='/'>
						<Text
							textAlign={useBreakpointValue({
								base: 'center',
								md: 'left',
							})}
							color={useColorModeValue('gray.800', 'white')}>
							<Highlight
								query={'E-Book'}
								styles={{
									px: '1',
									py: '1',
									rounded: 'xl',
									bg: 'brand.pepe',
									color: 'white',
								}}>
								E-BookStore
							</Highlight>
						</Text>
					</BuenLink>

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					spacing={6}>
					<Center>
						<Button
							aria-label='Toggle Color Mode'
							onClick={toggleColorMode}
							_focus={{ boxShadow: 'none' }}
							w='fit-content'>
							{colorMode === 'light' ? (
								<BsMoonStarsFill title='Toggle to dark mode' />
							) : (
								<BsSun title='Toggle to light mode' />
							)}
						</Button>
						{/* <Switch size={'lg'} onChange={toggleColorMode} /> */}
					</Center>

					<Drawer />
					<HStack>
						<BuenLink to='/login'>
							<Button
								as={'a'}
								fontSize={'sm'}
								fontWeight={400}
								variant={'link'}>
								Sign In
							</Button>
						</BuenLink>
						<BuenLink to='/register'>
							<Button
								as={'a'}
								display={{
									base: 'none',
									md: 'inline-flex',
								}}
								fontSize={'sm'}
								fontWeight={600}
								color={'white'}
								bg={'brand.pepe'}
								_hover={{
									bg: '#2E3532',
								}}>
								Sign Up
							</Button>
						</BuenLink>
					</HStack>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<BuenLink to={navItem.href}>
								<Link
									p={2}
									href={navItem.href ?? '#'}
									fontSize={'sm'}
									fontWeight={500}
									color={linkColor}
									_hover={{
										textDecoration: 'none',
										color: linkHoverColor,
									}}>
									{navItem.label}
								</Link>
							</BuenLink>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={popoverContentBgColor}
								p={4}
								rounded={'xl'}
								minW={'sm'}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav
											key={child.label}
											{...child}
										/>
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }) => {
	return (
		<BuenLink to={href}>
			<Link
				role={'group'}
				display={'block'}
				p={2}
				rounded={'md'}
				_hover={{ bg: useColorModeValue('#2E3532', 'gray.900') }}>
				<Stack direction={'row'} align={'center'}>
					<Box>
						<Text
							transition={'all .3s ease'}
							_groupHover={{ color: '#2E3532' }}
							fontWeight={500}>
							{label}
						</Text>
						<Text fontSize={'sm'}>{subLabel}</Text>
					</Box>
					<Flex
						transition={'all .3s ease'}
						transform={'translateX(-10px)'}
						opacity={0}
						_groupHover={{
							opacity: '100%',
							transform: 'translateX(0)',
						}}
						justify={'flex-end'}
						align={'center'}
						flex={1}>
						<Icon
							color={'#8B2635'}
							w={5}
							h={5}
							as={ChevronRightIcon}
						/>
					</Flex>
				</Stack>
			</Link>
		</BuenLink>
	);
};

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{ md: 'none' }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<BuenLink to={href}>
				<Flex
					py={2}
					// as={Link}
					// href={href ?? '#'}
					justify={'space-between'}
					align={'center'}
					_hover={{
						textDecoration: 'none',
					}}>
					<Text
						fontWeight={600}
						color={useColorModeValue('gray.600', 'gray.200')}>
						{label}
					</Text>
					{children && (
						<Icon
							as={ChevronDownIcon}
							transition={'all .25s ease-in-out'}
							transform={isOpen ? 'rotate(180deg)' : ''}
							w={6}
							h={6}
						/>
					)}
				</Flex>
			</BuenLink>

			<Collapse
				in={isOpen}
				animateOpacity
				style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}>
					{children &&
						children.map((child) => (
							<BuenLink key={child.label} to={child.href}>
								<Link py={2}>{child.label}</Link>
							</BuenLink>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

const NAV_ITEMS = [
	// {
	// 	label: 'Blog',
	// 	children: [
	// 		{
	// 			label: 'Weekly book club',
	// 			subLabel: 'Discuss about the weekly selected book on a live chat',
	// 			href: '/livechat',
	// 		},
	// 		{
	// 			label: 'F.A.Q',
	// 			subLabel: 'A frecuently asked questions forum to solve all your doubts',
	// 			href: '/faq',
	// 		},
	// 	],
	// },
	{
		label: 'Books',
		href: '/books',
	},
	{
		label: 'About Us',
		href: '/us',
	},
];
