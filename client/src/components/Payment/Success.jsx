import React, { useEffect } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutCart, getCart } from '../../redux/actions';

export default function Success() {
	const { userId, cart } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCart(userId));
	}, [dispatch]);

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
