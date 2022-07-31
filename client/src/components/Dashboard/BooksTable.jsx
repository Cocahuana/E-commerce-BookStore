import React, { useEffect, useState } from 'react';
import {
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	chakra,
	Badge,
	Button,
	Flex,
	Td,
	Icon,
	Box,
	Image,
	Stack,
	Input,
	InputGroup,
	InputRightElement,
	Center,
	CircularProgress,
} from '@chakra-ui/react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import { Search2Icon, SmallAddIcon } from '@chakra-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getBooksByTitleOrAuthor } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { Link as BuenLink } from 'react-router-dom';

function BooksTable({ books }) {
	const textColor = useColorModeValue('gray.700', 'white');
	const dispatch = useDispatch();

	const [scroll, setScroll] = useState(Array.from(books.data.slice(0, 20)));
	const [titleBook, setTitleBook] = useState();

	const fetchMoreData = () => {
		setTimeout(() => {
			setScroll(
				scroll.concat(
					Array.from(books.slice(scroll.length, scroll.length + 20))
				)
			);
		}, 2000);
	};

	// function handleInputChange(e) {
	// 	e.preventDefault();
	// 	setTitleBook(e.target.value);
	// }

	// useEffect(() => {
	// 	dispatch(getBooksByTitleOrAuthor(titleBook));
	// }, [titleBook]);

	return (
		<Box rounded={'md'} boxShadow={'xl'}>
			<Flex p={'10'} justify={'space-between'} align='center'>
				<Box>
					<chakra.h1 fontWeight={'bold'} fontSize={'3xl'}>
						List All Books
					</chakra.h1>
					<BuenLink to='/addBook'>
						<Button p='0px' variant='no-hover'>
							<SmallAddIcon color={'green.600'} bg='green.100' />
							<Text
								fontSize='md'
								color='gray.600'
								fontWeight='bold'
								cursor='pointer'>
								Create
							</Text>
						</Button>
					</BuenLink>
				</Box>
				<Flex>
					<InputGroup>
						<Input />
						<InputRightElement>
							<Search2Icon />
						</InputRightElement>
					</InputGroup>
				</Flex>
			</Flex>
			<InfiniteScroll
				dataLength={scroll.length}
				next={fetchMoreData}
				hasMore={true}
				loader={
					<Center>
						<Box p={'4'}>
							<CircularProgress value={32} color={'blue.200'} />
						</Box>
					</Center>
				}>
				<Table variant='simple' color={textColor}>
					<Thead>
						<Tr my='.8rem' pl='0px' color='gray.400'>
							<Th color='gray.400'>Books</Th>
							<Th color='gray.400'>Price</Th>
							<Th color='gray.400'>Books</Th>
							<Th color='gray.400'>Rating</Th>
							<Th color='gray.400'>Edit</Th>
							<Th color='gray.400'>Delete</Th>
						</Tr>
					</Thead>

					<Tbody>
						{scroll.map((b, i) => (
							<Tr key={i}>
								<Td minWidth={{ sm: '250px' }} pl='0px'>
									<Flex
										align='center'
										py='.8rem'
										minWidth='100%'
										flexWrap='nowrap'
										pl={'4'}>
										<Image
											w='40px'
											borderRadius='10px'
											me='18px'
											src={b.image}
										/>
										<Flex direction='column'>
											<Text
												fontSize='md'
												color={textColor}
												fontWeight='bold'
												minWidth='10px'>
												{b.title}
											</Text>
											<Text
												fontSize='sm'
												color='gray.400'
												fontWeight='normal'>
												{b.authors}
											</Text>
										</Flex>
									</Flex>
								</Td>

								<Td>
									<Flex direction='column'>
										<Text
											fontSize='md'
											color={textColor}
											fontWeight='bold'>
											Price
										</Text>
										<Text
											fontSize='sm'
											color='gray.400'
											fontWeight='normal'>
											${b.price}
										</Text>
									</Flex>
								</Td>
								<Td>
									<Badge
										fontSize='16px'
										p='3px 10px'
										borderRadius='8px'>
										Stock
									</Badge>
								</Td>
								<Td>
									<Text
										fontSize='md'
										color={textColor}
										fontWeight='bold'
										pb='.5rem'>
										{b.rating}
									</Text>
								</Td>
								<Td>
									<Button
										p='0px'
										bg='transparent'
										variant='no-hover'>
										<Icon
											color='blue.300'
											as={FaPencilAlt}
											me='4px'
										/>
										<Text
											fontSize='md'
											color='gray.400'
											fontWeight='bold'
											cursor='pointer'>
											Edit
										</Text>
									</Button>
								</Td>
								<Td>
									<Button
										p='0px'
										bg='transparent'
										variant='no-hover'>
										<Text
											fontSize='md'
											color='gray.400'
											fontWeight='bold'
											cursor='pointer'>
											<Icon
												color='red.500'
												as={FaTrashAlt}
												me='4px'
											/>
											Delete {b.id}
										</Text>
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</InfiniteScroll>
		</Box>
	);
}

export default BooksTable;
