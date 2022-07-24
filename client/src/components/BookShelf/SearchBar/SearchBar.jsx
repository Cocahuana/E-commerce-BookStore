import { Search2Icon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	Stack,
	Text,
	useColorModeValue,
	chakra,
	Spacer,
	Input,
	Image,
	InputGroup,
	InputRightElement,
	Button,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	getBooksByTitleOrAuthor,
	getBooks,
} from '../../../../redux/actions/index';

function SearchBar({ setCurrentPage }) {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');

	function handleInputChange(e) {
		e.preventDefault();
		setTitle(e.target.value);
		console.log(title);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getBooksByTitleOrAuthor(title));
		setTitle('');
		setCurrentPage(1);
	}

	function handleOnEmpty(e) {
		e.preventDefault();
		dispatch(getBooks());
		setTitle('');
		setCurrentPage(1);
	}

	return (
		<Box pb={8} bg='blackAlpha.200'>
			<Stack
				pos='relative'
				bg='whiteAlpha.800'
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
							fontSize='4xl'
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
										color='brand.900'
										type='text'
										placeholder='Find your book, author here...'
										bg='white'
										value={title}
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
									<Input
										size='lg'
										color='brand.900'
										type='text'
										placeholder='Find your book, author, here...'
										bg='white'
										value={title}
										onChange={(e) => handleInputChange(e)}
									/>
									<InputRightElement
										w='auto'
										bg='blue.500'
										roundedRight={4}>
										<Button
											onClick={handleSubmit}
											color='white'
											variant='solid'
											colorScheme='brand'
											size='lg'
											type='submit'
											roundedLeft={0}
											leftIcon={<Search2Icon />}>
											Search
										</Button>
										<Button
											onClick={handleOnEmpty}
											color='white'
											variant='solid'
											colorScheme='brand'
											size='lg'
											type='submit'
											roundedLeft={0}
											leftIcon={<Search2Icon />}>
											Empty Search
										</Button>
									</InputRightElement>
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
