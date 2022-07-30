import React from 'react';
import axios from 'axios';
// import { useState, useRef } from 'react';
import SignOut from '../SignOut/Signout';
import ProfileImage from './ProfileImage';
import FavouriteList from './FavouriteList';
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
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

function UserProfile() {
	const { userName, userEmail } = useSelector((state) => state);

	return (
		<Stack
			px={'5%'}
			pt={{ lg: '5%', md: '10%', sm: '15%', base: '25%' }}
			bg={useColorModeValue('white', 'gray.500')}
			h={'85vh'}>
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
				direction={{ md: 'row', lg: 'row', base: 'column' }}
				h={'100vh'}>
				<VStack
					h={'100%'}
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
					<VStack>
						<FavouriteList />
						<Button w={'100%'}>Change your password</Button>
						<br />
						<SignOut wid='60%' />
					</VStack>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default UserProfile;
