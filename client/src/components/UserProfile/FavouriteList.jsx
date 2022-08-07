import React, { useEffect } from 'react';
import {
	userGetFavorite,
	userAddFavorite,
	userDeleteFavorite,
	userDelFavorite,
	addToCart,
	checkStates,
	getBooksByTitleOrAuthor,
} from '../../redux/actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link as BuenLink } from 'react-router-dom';
import { TiShoppingCart } from 'react-icons/ti';
import { FiHeart } from 'react-icons/fi';
import {
	Stack,
	HStack,
	Container,
	Flex,
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure,
	Tabs,
	TabPanels,
	TabPanel,
	Img,
	Text,
	ModalOverlay,
	Alert,
	AlertIcon,
	Box,
	useColorModeValue,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';

export function favourites(props) {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { userId, allFavourites } = useSelector((state) => state);

	const Overlay = () => (
		<ModalOverlay
			bg={useColorModeValue('blackAlpha.600', 'blackAlpha.600')}
			backdropFilter='blur(0px)'
		/>
	);

	const [overlay, setOverlay] = React.useState(<Overlay />);

	const buenOnClose = () => {
		onClose();
	};

	useEffect(() => {
		if (userId) dispatch(userGetFavorite(userId));
	}, [dispatch]);

	const handleFavorite = () => {
		onOpen();
		setOverlay(<Overlay />);
		if (userId) dispatch(userGetFavorite(userId)); //userid
	};

	const deleteFavorite = (id) => {
		dispatch(userDeleteFavorite(userId, id)); //userid, bookid
		dispatch(userDelFavorite(id));
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'Favorite book deleted succesfully!',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	const handleAddToCart = (id) => {
		dispatch(addToCart(id));
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'Added to the Favorite List successfully!',
			showConfirmButton: false,
			timer: 1000,
		});
	};

	return (
		<Stack w={props.widt}>
			<Button w={'100%'} onClick={() => handleFavorite()}>
				<Text display={props.dis} paddingLeft={'5.5%'} w='90%'>
					Favourite list
				</Text>
				<Flex align={'center'}>
					<FiHeart fill='red' />
					<Box ml={'5px'}>{allFavourites.length}</Box>
				</Flex>
			</Button>

			<Modal
				scrollBehavior={'inside'}
				rounded={'10px'}
				isCentered
				size={'xl'}
				isOpen={isOpen}
				onClose={buenOnClose}>
				{overlay}

				<ModalContent bg={'gray.300'}>
					<ModalHeader
						bgGradient={useColorModeValue(
							'linear(to-r, blue.400, blue.100)',
							'linear(to-r, blue.700, blue.500)'
						)}>
						Favourite List
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody p={'0'}>
						<Flex>
							<Container
								maxW={'100%'}
								bg={useColorModeValue('gray.200', 'gray.900')}
								color={useColorModeValue(
									'gray.700',
									'whiteAlpha.600'
								)}>
								<Tabs>
									{allFavourites.length ? (
										allFavourites.map((e) => (
											<TabPanels>
												<TabPanel>
													<HStack
														aling={'center'}
														justify={
															'space-between'
														}>
														<Img
															maxW={'10%'}
															boxSize={'15%'}
															src={e.image}
														/>
														<Text w={'50%'}>
															{e.title}
														</Text>
														<Button
															size={'sm'}
															onClick={() =>
																handleAddToCart(
																	e.id
																)
															}>
															<TiShoppingCart />
														</Button>
														<Button
															size={'sm'}
															onClick={() =>
																deleteFavorite(
																	e.id
																)
															}>
															{' '}
															X{' '}
														</Button>
													</HStack>
												</TabPanel>
											</TabPanels>
										))
									) : (
										<TabPanels>
											<TabPanel>
												<HStack
													aling={'center'}
													justify={'space-between'}>
													<Text w='70%'>
														You don´t have favorite
														books yet
													</Text>
												</HStack>
											</TabPanel>
										</TabPanels>
									)}
								</Tabs>
							</Container>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Stack>
	);
}

export default favourites;
