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

const CartDrawer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleClick = (newSize) => {
		onOpen();
	};

	const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];

	return (
		<>
			<Button onClick={() => handleClick()} key={'xs'} m={4}>
				Cart
			</Button>

			<Drawer onClose={onClose} isOpen={isOpen} size={'xs'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader></DrawerHeader>
					<DrawerBody>
						<Cart />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default CartDrawer;
