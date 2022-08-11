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
	useToast,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IoLogInOutline } from 'react-icons/io5';
import {
	postComment,
	userGetPurchases,
	clearCart,
	addToCart,
} from '../../redux/actions';
import Rating from './Rating';
import Swal from 'sweetalert2';

function CommentPoster({ id }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { userId, userRole, purchases, isSignedIn } = useSelector(
		(state) => state
	);
	const dispatch = useDispatch();
	const toast = useToast();
	const history = useHistory();
	const firstField = React.useRef();
	const [textarea, setTextArea] = useState('');
	const [rating, setRating] = useState(0);
	const [allowPost, setAllowPost] = useState(false);

	useEffect(() => {
		if (userId) dispatch(userGetPurchases(userId));
	}, []);

	if (purchases.length) {
		var bought = !!purchases
			?.map((e) => e.Books)
			.flat()
			.filter((e) => e.id == id).length;
		if (allowPost !== bought) {
			setAllowPost(bought);
		}
	}

	const handleOnChange = (e) => {
		setTextArea(e.target.value);
	};

	const handlePost = () => {
		if (rating === 0 || textarea === '') {
			alert(
				'please Complete the information required, plus, rating cant be 0'
			);
		} else {
			if (allowPost) {
				dispatch(
					postComment({
						comment: textarea,
						rating: rating,
						userId: userId,
						bookId: id,
					})
				);
			} else {
				Swal.fire({
					title: 'You need to have had bought the book to leave a review',
					showCancelButton: true,
					confirmButtonText: 'Buy',
				}).then((result) => {
					if (result.isConfirmed) {
						dispatch(clearCart(userId));
						setTimeout(() => {
							dispatch(addToCart(id, userId));
							history.push('/purchase');
						}, 300);
					}
				});
			}
			setTextArea('');
			onClose();
		}
	};

	if (userRole !== 'Banned') {
		return (
			<>
				{userId ? (
					<Button
						leftIcon={<EditIcon />}
						colorScheme='blue'
						onClick={onOpen}>
						Add Review
					</Button>
				) : (
					<Button
						leftIcon={<IoLogInOutline />}
						colorScheme='blue'
						onClick={() => history.push('/login')}>
						Sign in and leave a review!
					</Button>
				)}
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
			<Stack p={'5px'}>
				<Text color={useColorModeValue('red.400')} fontSize={'20px'}>
					Usted esta baneado, no puede postear comentarios
				</Text>
			</Stack>
		);
	}
}

export default CommentPoster;
