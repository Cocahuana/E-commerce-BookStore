import React, { useEffect, useState } from 'react';
import {
	Box,
	Heading,
	Text,
	Button,
	Center,
	Spinner,
	Stack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutCart, getCart, getPurchasedCart } from '../../redux/actions';

export default function Success() {
	const { userId, purchasedCart, activeCart } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(true);

	console.log('purchasedCart', purchasedCart);
	console.log('activeCart', activeCart);

	useEffect(() => {
		dispatch(getPurchasedCart(userId));
	}, [dispatch]);

	let receiptCart = {};
	setTimeout(() => {
		purchasedCart?.map((e) => {
			if (e.id === activeCart.id) {
				receiptCart = e;
			}
		});
		setLoader(false);
		console.log('recieptCart', receiptCart);
	}, 2000);

	return (
		<Box textAlign='center' py={10} px={6} pt='24' h='90vh'>
			<Heading
				display='inline-block'
				as='h2'
				size='2xl'
				bgGradient='linear(to-r, red.400, red.600)'
				backgroundClip='text'>
				Success
			</Heading>
			<Text fontSize='18px' mt={3} mb={2}>
				Enjoy!!
			</Text>
			<Text color={'gray.500'} mb={6}>
				Your purchase was succesful!
			</Text>
			<Link to='/'>
				<Stack color={'blue'}>
					{loader ? (
						<Center>
							<Spinner
								thickness='4px'
								speed='0.65s'
								emptyColor='gray.200'
								color='blue.500'
								size='xl'
							/>
						</Center>
					) : (
						setTimeout(() => {
							receiptCart?.Books?.map((e) => (
								<Text>
									<p>{e.title}</p>
									<p>{e.price}</p>
								</Text>
							));
						}, 2500)
					)}
					{/* <h1>{receiptCart[0].totalPrice}</h1> */}
				</Stack>
				<Button
					colorScheme='red'
					bgGradient='linear(to-r, red.400, red.500, red.600)'
					color='white'
					variant='solid'>
					Back to BookStore
				</Button>
			</Link>
		</Box>
	);
}
