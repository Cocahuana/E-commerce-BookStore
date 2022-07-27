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
import { useDispatch } from 'react-redux';
import { delAllCart } from '../../redux/actions';
import SummaryPurchase from './SummaryPurchase';

const CartDrawer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();

	const handleClick = (newSize) => {
		onOpen();
	};

	const handleDeleteCart = () => {
		dispatch(delAllCart());
	};

	return (
		<>
			<Button onClick={() => handleClick()} key={'sm'} m={4}>
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
