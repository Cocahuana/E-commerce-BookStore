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

function SearchBar({ setCurrentPage }) {
	const dispatch = useDispatch();
	const { query, books } = useSelector((state) => state);

	function handleInputChange(e) {
		e.preventDefault();
		dispatch(getBooksByTitleOrAuthor(e.target.value));
		dispatch(resetFilters());
		setCurrentPage(1);
	}

	// function handleSubmit(e) {
	// 	e.preventDefault();
	// 	dispatch(getBooksByTitleOrAuthor(title));
	// 	setTitle('');
	// 	setCurrentPage(1);
	// }

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
										value={query}
										onChange={(e) => handleInputChange(e)}
									/>
								</Box>

								<InputGroup
									size='lg'
									w='full'
									display={{
										base: 'none',
										lg: 'flex',
									}}>
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
													placeholder='Find your book, author, here...'
													onChange={(e) =>
														handleInputChange(e)
													}
													onClick={(e) =>
														handleInputChange(e)
													}
												/>
												<AutoCompleteList>
													{books.map((b, id) => (
														<AutoCompleteItem
															key={`option-${id}`}
															value={b.title}
															textTransform='capitalize'>
															<Button
																w='100%'
																h='100%'
																value={b.title}
																onClick={(e) =>
																	handleInputChange(
																		e
																	)
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
																	w={{
																		base: '50px',
																		sm: '50px',
																		lg: '50px',
																	}}
																	h={{
																		base: '50px',
																		sm: '50px',
																		lg: '50px',
																	}}
																/>
																{b.title}
															</Button>
														</AutoCompleteItem>
													))}
												</AutoCompleteList>
											</AutoComplete>
										</FormControl>

										<Button
											// onClick={handleSubmit}
											color='white'
											variant='solid'
											bg={'brand.pepe'}
											size='lg'
											type='submit'
											roundedLeft={0}
											leftIcon={<Search2Icon />}>
											Empty Search
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
