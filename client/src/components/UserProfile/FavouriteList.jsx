import React from 'react';
import {
	userGetFavorite,
	userAddFavorite,
	userDeleteFavorite,
} from '../../redux/actions/index.js';
import { useDispatch } from 'react-redux';
import {
	Stack,
	HStack,
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure,
	List,
	ListItem,
} from '@chakra-ui/react';

export function favourites() {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleFavorite = () => {
		dispatch(userGetFavorite()); //userid
	};

	const addFavorite = () => {
		dispatch(userAddFavorite()); //userid, bookid
	};

	const deleteFavorite = () => {
		dispatch(userDeleteFavorite()); //userid, bookid
	};

	return (
		<Stack w="full">
			<Button w="full" onClick={onOpen}>
				Favourite list
			</Button>
			<Modal isCentered size={'xxl'} isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					<ModalHeader>Favourite List</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<HStack mt={1}>
							<List>
								<ListItem></ListItem>
							</List>
						</HStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Stack>
	);
}

export default favourites;
