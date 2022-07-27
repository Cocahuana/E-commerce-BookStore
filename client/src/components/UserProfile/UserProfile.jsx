import React from 'react';
import { useState, useRef } from 'react';
import SignOut from "../SignOut/Signout"
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
} from '@chakra-ui/react';

function UserProfile() {
	const [userProfile, setUserProfile] = useState(null);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const profileImage = useRef(null);

	const openChooseImage = () => {
		profileImage.current.click();
	};

	const changeProfileImage = (event) => {
		const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
		const selected = event.target.files[0];

		if (selected && ALLOWED_TYPES.includes(selected.type)) {
			let reader = new FileReader();
			reader.onloadend = () => setUserProfile(reader.result);
			return reader.readAsDataURL(selected);
		}

		onOpen();
	};

	return (
		<Stack px={'5%'} pt={{lg: '5%', md: "10%", sm: "15%", base: "25%"}} h={'85vh'}>
			<Box
                
                rounded={"5px"}
				bgGradient={'linear(to-r, blue.600, blue.100)'}
                maxW={"100%"}
				h={'10%'}
                alignContent={"center"}
				justifyContent={'center'}>
				<Text
					fontSize={'3rem'}
					justifyContent={'center'}
					align={'center'}
					>
					Bienvenido
				</Text>
			</Box>
			<Stack
				align={'center'}
				justify={"center"}
				direction={{md: "row", lg:"row", base: "column"}}
				h={'100vh'}>
				<VStack
					h={'100%'}
					maxW={'50%'}
					spacing={4}
					py={5}
					borderBottomWidth={1}
					borderColor='brand.light'>
					<Avatar
						size='2xl'
						cursor='pointer'
						onClick={openChooseImage}
						src={
							userProfile
								? userProfile
								: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360'
						}>
						<AvatarBadge bg='brand.blue' boxSize='1em'>
							<svg
								width='0.4em'
								fill='currentColor'
								viewBox='0 0 20 20'>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
								/>
							</svg>
						</AvatarBadge>
					</Avatar>
					<input
						hidden
						type='file'
						ref={profileImage}
						onChange={changeProfileImage}
					/>
					<Modal isOpen={isOpen} onClose={onClose}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Something went wrong</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Text>File not supported!</Text>
								<HStack mt={1}>
									<Text color='brand.cadet' fontSize='sm'>
										Supported types:
									</Text>
									<Badge colorScheme='green'>PNG</Badge>
									<Badge colorScheme='green'>JPG</Badge>
									<Badge colorScheme='green'>JPEG</Badge>
								</HStack>
							</ModalBody>

							<ModalFooter>
								<Button onClick={onClose}>Close</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
					<VStack align={'left'} spacing={1}>
						<Heading as='h3' fontSize='xl' color='brand.dark'>
							User Name
						</Heading>
						<Text color='brand.gray' fontSize='sm'>
							Email
						</Text>
					</VStack>
				</VStack>
				<Stack px={'5%'} h={{lg: "60%", md: "60%", base: "150rem"}} w={{lg: '50%', md: "50%", base: "100%"}}>
					<VStack align={'center'}>
						<Button w={'100%'}>Favourite list</Button>
						<Button w={'100%'}>Change your password</Button>
						<br />
                        <SignOut/>
					</VStack>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default UserProfile;
