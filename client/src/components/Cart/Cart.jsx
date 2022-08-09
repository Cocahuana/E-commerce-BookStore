import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { delCart, removeOneBookFromCart } from '../../redux/actions/index';
import { PriceTag } from '../BookShelf/BookHolder/Book/PriceTag';
import {
	Button,
	Box,
	HStack,
	Icon,
	Image,
	Link,
	Stack,
	Text,
	useColorModeValue as mode,
	VStack,
	useColorModeValue,
	useToast,
	CloseButton,
} from '@chakra-ui/react';
import SummaryPurchase from './SummaryPurchase';

const Cart = () => {
	const { cart, userId } = useSelector((state) => state);
	const dispatch = useDispatch();
	const toast = useToast();

	const handleOnDelete = (id) => {
		dispatch(removeOneBookFromCart(id, userId));
		dispatch(delCart(id));
		toast({
			title: 'Removed from the cart successfully',
			status: 'success',
			isClosable: 'true',
			duration: '2000',
			position: 'bottom',
		});
	};
	return (
		<Stack>
			<Stack>
				{cart.length > 0 ? (
					cart?.map((e) => {
						return (
							<Stack
								paddingBottom={'30px'}
								border='solid 1px'
								borderColor={useColorModeValue('gray.300', 'blue.200')}
								rounded='10px'
								direction='row'
								w='100%'
								p='5px'
							>
								<Box w='full' p='5px'>
									<HStack>
										<Image
											rounded='lg'
											width='100px'
											height='100px'
											fit='contain'
											src={e.image}
											alt={name}
											draggable='false'
											loading='lazy'
										/>

										<VStack maxW='60%'>
											<Text>
												<Text fontWeight={'semibold'}>{e.title}</Text>
												<Text fontWeight='light' paddingBottom={'1px'}>
													{e.authors}
												</Text>
												<Text paddingTop={'5px'}>
													<PriceTag price={e.price} currency={e.currency} />
												</Text>
											</Text>
										</VStack>
									</HStack>
								</Box>

								{/* <Button
									colorScheme={'blackAlpha'}
									size='sm'
									_hover={{
										transform: 'translateY(2px)',
										boxShadow: 'lg',
										bg: useColorModeValue('gray.400', 'gray.600'),
									}}
									onClick={() => handleOnDelete(e.id)}
								></Button> */}
								<CloseButton
									color={'brand.pepeoscuro'}
									bg={'blackAlpha.300'}
									onClick={() => handleOnDelete(e.id)}
								></CloseButton>
							</Stack>
						);
					})
				) : (
					<h4>Cart empty!</h4>
				)}
			</Stack>
			<Box paddingTop={'10px'}>
				<SummaryPurchase />
			</Box>
		</Stack>
	);
};

export default Cart;
