import React, { useEffect } from 'react';
import {
	userGetFavorite,
	userAddFavorite,
	userDeleteFavorite,
	userDelFavorite,
	addToCart,
} from '../../redux/actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link as BuenLink } from 'react-router-dom';
import { TiShoppingCart } from 'react-icons/ti';
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
} from '@chakra-ui/react';
import Swal from 'sweetalert2';

export function favourites(props) {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { userId, allFavourites } = useSelector((state) => state);

	const Overlay = () => (
		<ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
	);

	const [overlay, setOverlay] = React.useState(<Overlay />);

	useEffect(() => {
		dispatch(userGetFavorite(userId));
	}, [dispatch]);

	const handleFavorite = () => {
		onOpen();
		setOverlay(<Overlay />);
		dispatch(userGetFavorite(userId)); //userid
	};

	const deleteFavorite = (id) => {
		dispatch(userDeleteFavorite(userId, id)); //userid, bookid
		dispatch(userDelFavorite(id));
		// ESTO NO SE VE PORQUE CHAKRA ES UNA PIJA. AGUANTE SWEETALERT.
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
		<Stack w={'full'}>
			<Button onClick={() => handleFavorite()}>
				Favourite list
			</Button>
			<Modal
				rounded={'10px'}
				isCentered
				size={'xl'}
				isOpen={isOpen}
				onClose={onClose}>
				{overlay}

				<ModalContent bg={'gray.300'}>
					<ModalHeader
						rounded={'5px'}
						bgGradient={'linear(to-r, blue.400, blue.100)'}>
						Favourite List
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody p={'0'}>
						<Flex>
							<Container maxW={'100%'}>
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
					{/* <ModalBody> <h1>You don´t have favorite books</h1> </ModalBody> */}
				</ModalContent>
			</Modal>
		</Stack>
	);
}

export default favourites;
