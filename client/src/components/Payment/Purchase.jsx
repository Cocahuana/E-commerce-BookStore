import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link as BuenLink } from 'react-router-dom';
import { PriceTag } from '../BookShelf/BookHolder/Book/PriceTag';
import SummaryPurchase from '../Cart/SummaryPurchase';

import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Image,
	Checkbox,
	tokenToCSSVar,
} from '@chakra-ui/react';

export default function Purchase() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { cart, summary } = useSelector((state) => state);
	console.log(cart);
	console.log(summary);

	return (
		<Box>
			{cart?.map((e) => {
				return (
					<Stack
						paddingBottom={'30px'}
						border='solid 3px'
						borderColor={useColorModeValue('blue.500', 'blue.200')}
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

								<Box maxW='60%'>
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
								</Box>
							</HStack>
						</Box>

						<Button
							bg='red.300'
							size='sm'
							_hover={{
								transform: 'translateY(2px)',
								boxShadow: 'lg',
								bg: useColorModeValue('gray.400', 'gray.600'),
							}}
							onClick={() => handleOnDelete(e.id)}>
							X
						</Button>
					</Stack>
				);
			})}
			<Box paddingTop={'10px'}>
				<SummaryPurchase />
			</Box>
			<BuenLink to='/pay'>
				<Button>Continue purchase</Button>
			</BuenLink>
		</Box>
	);
}
