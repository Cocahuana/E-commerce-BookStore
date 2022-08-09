import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useState, useRef } from 'react';
import SignOut from '../SignOut/Signout';
import ProfileImage from './ProfileImage';
import FavouriteList from './FavouriteList';
import { Link as BuenLink } from 'react-router-dom';
import {
	Box,
	Stack,
	HStack,
	Text,
	VStack,
	Button,
	Heading,
	Avatar,
	AvatarBadge,
	Badge,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useDisclosure,
	useColorModeValue,
	Flex,
	Container,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Center,
	Spinner,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getPurchasedCart, userGetComments } from '../../redux/actions';
import Reviews from '../BookDetail/Reviews';

function UserProfile() {
	const dispatch = useDispatch();
	const {
		userName,
		userProfilePicture,
		userEmail,
		userId,
		purchasedCart,
		comments,
		booksAutocomplete,
	} = useSelector((state) => state);
	const [loader, setLoader] = useState(true);
	const [loader2, setLoader2] = useState(true);

	useEffect(() => {
		if (userId) dispatch(getPurchasedCart(userId));
		if (userId) dispatch(userGetComments(userId));
	}, [dispatch]);

	var dataHistory = purchasedCart?.map((e) => {
		return e.Books;
	})[0];
	var dataComments = comments?.map((r) => {
		let book = booksAutocomplete.filter((b) => r.BookId === b.id);
		return {
			avatarSrc: userProfilePicture,
			review: r.text,
			stars: r.rating || 0,
			userName: userName,
			dateTime: r.date,
			book_title: book.title,
			book_image: book.image,
		};
	});
	console.log(dataHistory);

	if (dataHistory?.length && loader) setLoader(false);

	return (
		<Stack
			px={'5%'}
			pt={{ lg: '5%', md: '10%', sm: '15%', base: '25%' }}
			bg={useColorModeValue('white', 'gray.500')}
			h={'93vh'}>
			<Box
				rounded={'5px'}
				bgGradient={'linear(to-r, blue.600, blue.100)'}
				maxW={'100%'}
				h={'10%'}
				alignContent={'center'}
				justifyContent={'center'}>
				<Text
					fontSize={'3rem'}
					justifyContent={'center'}
					align={'center'}>
					Bienvenido
				</Text>
			</Box>
			<Stack
				align={'center'}
				justify={'center'}
				direction={{ md: 'row', lg: 'row', base: 'column' }}>
				<VStack
					Float={'top'}
					// h={'100%'}
					maxW={'50%'}
					spacing={4}
					py={5}
					borderBottomWidth={1}
					borderColor='brand.light'>
					<ProfileImage tamaño='2xl' />
					<VStack align={'left'} spacing={1}>
						<Heading as='h3' fontSize='xl' color='brand.dark'>
							{userName}
						</Heading>
						<Text color='brand.gray' fontSize='sm'>
							{userEmail}
						</Text>
					</VStack>
				</VStack>
				<Stack
					px={'5%'}
					h={{ lg: '60%', md: '60%', base: '150rem' }}
					w={{ lg: '50%', md: '50%', base: '100%' }}>
					<VStack pt={'10%'}>
						<FavouriteList widt={'100%'} />
						<Button w={'100%'}>Change your password</Button>
						<br />
						<SignOut wid='60%' />
					</VStack>
				</Stack>
			</Stack>
			<Flex
				direction='column'
				pt={{ base: '120px', md: '75px', sm: '20px' }}>
				<Container maxW={'container.xl'}>
					<Tabs variant='enclosed'>
						<TabList>
							<Tab>Buys</Tab>
							<Tab>Comments</Tab>
						</TabList>
						<TabPanels>
							<TabPanel pt={'2%'} w={'100%'}>
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
									dataHistory.map((e) => (
										<BuenLink to={`/book/${e.id}`}>
											<HStack
												rounded={'5px'}
												p={'1%'}
												border={'solid 0.5px lightgray'}
												justify={'space-between'}>
												<Text>{e.title}</Text>
												<Text px={'5%'}>
													US${e.price}
												</Text>
											</HStack>
										</BuenLink>
									))
								)}
							</TabPanel>
							<TabPanel p={0}>
								<Reviews reviewData={dataComments} />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Container>
			</Flex>
		</Stack>
	);
}

export default UserProfile;
