import {
	Box,
	GridItem,
	SimpleGrid,
	Text,
	chakra,
	Stack,
	FormLabel,
	FormControl,
	Input,
	Textarea,
	FormHelperText,
	Flex,
	Icon,
	VisuallyHidden,
	Button,
	Divider,
	Select,
	Container,
	Radio,
	useToast,
	RadioGroup,
	FormErrorMessage,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	HStack,
	Badge,
	Image,
} from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CloseIcon } from '@chakra-ui/icons';
import {
	createBook,
	getBooks,
	getBooksByTitleOrAuthor,
	getDetails,
	modifyBook,
	resetDetails,
} from '../../../redux/actions';
import { Link as BuenLink, useHistory } from 'react-router-dom';

function validate(input) {
	let errors = {};

	if (!input.title) {
		errors.title = 'Name is required';
	} else if (input.authors.length === 0) {
		errors.authors = 'Se requiere un author';
	} else if (input.genre.length === 0) {
		errors.genre = 'Se requiere genero';
	} else if (!input.rating) {
		errors.rating = 'Se requiere un rating';
	} else if (input.rating > 5 || input.rating <= 0) {
		errors.ratingN = 'Se requiere un valor entre 0 y 5';
	} else if (!input.price) {
		errors.price = 'Se requiere Precio';
	} else if (input.price < 1 || input.price > 60) {
		errors.priceM = 'Precio mayor a 1';
	} else if (!input.description) {
		errors.description = 'Se requiere una descripcion';
	}
	return errors;
}

