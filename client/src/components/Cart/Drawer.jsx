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
} from '@chakra-ui/react';
import Cart from './Cart';
import { useDispatch, useSelector } from 'react-redux';
import { delAllCart, getCart, clearCart } from '../../redux/actions/index';

import { TiShoppingCart } from 'react-icons/ti';
import SummaryPurchase from './SummaryPurchase';
import { Link as BuenLink } from 'react-router-dom';

const CartDrawer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const { userId, cart } = useSelector((state) => state);

	const handleClick = (newSize) => {
		dispatch(getCart(userId));
		onOpen();
	};

	const handleDeleteCart = () => {
		dispatch(clearCart(userId));
		dispatch(delAllCart());
	};

	return (
		<>
			<Button
				onClick={() => handleClick()}
				key={'sm'}
				m={4}
				leftIcon={<TiShoppingCart />}>
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
						<Box p='10px' float='left'>
							<BuenLink to='/purchase'>
								<Button
									onClick={onClose}
									bg={useColorModeValue(
										'blue.500',
										'blue.200'
									)}
									color={useColorModeValue(
										'white',
										'gray.900'
									)}
									size='sm'
									_hover={{
										transform: 'translateY(2px)',
										boxShadow: 'lg',
										bg: useColorModeValue(
											'gray.400',
											'gray.600'
										),
									}}>
									Purchase now!!
								</Button>
							</BuenLink>
						</Box>
						<Box p='10px' float='right'>
							<Button
								bg={useColorModeValue('blue.500', 'blue.200')}
								color={useColorModeValue('white', 'gray.900')}
								size='sm'
								_hover={{
									transform: 'translateY(2px)',
									boxShadow: 'lg',
									bg: useColorModeValue(
										'gray.400',
										'gray.600'
									),
								}}
								onClick={() => handleDeleteCart()}>
								Empty Cart
							</Button>
						</Box>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default CartDrawer;
