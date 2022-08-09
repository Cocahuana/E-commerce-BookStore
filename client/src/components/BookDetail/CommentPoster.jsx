import { AddIcon, EditIcon } from '@chakra-ui/icons';
import {
	Box,
	Stack,
	Button,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	FormLabel,
	Textarea,
	useDisclosure,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../redux/actions';
import Rating from './Rating';

function CommentPoster({ id }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { userId, userRole } = useSelector((state) => state);
	const dispatch = useDispatch();
	const firstField = React.useRef();
	const [textarea, setTextArea] = useState('');
	const [rating, setRating] = useState(0);
	const [errors, setErrors] = useState({});

	const handleOnChange = (e) => {
		setTextArea(e.target.value);
	};

	const handlePost = () => {
		if (rating === 0 || textarea === '') {
			alert(
				'please Complete the information required, plus, rating cant be 0'
			);
		} else {
			dispatch(
				postComment({
					comment: textarea,
					rating: rating,
					userId: userId,
					bookId: id,
				})
			);
			setTextArea('');
			onClose();
		}
	};

	if (userRole !== 'Banned') {
		return (
			<>
				<Button
					leftIcon={<EditIcon />}
					colorScheme='teal'
					onClick={onOpen}>
					Add Review
				</Button>
				<Drawer
					isOpen={isOpen}
					placement='bottom'
					initialFocusRef={firstField}
					onClose={onClose}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader borderBottomWidth='1px'>
							Create your review!
						</DrawerHeader>

						<DrawerBody>
							<Stack spacing='24px'>
								<Box>
									<FormLabel>Review</FormLabel>
									<Textarea
										ref={firstField}
										value={textarea}
										onChange={handleOnChange}
										id='comment'
										placeholder={`I loved this book! Buy it, you won't regret it ;)`}
									/>
								</Box>

								<Box>
									<Rating
										size={43}
										icon='star'
										scale={5}
										fillColor='gold'
										strokeColor='grey'
										setStars={setRating}
									/>
								</Box>
							</Stack>
						</DrawerBody>

						<DrawerFooter borderTopWidth='1px'>
							<Button variant='outline' mr={3} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='blue' onClick={handlePost}>
								Submit
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</>
		);
	} else {
		return (
			<Stack p={"5px"}>
				<Text color={useColorModeValue("red.400")} fontSize={"20px"}>Usted esta baneado, no puede postear comentarios</Text>
			</Stack>
		)
	}
};

export default CommentPoster;
