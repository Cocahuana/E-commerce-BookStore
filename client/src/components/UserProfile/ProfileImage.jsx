import React from 'react';
import axios from 'axios';
import { useState, useRef } from 'react';
import {
	Stack,
	HStack,
	Button,
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
	Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateUser } from '../../redux/actions';

export function avatar(props) {
	const { userProfilePicture, userId } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
	const profileImage = useRef(null);

	const openChooseImage = () => {
		profileImage.current.click();
	};

	const uploadImage = (e) => {
		const files = e.target.files[0];
		if (files && ALLOWED_TYPES.includes(files.type)) {
			const data = new FormData();
			data.append('file', files);
			data.append('upload_preset', 'proyect_preset');
			axios
				.post(
					'https://api.cloudinary.com/v1_1/lucho/image/upload',
					data
				)
				.then((res) =>
					dispatch(
						updateUser({
							id: userId,
							profile_picture: res.data.secure_url,
						})
					)
				)
				.then((res) => dispatch(getAllUsers()))
				.catch((err) => console.log(err));
		} else {
			onOpen();
		}
	};

	return (
		<Stack>
			<Avatar
				id='foto'
				size={props.tamaño}
				cursor='pointer'
				onClick={openChooseImage}
				src={userProfilePicture}>
				<AvatarBadge bg='brand.blue' boxSize='1em'>
					<svg width='0.4em' fill='currentColor' viewBox='0 0 20 20'>
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
				ref={profileImage}
				type='file'
				onChange={uploadImage}
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
		</Stack>
	);
}

export default avatar;
