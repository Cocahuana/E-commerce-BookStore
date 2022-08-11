import React from 'react';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Box,
	useColorModeValue,
	Text,
	useToast,
	Flex,
	Divider,
} from '@chakra-ui/react';
import Cart from './Cart';
import { useDispatch, useSelector } from 'react-redux';
import { delAllCart, getCart, clearCart } from '../../redux/actions/index';

import { TiShoppingCart } from 'react-icons/ti';
import SummaryPurchase from './SummaryPurchase';
import { Link as BuenLink } from 'react-router-dom';

const CartDrawer = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const { userId, cart } = useSelector((state) => state);
	const toast = useToast();

	const handleClick = (newSize) => {
		// dispatch(getCart(userId));
		onOpen();
	};

	const handleDeleteCart = () => {
		dispatch(clearCart(userId));
		dispatch(delAllCart());
		toast({
			title: 'All books from cart have been removed successfully!',
			status: 'success',
			isClosable: 'true',
			duration: '2000',
			position: 'bottom',
		});
	};

	return (
		<>
			<Button
				w={props.widt}
				onClick={() => handleClick()}
				key={'sm'}
				m={4}
				leftIcon={
					<TiShoppingCart
						color={useColorModeValue('#64c2e4', '#64c2e4')}
					/>
				}>
				Cart
				<Text
					fontSize='14px'
					bg='gray.400'
					rounded='50%'
					px='4px'
					py='2px'
					marginLeft='6px'
					color={useColorModeValue('white', 'gray.600')}>
					{cart.length}
				</Text>
			</Button>

			<Drawer onClose={onClose} isOpen={isOpen} size={'sm'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader></DrawerHeader>
					<DrawerBody>
						<Cart />

						<Flex direction={'column'} justify={'space-between'}>
							<BuenLink to='/purchase' w='100%'>
								<Button
									w='100%'
									onClick={onClose}
									disabled={cart.length === 0}
									colorScheme={'blue'}>
									Purchase now!!
								</Button>
							</BuenLink>
							<Box py={'4'}>
								<Button
									size={'sm'}
									onClick={() => handleDeleteCart()}>
									Empty Cart
								</Button>
							</Box>
						</Flex>
						{/* <Box p='10px'>
							<BuenLink to='/purchase'>
								<Button
									onClick={onClose}
									bg={useColorModeValue('blue.500', 'blue.200')}
									color={useColorModeValue('white', 'gray.900')}
									size='sm'
									disabled={cart.length === 0}
								>
									Purchase now!!
								</Button>
							</BuenLink>
						</Box>
						<Box p='10px'>
							<Button
								bg={useColorModeValue('blue.500', 'blue.200')}
								color={useColorModeValue('white', 'gray.900')}
								size='sm'
								_hover={{
									transform: 'translateY(2px)',
									boxShadow: 'lg',
									bg: useColorModeValue('gray.400', 'gray.600'),
								}}
								onClick={() => handleDeleteCart()}
							>
								Empty Cart
							</Button>
						</Box> */}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default CartDrawer;
