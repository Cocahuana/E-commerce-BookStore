import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { delCart } from '../../../redux/actions';
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
} from '@chakra-ui/react';
import SummaryPurchase from './SummaryPurchase';

const Cart = () => {
	const { cart } = useSelector((state) => state);
	const dispatch = useDispatch();

	const handleOnDelete = (id) => {
		dispatch(delCart(id));
	};
	return (
		<Stack>
			<Stack>
				{cart.length > 0 ? (
					cart?.map((e) => {
						return (
							<Stack
								paddingBottom={'30px'}
								border='solid 3px'
								borderColor={useColorModeValue(
									'blue.500',
									'blue.200'
								)}
								rounded='10px'
								direction='row'
								w='100%'
								p='5px'>
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
												<Text fontWeight={'semibold'}>
													{e.title}
												</Text>
												<Text
													fontWeight='light'
													paddingBottom={'1px'}>
													{e.authors}
												</Text>
												<Text paddingTop={'5px'}>
													<PriceTag
														price={e.price}
														currency={e.currency}
													/>
												</Text>
											</Text>
										</VStack>
									</HStack>
								</Box>

								<Button
									bg='red.300'
									size='sm'
									_hover={{
										transform: 'translateY(2px)',
										boxShadow: 'lg',
										bg: useColorModeValue(
											'gray.400',
											'gray.600'
										),
									}}
									onClick={() => handleOnDelete(e.id)}>
									X
								</Button>
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
