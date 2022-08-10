import { Search2Icon } from '@chakra-ui/icons';
import {
	Box,
	Stack,
	useColorModeValue,
	chakra,
	Input,
	InputGroup,
	InputRightElement,
	Button,
	Flex,
	FormControl,
	FormLabel,
	FormHelperText,
	Image,
	VisuallyHidden,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getBooksByTitleOrAuthor,
	resetFilters,
} from '../../../redux/actions/index';
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import axios from 'axios';

function SearchBar({ setCurrentPage }) {
	const dispatch = useDispatch();
	const { query, booksAutocomplete } = useSelector((state) => state);
	const [title, setTitle] = useState('');

	useEffect(() => {
		setTitle(query);
	}, [query]);

	function handleInputChange(e) {
		e.preventDefault();
		setTitle(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getBooksByTitleOrAuthor(title));
		dispatch(resetFilters());
		setCurrentPage(1);
	}

	return (
		<Box pb={8} bg={useColorModeValue('whiteAlpha.100', 'gray.500')}>
			<Stack
				bg={useColorModeValue('white', 'gray.300')}
				height='120px'
				w='100%'></Stack>
			<Box
				maxW='7xl'
				p={4}
				isolation='isolate'
				mt='-6rem'
				marginInline='auto'>
				<Box
					boxShadow={useColorModeValue(
						'0 4px 6px rgba(160, 174, 192, 0.6)',
						'0 4px 6px rgba(9, 17, 28, 0.9)'
					)}
					bg={useColorModeValue('white', 'gray.800')}
					p={{ base: 4, sm: 8 }}
					overflow='hidden'
					rounded='2xl'>
					<Stack
						pos='relative'
						zIndex={1}
						direction='column'
						spacing={5}
						textAlign='center'>
						<chakra.h1
							fontSize='xl'
							lineHeight={1.2}
							fontWeight='bold'>
							Explore All Books
						</chakra.h1>

						<Stack
							direction={{ base: 'column', md: 'row' }}
							spacing={3}
							justify='center'>
							<chakra.form w='full' mb={6}>
								<Box
									display={{
										base: 'block',
										lg: 'none',
									}}>
									<Input
										size='lg'
										type='text'
										placeholder='Find your book, author here...'
										value={title}
										onChange={(e) => handleInputChange(e)}
									/>
								</Box>

								<InputGroup size='lg' w='full'>
									{/* <Input
										size='lg'
										color='brand.900'
										type='text'
										placeholder='Find your book, author, here...'
										value={query}
										onChange={(e) => handleInputChange(e)}
									/> */}
									<Flex
										pb='48'
										justify='center'
										align='center'
										w='full'>
										<FormControl w='100%' zIndex={5}>
											<AutoComplete openOnFocus>
												<AutoCompleteInput
													variant='filled'
													size={'lg'}
													value={title}
													onChange={(e) =>
														handleInputChange(e)
													}
												/>
												<AutoCompleteList maxH='200px'>
													{booksAutocomplete.map(
														(b, id) => (
															<AutoCompleteItem
																key={`option-${id}`}
																value={b.title}>
																<Button
																	w='100%'
																	h='100%'
																	align={
																		'center'
																	}
																	justifyContent='flex-start'
																	value={
																		b.title
																	}
																	onClick={
																		handleInputChange
																	}>
																	<Image
																		rounded={
																			'md'
																		}
																		alt={
																			'book image'
																		}
																		src={
																			b?.image
																		}
																		fit={
																			'container'
																		}
																		align={
																			'center'
																		}
																		justifyContent='flex-start'
																		maxW={{
																			base: '50px',
																			sm: '50px',
																			lg: '50px',
																		}}
																		maxH={{
																			base: '50px',
																			sm: '50px',
																			lg: '50px',
																		}}
																		mr='10px'
																	/>
																	<Text
																		overflow={
																			'hidden'
																		}
																		textOverflow='ellipsis'>
																		{
																			b.title
																		}
																	</Text>
																</Button>
															</AutoCompleteItem>
														)
													)}
												</AutoCompleteList>
											</AutoComplete>
										</FormControl>

										<Button
											onClick={handleSubmit}
											color='white'
											variant='solid'
											bg={'brand.pepe'}
											size='lg'
											type='button'
											roundedLeft={0}
											leftIcon={<Search2Icon />}>
											Search
										</Button>
									</Flex>
								</InputGroup>
							</chakra.form>
						</Stack>
					</Stack>
				</Box>
			</Box>
		</Box>
	);
}

export default SearchBar;
