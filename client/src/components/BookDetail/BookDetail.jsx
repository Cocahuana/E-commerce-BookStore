import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
	addToCart,
	getDetails,
	resetDetails,
	getAllUsers,
	postComment,
} from '../../redux/actions';
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
	Avatar,
	Editable,
	EditablePreview,
	EditableTextarea,
} from '@chakra-ui/react';
import { TiShoppingCart } from 'react-icons/ti';
import { Rating } from '../BookShelf/BookHolder/Book/Rating';
import Swal from 'sweetalert2';

//console.log(borrame porfis)

function BookDetail(props) {
	const dispatch = useDispatch();
	const { id } = props.match.params;

	const { cart, summary, allUsers, userId, details } = useSelector(
		(state) => state
	);
	const [textarea, setTextArea] = useState('');

	const handleOnChange = (e) => {
		setTextArea(e.target.value);
	};

	const handlePost = () => {
		console.log('hola', textarea, userId, id);
		dispatch(
			postComment({
				comment: textarea,
				userId: userId,
				bookId: id,
			})
		);
	};

	const handleonclick = (id) => {
		dispatch(addToCart(id));
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'Added to the cart successfully',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	useEffect(() => {
		if (!allUsers.length) dispatch(getAllUsers());
		dispatch(getDetails(id));
		localStorage.setItem('cart', JSON.stringify(cart));
		localStorage.setItem('summary', JSON.stringify(summary));
		return () => {
			dispatch(resetDetails());
		};
	}, [dispatch, cart]);

	let comments = details?.Comments?.map((c) => {
		return {
			text: c.text,
			user: allUsers.filter((u) => c.UserId === u.id),
		};
	});

	console.log(comments);
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
							src={details?.image}
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
								{details?.title}
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
									<Text>{details?.authors}</Text>
								</Text>

								<Text fontSize={'20px'} paddingBottom={'20px'}>
									Rating:
									<Text paddingTop={'9px'}>
										<Rating
											size='20px'
											defaultValue={details?.rating}
										/>
									</Text>
								</Text>
								<Text fontSize={'20px'} paddingBottom={'20px'}>
									Genres:
									<Text>
										{details?.Genres?.map((e) => e.name) +
											''}
									</Text>
								</Text>
								<Text fontSize={'20px'} paddingBottom={'20px'}>
									Languages:
									<Text>
										{details?.Languages?.map(
											(e) => e.name
										) + ''}
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
								{details?.price
									? '$' +
									  details?.currency +
									  ' ' +
									  details?.price
									: 'No existe el precio'}
							</Text>

							<Button
								onClick={() => handleonclick(details.id)}
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
							direction='column'
							alignItems='center'
							justifyContent={'center'}>
							<Accordion
								minW={'100%'}
								allowMultiple
								padding={'15px'}>
								<AccordionItem rounded={'10px'}>
									<h2>
										<AccordionButton
											rounded={'10px'}
											bg={useColorModeValue(
												'blue.500',
												'blue.200'
											)}>
											<Box
												color={useColorModeValue(
													'white',
													'gray.900'
												)}
												flex='1'
												textAlign='left'>
												Description
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel
										textAlign={'justify'}
										rounded={'10px'}
										bg={'gray.300'}
										pb={4}>
										<div
											dangerouslySetInnerHTML={{
												__html: details?.description,
											}}
										/>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>

							<BuenLink to={'/books'}>
								<Button
									align={'center'}
									justify={'center'}
									fontWeight={'10px'}
									color={useColorModeValue(
										'white',
										'gray.900'
									)}
									rounded={'100px'}
									size={'md'}
									bg={useColorModeValue(
										'blue.500',
										'blue.200'
									)}
									textTransform={'uppercase'}
									_hover={{
										transform: 'translateY(2px)',
										boxShadow: 'lg',
									}}>
									Home
								</Button>
							</BuenLink>
						</Stack>
					</Stack>
				</SimpleGrid>
			</Box>
			<Box>
				<Text>Comments:</Text>
				<Stack>
					{comments?.map((comment) => {
						return (
							<Flex
								flexDir='row'
								pl='20px'
								alignItems='center'
								border='1px'
								key={comment.user[0]?.username}
								borderColor='black'>
								<Box>
									<Avatar
										size='md'
										showBorder={true}
										borderColor='brand.pepeoscuro'
										name='avatar'
										src={comment.user[0]?.profile_picture}
									/>
									<Text>{comment.user[0]?.username}</Text>
								</Box>
								<Text pl='20px'>{comment.text}</Text>
							</Flex>
						);
					})}
					<Box>
						<Editable defaultValue='Great Book! Love it.'>
							<EditablePreview />
							<EditableTextarea onChange={handleOnChange} />
						</Editable>
						<Button onClick={handlePost}>Post Comment</Button>
					</Box>
				</Stack>
			</Box>
		</Container>
	);
}

export default BookDetail;
