import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link as BuenLink } from 'react-router-dom';
import { PriceTag } from '../BookShelf/BookHolder/Book/PriceTag';
import Cart from '../Cart/Cart';
import SummaryPurchase from '../Cart/SummaryPurchase';

import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	VStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Image,
	Checkbox,
	tokenToCSSVar,
	Container,
	List,
	ListItem,
} from '@chakra-ui/react';
import { emptyPurchasedCart } from '../../redux/actions';

export default function Purchase() {
	const { cart, summary } = useSelector((state) => state);
	const dispatch = useDispatch();
	console.log(cart);
	console.log(summary);

	useEffect(() => {
		return () => {
			dispatch(emptyPurchasedCart());
		};
	}, []);

	return (
		// <Container w={'100%'} minH={"90vh"} maxH={'100vh'} pt={"5%"}>
		// 	<Stack w={"100%%"} px={"1%"} pt={"1%"} rounded={"10px"} border={"solid 1px lightgray"}>
		// 		<Box w={'100%'}>
		// 			<Box>
		// 				<Cart />
		// 			</Box>
		// 			<Box py={'30px'} align={'center'}>
		// <BuenLink to='/pay'>
		// 	<Button>Continue purchase</Button>
		// </BuenLink>
		// 			</Box>
		// 		</Box>
		// 	</Stack>
		// </Container>
		<VStack
			w={'100%'}
			h={'100%'}
			p={3}
			pt={'10%'}
			justifyContent={{
				base: 'flex-start',
				md: 'space-around',
			}}
			direction={{
				base: 'column',
				md: 'row',
			}}
			alignItems={{ md: 'center' }}>
			<List
				rounded={'5px'}
				border={'solid 1px lightgray'}
				p={{base:'5vh', sm:"10%", md:"10px", lg:"10px"}}
				minW={'50%'}
				spacing={3}
				textAlign='start'>
				<ListItem>
					<Cart />
					<Stack float={'right'}>
						<BuenLink to='/pay'>
							<Button
								size='md'
								color={useColorModeValue(
									'white',
									'whiteAlpha.800'
								)}
								bgColor={useColorModeValue(
									'blue.500',
									'blue.600'
								)}
								_hover={{
									transform: 'translateY(2px)',
									boxShadow: 'lg',
									bg: useColorModeValue(
										'gray.400',
										'gray.600'
									),
								}}>
								Continue purchase
							</Button>
						</BuenLink>
					</Stack>
				</ListItem>
			</List>
		</VStack>
	);
}
