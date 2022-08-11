import React, { useEffect, useState } from 'react';
import {
	Box,
	Heading,
	Text,
	Button,
	Center,
	Spinner,
	Stack,
	Image,
	Flex,
	Badge,
	Divider,
	useColorModeValue,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	checkoutCart,
	clearCart,
	getCart,
	getPurchasedCart,
} from '../../redux/actions';
import { sendConfirmation } from '../../redux/actions';
import { PriceTag } from '../BookShelf/BookHolder/Book/PriceTag';

export default function Success() {
	const { userId, purchasedCart, summary } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(true);

	if (purchasedCart.Books?.length && loader) setLoader(false);

	useEffect(() => {
		if (userId && purchasedCart.CartId) {
			console.log('holis');
			dispatch(sendConfirmation(userId, purchasedCart.CartId));
		}
	}, [userId, purchasedCart]);

	return (
		<Box
			textAlign='center'
			pt='10vh'
			bg={useColorModeValue('gray.200', 'gray.900')}
			color={useColorModeValue('gray.700', 'whiteAlpha.600')}>
			<Flex justify={'center'}>
				<Heading
					display='inline-block'
					as='h2'
					size='2xl'
					bg={'gray.500'}
					backgroundClip='text'>
					Your purchase was successful!
				</Heading>
				<Box
					ml={2}
					bg='green'
					borderRadius={'50%'}
					h={{
						base: '30px',
						sm: '40px',
						md: '50px',
						lg: '60px',
					}}
					w={{
						base: '30px',
						sm: '40px',
						md: '50px',
						lg: '60px',
					}}>
					<CheckIcon p={'10px'} color='white' w='100%' h='100%' />
				</Box>
			</Flex>

			<Box
				m='auto'
				w={{ base: '100%', sm: '100%', md: '100%', lg: '100%' }}
				p='10px'
				border='1px'
				borderColor={useColorModeValue('gray.200', 'gray.900')}>
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
					<TableContainer>
						<Table
							size={'sm'}
							variant='striped'
							bg={useColorModeValue('gray.200', 'gray.900')}>
							<TableCaption>
								This is a trial / demo payment, nothing you do
								here is a real payment from your personal
								account
							</TableCaption>
							<Thead>
								{/* <Tr>
									<Td></Td>
									<Td textAlign={'center'}>Book</Td>
									<Td textAlign={'center'}>Price</Td>
								</Tr> */}
							</Thead>
							<Tbody m='10px'>
								{purchasedCart?.Books?.map((e) => (
									<Tr>
										<Td>
											<Image
												h={{
													base: '100px',
													sm: '100px',
													md: '150px',
													lg: '200px',
												}}
												src={e.image}
											/>
										</Td>
										<Td textAlign={'center'}>
											<Heading
												size={{
													base: 'sm',
													sm: 'sm',
													md: 'md',
													lg: 'md',
												}}>
												{e.title}
											</Heading>
										</Td>
										<Td textAlign='center'>
											<Badge
												colorScheme={useColorModeValue(
													'blue',
													'green'
												)}
												fontSize={'16px'}>
												{
													<PriceTag
														price={e.price}
														salePrice={e.salePrice}
														currency={e.currency}
													/>
												}
											</Badge>
										</Td>
									</Tr>
								))}
								<Tr>
									<Td></Td>

									<Td textAlign={'center'} w='50%'>
										<Badge
											width='20%'
											colorScheme='green'
											fontSize={'20px'}>
											Total:
										</Badge>
										<Badge
											width='20%'
											colorScheme='green'
											fontSize={'20px'}>
											<PriceTag
												price={purchasedCart.Total.toFixed(
													2
												)}
											/>
										</Badge>
									</Td>
									<Td></Td>
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>
				)}
			</Box>
			<Link to='/books'>
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
