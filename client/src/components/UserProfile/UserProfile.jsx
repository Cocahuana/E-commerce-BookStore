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
	Link,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { userGetPurchases, userGetComments, getBooksByTitleOrAuthor } from '../../redux/actions';
import Reviews from '../BookDetail/Reviews';

function UserProfile() {
	const dispatch = useDispatch();
	const {
		userName,
		userProfilePicture,
		userEmail,
		userId,
		purchases,
		comments,
		booksAutocomplete,
	} = useSelector((state) => state);
	const [loader, setLoader] = useState(true);
	const [loader2, setLoader2] = useState(true);

	useEffect(() => {
		if (userId) dispatch(userGetPurchases(userId));
		if (userId) dispatch(userGetComments(userId));
		dispatch(getBooksByTitleOrAuthor(""))

	}, [dispatch]);

	var dataHistory = purchases
		?.map((e) => {
			return e.Books;
		})
		.flat();
	var dataComments = comments?.map((r) => {
		let book = booksAutocomplete.filter((b) => r.BookId === b.id);
		return {
			avatarSrc: userProfilePicture,
			review: r.text,
			stars: r.rating || 0,
			userName: userName,
			dateTime: r.date,
			book_title: book[0]?.title,
			book_image: book[0]?.image,
		};
	});
	if (dataHistory?.length && loader) setLoader(false);

	return (
		<Stack
			px={'5%'}
			pt={{ lg: '5%', md: '10%', sm: '15%', base: '25%' }}
			bg={useColorModeValue('white', 'gray.500')}
			h={'100%'}>
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
					
					w={{ lg: '50%', md: '50%', base: '100%' }}>
					<VStack pt={'30%'}>
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
										<HStack
											rounded={'5px'}
											p={'1%'}
											border={'solid 0.5px lightgray'}
											justify={'space-between'}>
											<Link
												as={BuenLink}
												to={`/book/${e.id}`}>
												<Text>{e.title}</Text>
											</Link>
											<Text px={'5%'}>US${e.price}</Text>
										</HStack>
									))
								)}
							</TabPanel>
							<TabPanel p={2}>
								<Stack w={"100%"} h={"2%"}>
									<Reviews
										redondeo={"10px"}
										pad={"10px"}
										borde={"solid 1px lightgray"}
										reviewData={dataComments}
										userProfileCommentsDisplayer={true}
									/>
								</Stack>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Container>
			</Flex>
		</Stack>
	);
}

export default UserProfile;
