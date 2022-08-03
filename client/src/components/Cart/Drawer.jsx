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
} from '@chakra-ui/react';
import Cart from './Cart';
import { useDispatch, useSelector } from 'react-redux';
import { delAllCart, getCart, clearCart } from '../../redux/actions/index';
import { TiShoppingCart } from 'react-icons/ti';
import SummaryPurchase from './SummaryPurchase';

const CartDrawer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const { userId } = useSelector((state) => state);

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
			</Button>

			<Drawer onClose={onClose} isOpen={isOpen} size={'sm'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader></DrawerHeader>
					<DrawerBody>
						<Cart />
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