function FormAdd(props) {
	const { genres } = useSelector((state) => state);
	const { details, token } = useSelector((state) => state);
	const dispatch = useDispatch();
	const history = useHistory();
	const toast = useToast();
	const image = useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
	//console.log('FORM-ADD', token);

	const [errors, setErrors] = useState({});

	const { id } = props.match.params;
	const namesREGEX =
		/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
	const tituloREGEX = /^[A-Za-z0-9À-ÿ\u00f1\u00d1\s\-_/,\.;:()]+$/;

	const [input, setInput] = useState({
		title: '',
		currency: 'USD',
		authors: '',
		description: '',
		price: 1,
		rating: 0,
		genre: [],
		image: '',
		language: 'ENGLISH',
	});

	useEffect(() => {
		if (id) {
			dispatch(getDetails(id));
		}
		return () => {
			dispatch(resetDetails(id));
			setInput({
				title: '',
				currency: 'USD',
				authors: '',
				description: '',
				price: 1,
				rating: 0,
				genre: [],
				image: '',
				language: 'ENGLISH',
			});
		};
	}, [dispatch]);

	id &&
		details.rating &&
		details.rating !== input.rating &&
		setInput({
			title: details.title,
			currency: details.currency,
			authors: details.authors,
			description: details.description,
			price: details.price,
			rating: details.rating,
			genre: details.Genres.map((g) => g.name),
			image: details.image,
			language: details.Languages[0].name,
		});

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	}

	function handdleSelectLanguage(e) {
		setInput({
			...input,
			language: e.target.value,
		});
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	}
	function handdleDescrip(e) {
		setInput({
			...input,
			authors: e.target.value,
		});
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	}

	function handdleSelectGenre(e) {
		if (!input.genre.includes(e.target.value)) {
			if (input.genre.length < 3) {
				setInput({
					...input,
					genre: [...input.genre, e.target.value],
				});
				setErrors(
					validate({
						...input,
						[e.target.name]: e.target.value,
					})
				);
			} else {
				toast({
					title: 'No se puede agregar mas de 3 generos',
					status: 'warning',
					isClosable: 'true',
					duration: '2000',
				});
			}
		} else {
			toast({
				title: 'No se puede agregar el mismo genero',
				status: 'warning',
				isClosable: 'true',
				duration: '2000',
			});
		}
	}

	const handleDeleteGenre = (e) => {
		setInput({
			...input,
			genre: input.genre.filter((gen) => gen !== e),
		});
	};

	const handleOnCancel = () => {
		history.push('/adminDashboard');
	};

	async function handleSubmit(e) {
		e.preventDefault();

		if (Object.values(errors).length > 0) {
			toast({
				title: 'Error',
				description: 'Complete los campos',
				status: 'error',
				duration: '2000',
				isClosable: 'true',
			});
		} else if (!tituloREGEX.test(input.title)) {
			toast({
				title: 'Invalid Title',
				description:
					' tiene que tener la primera letra en mayus y ser una cadena',
				status: 'warning',
				isClosable: 'true',
				duration: '2000',
			});
		} else if (!namesREGEX.test(input.authors)) {
			toast({
				title: 'Invalid Author',
				description:
					' tiene que tener la primera letra en mayus y ser una cadena',
				status: 'warning',
				isClosable: 'true',
				duration: '2000',
			});
		} else {
			if (id) {
				toast({
					title: 'Book Modify succesfully',
					status: 'success',
					isClosable: 'true',
					duration: '2500',
				});
				dispatch(modifyBook({ id, input }));
				dispatch(getBooks());
				history.push('/adminDashboard');
			} else {
				toast({
					title: 'Book created succesfully',
					status: 'success',
					isClosable: 'true',
					duration: '2500',
				});
				dispatch(createBook(input));
				dispatch(getBooks());

				history.push('/adminDashboard');
			}
			setInput({
				title: '',
				currency: 'USD',
				authors: [],
				description: '',
				price: 1,
				rating: 0,
				genre: [],
				image: '',
				language: 'ENGLISH',
			});
		}
	}

	const chooseimage = () => {
		image.current.click();
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
					setInput({
						...input,
						image: res.data.secure_url,
					})
				)
				.catch((err) => console.log(err));
		} else {
			onOpen();
		}
	};

	return (
		<Box
			bg='#edf3f8'
			_dark={{
				bg: '#111',
			}}
			pt={'20'}
			pb={'10'}>
			<Container maxW={'container.lg'}>
				<Box>
					<chakra.form
						shadow='base'
						rounded={[null, 'md']}
						onSubmit={(e) => handleSubmit(e)}
						overflow={{
							sm: 'hidden',
						}}>
						<Stack
							px={4}
							py={5}
							p={[null, 6]}
							bg='white'
							_dark={{
								bg: '#141517',
							}}
							spacing={6}>
							<SimpleGrid columns={6} spacing={6}>
								<FormControl
									isRequired
									as={GridItem}
									colSpan={[6, 3]}
									isInvalid={errors.title}>
									<FormLabel
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}>
										Name Of The Book
									</FormLabel>

									<Input
										type='text'
										value={input.title}
										onChange={handleChange}
										mt={1}
										name='title'
										shadow='sm'
										size='sm'
										w='full'
										rounded='md'
									/>
									{!errors.title ? (
										<FormHelperText>
											Title Book. first letter with upper
											case
										</FormHelperText>
									) : (
										<FormErrorMessage>
											Name is required.
										</FormErrorMessage>
									)}
								</FormControl>

								<FormControl
									isRequired
									as={GridItem}
									colSpan={[6, 3]}
									isInvalid={errors.authors}>
									<FormLabel
										htmlFor='last_name'
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}>
										Author
									</FormLabel>
									<Input
										type='text'
										value={input.authors}
										onChange={handdleDescrip}
										name='authors'
										mt={1}
										focusBorderColor='brand.400'
										shadow='sm'
										size='sm'
										w='full'
										rounded='md'
									/>
									{!errors.authors ? (
										<FormHelperText>
											Author Book first letter with upper
											case
										</FormHelperText>
									) : (
										<FormErrorMessage>
											Author is required.
										</FormErrorMessage>
									)}
								</FormControl>

								<FormControl as={GridItem} colSpan={3}>
									<FormLabel
										htmlFor='country'
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}>
										Language
									</FormLabel>
									<RadioGroup
										fontSize='sm'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}
										mt={4}
										value={input.language}>
										<Stack spacing={4}>
											<Radio
												value={'ESPAÑOL'}
												onChange={
													handdleSelectLanguage
												}>
												Español
											</Radio>
											<Radio
												value={'ENGLISH'}
												onChange={
													handdleSelectLanguage
												}>
												English
											</Radio>
										</Stack>
									</RadioGroup>
								</FormControl>
								<FormControl
									as={GridItem}
									colSpan={[6, 3]}
									isInvalid={errors.genre}>
									<FormLabel
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}>
										Genres/Category
									</FormLabel>
									<Select
										name='genre'
										placeholder='Select option'
										mt={1}
										shadow='sm'
										size='sm'
										w='full'
										rounded='md'
										onChange={handdleSelectGenre}>
										{genres.map((g, i) => (
											<option key={i} value={g.name}>
												{g.name}
											</option>
										))}
									</Select>
									{!errors.genre ? (
										<FormHelperText>
											Al menos 1 genero
										</FormHelperText>
									) : (
										<FormErrorMessage>
											Genre is required.
										</FormErrorMessage>
									)}
								</FormControl>

								<FormControl
									isRequired
									as={GridItem}
									colSpan={[6, 1]}
									isInvalid={errors.rating || errors.ratingN}>
									<FormLabel
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}>
										Rating
									</FormLabel>
									{id ? (
										<Input
											type='number'
											value={input.rating}
											onChange={handleChange}
											name='rating'
											mt={1}
											shadow='sm'
											size='sm'
											w='full'
											rounded='md'
											disabled
										/>
									) : (
										<Input
											type='number'
											value={input.rating}
											onChange={handleChange}
											name='rating'
											mt={1}
											shadow='sm'
											size='sm'
											w='full'
											rounded='md'
										/>
									)}

									{errors.rating ? (
										<FormErrorMessage>
											Rating is required.
										</FormErrorMessage>
									) : (
										<FormErrorMessage></FormErrorMessage>
									)}
									{errors.ratingN ? (
										<FormErrorMessage>
											Rating between 0 and 5.
										</FormErrorMessage>
									) : (
										<FormErrorMessage></FormErrorMessage>
									)}
								</FormControl>
								<FormControl
									isRequired
									as={GridItem}
									colSpan={[6, 2]}
									isInvalid={errors.price || errors.priceM}>
									<FormLabel
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}>
										Price
									</FormLabel>
									<Input
										type={'number'}
										onChange={handleChange}
										value={input.price}
										name='price'
										mt={1}
										shadow='sm'
										size='sm'
										w='full'
										rounded='md'
									/>
									{errors.price ? (
										<FormErrorMessage>
											Price is required.
										</FormErrorMessage>
									) : (
										<FormHelperText>US$</FormHelperText>
									)}
									{errors.priceM ? (
										<FormErrorMessage>
											Price min $1 and max $60.
										</FormErrorMessage>
									) : (
										<FormErrorMessage></FormErrorMessage>
									)}
								</FormControl>
								<Stack
									as={GridItem}
									direction='row'
									colSpan={[6, 3]}
									align='center'
									justify={'center'}>
									{input.genre?.map((l, i) => (
										<Button
											onClick={() => handleDeleteGenre(l)}
											key={i}
											rightIcon={<CloseIcon w={3} />}
											size={'md'}>
											{l}
										</Button>
									))}
								</Stack>
							</SimpleGrid>
						</Stack>

						<Stack
							px={4}
							py={5}
							bg='white'
							_dark={{
								bg: '#141517',
							}}
							spacing={6}
							p={{
								sm: 6,
							}}>
							<div>
								<FormControl
									id='email'
									mt={1}
									isInvalid={errors.description}>
									<FormLabel
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}>
										Description
									</FormLabel>
									<Textarea
										placeholder='This book is amazing ...'
										mt={1}
										rows={3}
										name='description'
										value={input.description}
										onChange={handleChange}
										shadow='sm'
										focusBorderColor='brand.400'
										fontSize={{
											sm: 'sm',
										}}
									/>
									{errors.description ? (
										<FormErrorMessage>
											Description is required.
										</FormErrorMessage>
									) : (
										<FormHelperText>
											Descripcion ...
										</FormHelperText>
									)}
								</FormControl>
							</div>

							<FormControl isRequired>
								<FormLabel
									fontSize='sm'
									fontWeight='md'
									color='gray.700'
									_dark={{
										color: 'gray.50',
									}}>
									Image Book
								</FormLabel>
								<Flex
									mt={1}
									justify='center'
									px={6}
									pt={5}
									pb={6}
									borderWidth={2}
									_dark={{
										color: 'gray.500',
									}}
									borderStyle='dashed'
									rounded='md'>
									<Button h={'100%'} onClick={chooseimage}>
										{/* <Input
											name='image'
											value={input.image}
											onChange={handleChange}
											type={'url'}
										/> */}
										{
											<Stack
												spacing={1}
												textAlign='center'>
												<Icon
													mx='auto'
													boxSize={12}
													color='gray.400'
													_dark={{
														color: 'gray.500',
													}}
													stroke='currentColor'
													fill='none'
													viewBox='0 0 48 48'
													aria-hidden='true'>
													<path
														d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
														strokeWidth='2'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
												</Icon>
												<Image
													w={'xs'}
													src={input.image}
												/>
												<Flex
													fontSize='sm'
													color='gray.600'
													_dark={{
														color: 'gray.400',
													}}
													alignItems='baseline'>
													<chakra.label
														htmlFor='file-upload'
														cursor='pointer'
														rounded='md'
														fontSize='md'
														color='brand.pepe'
														_dark={{
															color: 'brand.200',
														}}
														pos='relative'
														_hover={{
															color: 'brand.400',
															_dark: {
																color: 'brand.300',
															},
														}}>
														<span>
															Upload a file
														</span>
														<VisuallyHidden>
															<input
																name='image'
																ref={image}
																onChange={
																	uploadImage
																}
																type='file'
															/>
														</VisuallyHidden>
													</chakra.label>
													<Text pl={1}>
														or drag and drop
													</Text>
												</Flex>
												<Text
													fontSize='xs'
													color='gray.500'
													_dark={{
														color: 'gray.50',
													}}>
													PNG, JPG, GIF up to 10MB
												</Text>
											</Stack>
										}
									</Button>
								</Flex>
							</FormControl>
						</Stack>

						<Box
							px={{
								base: 4,
								sm: 6,
							}}
							py={3}
							bg='gray.50'
							_dark={{
								bg: '#121212',
							}}
							textAlign='right'
							pb='16'>
							<Button
								type='submit'
								colorScheme='blue'
								_focus={{
									shadow: '',
								}}
								fontWeight='md'
								mr='5'
								onClick={() => handleOnCancel()}>
								Cancel
							</Button>
							{id ? (
								<Button
									type='submit'
									colorScheme='green'
									_focus={{
										shadow: '',
									}}
									fontWeight='md'>
									Modify Book
								</Button>
							) : (
								<Button
									type='submit'
									colorScheme='blue'
									_focus={{
										shadow: '',
									}}
									fontWeight='md'>
									Create Book
								</Button>
							)}
						</Box>
					</chakra.form>
				</Box>
			</Container>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Something went wrong</ModalHeader>
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
		</Box>
	);
}

export default FormAdd;
