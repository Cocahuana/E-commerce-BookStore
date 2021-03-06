import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetails } from '../../../redux/actions';
import { Link as BuenLink } from 'react-router-dom';
import {
	Box,
	Container,
	Stack,
	Text,
	Image,
	Flex,
	VStack,
	Button,
	Heading,
	SimpleGrid,
	StackDivider,
	useColorModeValue,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from '@chakra-ui/react';
import { TiShoppingCart } from 'react-icons/ti';
import { Rating } from '../BookShelf/BookHolder/Book/Rating';

function handleonclick() {
	alert('Product added into the cart');
}

function BookDetail(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDetails(props.match.params.id));
	}, [dispatch]);

	let detail = useSelector((state) => state.details);

	return (
		<Container align={'center'} bg='brand.pepe' minW={'100%'} minH={'90vh'}>
			<Box maxW={'7xl'}>
				<SimpleGrid
					columns={{ base: 1, lg: 2 }}
					spacing={{ base: 8, md: 10 }}
					py={{ base: 18, md: 23, lg: 24 }}>
					<Flex paddingTop={{ sm: '45px', base: '45px' }}>
						<Image
							rounded={'md'}
							alt={'book image'}
							src={detail?.image}
							fit={'container'}
							align={'center'}
							w={'100%'}
							h={{ base: '100%', sm: '400px', lg: '680px' }}
						/>
					</Flex>
					<Stack
						justify={'space-between'}
						spacing={{ base: 6, md: 10 }}>
						<Box as={'header'}>
							<Text
								lineHeight={1.1}
								fontWeight={300}
								fontSize={{
									base: '2xl',
									sm: '4xl',
									lg: '5xl',
								}}>
								{detail?.title}
							</Text>
						</Box>

						<Stack
							spacing={{ base: 4, sm: 6 }}
							direction={'column'}
							divider={
								<StackDivider
									borderColor={useColorModeValue(
										'gray.200',
										'gray.600'
									)}
								/>
							}>
							<VStack
								fontWeight={'300'}
								justify={'space-evenly'}
								align={'center'}
								flexDir={'row'}
								spacing={{ base: 2, sm: 4 }}>
								<Text fontSize={'20px'}>
									Author:
									<Text>{detail?.authors}</Text>
								</Text>

								<Text fontSize={'20px'} paddingBottom={'20px'}>
									Rating:
									<Text paddingTop={'9px'}>
										<Rating
											size='20px'
											defaultValue={detail?.rating}
										/>
									</Text>
								</Text>
							</VStack>
						</Stack>

						<Stack flexDir={'row'}>
							<Text
								mt={2}
								py={'3'}
								w='45%'
								fontSize={{
									base: '1xl',
									sm: '1xl',
									lg: '2xl',
								}}>
								Price:{' '}
								{detail?.price
									? '$' +
									  detail?.currency +
									  ' ' +
									  detail?.price
									: 'No existe el precio'}
							</Text>

							<Button
								onClick={handleonclick}
								rounded={'100px'}
								w={'50%'}
								mt={8}
								size={'lg'}
								py={'7'}
								bg={useColorModeValue('blue.500', 'blue.200')}
								color={useColorModeValue('white', 'gray.900')}
								leftIcon={<TiShoppingCart />}
								textTransform={'uppercase'}
								_hover={{
									transform: 'translateY(2px)',
									boxShadow: 'lg',
								}}>
								Add to cart
							</Button>
						</Stack>

						<Stack
							direction='row'
							alignItems='center'
							justifyContent={'center'}>
							<Accordion
								minW={'100%'}
								allowMultiple
								padding={'15px'}>
								<AccordionItem>
									<h2>
										<AccordionButton>
											<Box flex='1' textAlign='left'>
												Description
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										<div
											dangerouslySetInnerHTML={{
												__html: detail?.description,
											}}
										/>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						</Stack>
						<BuenLink to={'/books'}>
							<Button
								fontWeight={"1px"}
								color={useColorModeValue('white', 'gray.900')}
								rounded={'100px'}
								mt={5}
								size={'md'}
								bg={useColorModeValue('blue.500', 'blue.200')}
								textTransform={'uppercase'}
								_hover=
								{{
									transform: 'translateY(2px)',
									boxShadow: 'lg',
 							}}>								
								Home							
							</Button>
						</BuenLink>
					</Stack>
				</SimpleGrid>
			</Box>
		</Container>
	);
}

export default BookDetail;
