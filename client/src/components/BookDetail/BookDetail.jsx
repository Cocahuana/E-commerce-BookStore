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
	ChakraProvider,
} from '@chakra-ui/react';
import { TiShoppingCart } from 'react-icons/ti';
import { Rating } from '../BookShelf/BookHolder/Book/Rating';
import { PriceTag } from '../BookShelf/BookHolder/Book/PriceTag';
import Swal from 'sweetalert2';

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

	return (
		<Container
			align={'center'}
			bg={useColorModeValue('gray.200', 'gray.900')}
			color={useColorModeValue('gray.700', 'whiteAlpha.600')}
			minW={'100%'}
			minH={'90vh'}
			paddingTop={'10vh'}>
			<Box
				maxW={'6xl'}
				textAlign='left'
				border='1px'
				borderColor={useColorModeValue('gray.200', 'gray.900')}>
				<SimpleGrid
					columns={{ base: 1, lg: 2 }}
					rows={{ base: 3, lg: 3 }}
					bg={useColorModeValue('whiteAlpha.600', 'gray.700')}
					//spacing={{ base: 8, md: 10 }}
				>
					<Flex>
						<Flex
							w={'100%'}
							//Si le sacas maxHeight && los pixeles, la card se ajusta al dropdown del description
							maxHeight={{
								base: '500px',
								sm: '400px',
								lg: '700px',
							}}
							align={'center'}
							justify={'center'}>
							<Image
								rounded={'md'}
								alt={'book image'}
								src={details?.image}
								fit={'container'}
								align={'center'}
								w={{ base: '75%', sm: '75%', lg: '90%' }}
								h={{ base: '90%', sm: '90%', lg: '90%' }}
							/>
						</Flex>
					</Flex>
					<Stack
						p={{ base: 10, sm: 10, md: 10, lg: 10 }}
						border='1px'
						borderColor={useColorModeValue('gray.200', 'gray.900')}
						m='24px'
						rounded='10px'>
						<Box as={'header'}>
							<Text
								fontWeight={'bold'}
								fontSize={{
									base: '1xl',
									sm: '2xl',
									lg: '3xl',
								}}>
								{details?.title}
							</Text>
						</Box>
						<Stack>
							<Text
								w='100%'
								fontSize={{
									base: '24px',
									sm: '24px',
									lg: '36px',
								}}>
								<PriceTag
									w='100%'
									price={details.price}
									salePrice={details.salePrice}
									currency={details.currency}
								/>
							</Text>
						</Stack>

						<Stack spacing={{ base: 4, sm: 6 }}>
							<Text fontSize={'20px'}>
								<Text>{details?.authors}(author)</Text>
							</Text>

							<Text fontSize={'20px'}>
								<Text paddingTop={'9px'}>
									<Rating
										size='20px'
										defaultValue={details?.rating}
									/>
								</Text>
							</Text>
							<Text fontSize={'20px'}>
								<Box>
									<Text>
										{details?.Genres?.map((e) => e.name) +
											''}
									</Text>
								</Box>
							</Text>
							<Text fontSize={'20px'}>
								<Text>
									{details?.Languages?.map((e) => e.name) +
										''}
								</Text>
							</Text>
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
											)}
											transition='1s'
											textTransform={'uppercase'}
											_hover={{
												bg: useColorModeValue(
													'rgba(65, 137, 230, 0.50)',
													'rgba(65, 137, 230, 0.35)'
												),
												color: useColorModeValue(
													'#3483fa',
													'white'
												),
											}}>
											<Box
												color={useColorModeValue(
													'gray.900',
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
										color={useColorModeValue(
											'gray.900',
											'gray.400'
										)}
										textAlign={'justify'}
										rounded={'10px'}
										bg={useColorModeValue(
											'white',
											'gray.900'
										)}
										pb={4}>
										<div
											dangerouslySetInnerHTML={{
												__html: details?.description,
											}}
										/>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						</Stack>
						<Stack>
							<Box>
								<Button
									onClick={() => handleonclick(details.id)}
									w={'100%'}
									size={'lg'}
									bg={useColorModeValue(
										'blue.500',
										'blue.200'
									)}
									color={useColorModeValue(
										'white',
										'gray.900'
									)}
									leftIcon={<TiShoppingCart />}
									textTransform={'uppercase'}
									transition={'1s'}
									_hover={{
										bg: useColorModeValue(
											'blue.200',
											'blue.500'
										),
										color: useColorModeValue(
											'gray.900',
											'white'
										),
									}}>
									Add to cart
								</Button>
							</Box>
							<Box
								direction='row'
								alignItems='center'
								justifyContent={'center'}>
								<BuenLink to={'/books'} w={'100%'}>
									<Button
										align={'center'}
										justify={'center'}
										size={'lg'}
										w={'100%'}
										transition={'1s'}
										color={useColorModeValue(
											'#3483fa',
											'gray.900'
										)}
										bg={useColorModeValue(
											'rgba(65, 137, 230, 0.35)',
											'blue.200'
										)}
										textTransform={'uppercase'}
										_hover={{
											bg: useColorModeValue(
												'rgba(65, 137, 230, 0.50)',
												'rgba(65, 137, 230, 0.35)'
											),
											color: useColorModeValue(
												'#3483fa',
												'white'
											),
										}}>
										Home
									</Button>
								</BuenLink>
							</Box>
						</Stack>
					</Stack>
				</SimpleGrid>
			</Box>
			<Box
				maxW={'6xl'}
				p={{ base: 10, sm: 10, md: 10, lg: 10 }}
				bg={useColorModeValue('whiteAlpha.600', 'gray.700')}
				textAlign='left'
				border='1px'
				borderColor={useColorModeValue('gray.200', 'gray.900')}>
				<Heading
					w='100%'
					h={{ base: '100px', lg: '100px' }}
					size='lg'
					fontSize='40px'>
					Comment section
				</Heading>
				<Stack bg='green'>
					{comments?.map((comment) => {
						return (
							<Box
								flexDirection={'column'}
								p='10px'
								w='100%'
								minH='4%'
								bg='blue'
								border='1px'
								key={comment.user[0]?.username}
								borderColor='black'>
								<Box bg='pink' maxW='20%' h='100%'>
									<Avatar
										size='md'
										showBorder={true}
										borderColor='brand.pepeoscuro'
										name='avatar'
										src={comment.user[0]?.profile_picture}
									/>
									<Rating
										size='20px'
										defaultValue={details?.rating}
									/>
									<Text bg='violet'>
										{comment.user[0]?.username}
									</Text>
								</Box>
								<VStack bg='red' maxW='80%' h='100%'>
									<Text w='100%' h='100%' bg='white'>
										{comment.text}
									</Text>
								</VStack>
							</Box>
						);
					})}
					<Box bg='orange'>
						<Editable defaultValue='Great Book! Love it.'>
							<EditablePreview />
							<EditableTextarea onChange={handleOnChange} />
						</Editable>
						<Button onClick={handlePost}>Post Comment</Button>
					</Box>
				</Stack>
				;
			</Box>
		</Container>
	);
}

export default BookDetail;
