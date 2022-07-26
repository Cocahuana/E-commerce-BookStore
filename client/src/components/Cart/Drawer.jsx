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
} from '@chakra-ui/react';
import Cart from './Cart';
import { useDispatch } from 'react-redux';
import { delAllCart } from '../../../redux/actions';

const CartDrawer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();

	const handleClick = (newSize) => {
		onOpen();
	};

	const handleDeleteCart = () => {
		dispatch(delAllCart());
	};

	const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];

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
						<Button onClick={() => handleDeleteCart()}>
							Empty Cart
						</Button>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default CartDrawer;
