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
import {
	checkoutCart,
	clearCart,
	getCart,
	getPurchasedCart,
} from '../../redux/actions';

export default function Success() {
	const { userId, purchasedCart, summary } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(true);

	let [receipt, setReceipt] = useState({});

	console.log('purchasedCart', purchasedCart);
	console.log('activeCart', activeCart);

	useEffect(() => {
		dispatch(getPurchasedCart(userId));
	}, [dispatch]);

	setTimeout(() => {
		purchasedCart?.map((e) => {
			if (e.id === activeCart.id) {
				setReceipt(e);
			}
		});
		setLoader(false);
	}, 1000);

	if (purchasedCart.Books?.length && loader) setLoader(false);


	return (
		<Box textAlign='center' py={10} px={6} pt='24' h='90vh'>
			<Heading
				display='inline-block'
				as='h2'
				size='2xl'
				bgGradient='linear(to-r, blue.600, blue.400)'
				backgroundClip='text'>
				Success
			</Heading>
			<Text fontSize='18px' mt={3} mb={2}>
				Enjoy!!
			</Text>
			<Text color={'gray.500'} mb={6}>
				Your purchase was succesful!
			</Text>
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
					receipt?.Books?.map((e) => (
						<Text>
							<p>{e.title}</p>
							<p>{e.price}</p>
						</Text>
					))
				)}
				{<h1>{receipt.totalPrice}</h1>}
			</Stack>
			<Link to='/books'>
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
						purchasedCart?.Books?.map((e) => (
							<Text>
								<p>{e.title}</p>
								<p>{e.price}</p>
							</Text>
						))
					)}
					{<h1>{purchasedCart.Total}</h1>}
				</Stack>
				<Button
					bgGradient='linear(to-r, blue.400, blue.600)'
					color={'whiteAlpha.700'}
					_hover={{
						bgGradient: 'linear(to-r, blue.600, blue.400)',
						color: 'black',
					}}
					variant='solid'>
					Back to BookStore
				</Button>
			</Link>
		</Box>
	);
}
