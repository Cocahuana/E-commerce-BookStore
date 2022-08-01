import {
	Box,
	Container,
	Grid,
	GridItem,
	Spinner,
	Center,
	Flex,
} from '@chakra-ui/react';
import * as React from 'react';
import { BookHolder } from './BookHolder/BookHolder';
import { Book } from './BookHolder/Book/Book';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filters/Filter';
import { Paging } from './Paging/Paging';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBooksByTitleOrAuthor, userGetFavorite } from '../../redux/actions';

const BookShelf = () => {
	const dispatch = useDispatch();
	const { books, query } = useSelector((state) => state);
	const [CurrentPage, setCurrentPage] = useState(1);
	const BooksPerPage = 12;
	const indexOfLastBook = CurrentPage * BooksPerPage;
	const indexOfFirstBook = indexOfLastBook - BooksPerPage;

	const { cart } = useSelector((state) => state);
	const { summary } = useSelector((state) => state);
	const { userId } = useSelector((state) => state);

	let slicedBooks = books.slice(indexOfFirstBook, indexOfLastBook);

	const loading = useSelector((state) => state.loading);

	const { token, userRole } = useSelector((state) => state);

	useEffect(() => {
		if (!books.length) dispatch(getBooksByTitleOrAuthor(query));
		dispatch(userGetFavorite(userId));
		// setting variables in localStorage ----
		localStorage.setItem('cart', JSON.stringify(cart));
		localStorage.setItem('summary', JSON.stringify(summary));
		if (token.length === 0) {
			localStorage.setItem('isSignedIn', false);
		} else {
			localStorage.setItem('isSignedIn', true);
			localStorage.setItem('token', token);
			localStorage.setItem('userRole', userRole);
		}
	}, [dispatch, cart, token]);

	return (
		<Box>
			<Box pt={'16'} bg={'gray.100'}>
				<SearchBar setCurrentPage={setCurrentPage} />
			</Box>
			<Container maxW={'container.xl'} py={'5'}>
				<Flex
					flexDirection={{
						base: 'column',
						sm: 'column',
						md: 'column',
						xl: 'row',
					}}>
					<Box minW={'xs'}>
						<Filter setCurrentPage={setCurrentPage} />
					</Box>
					<Box>
						<Box
							display={{ base: 'none', md: 'block', lg: 'block' }}
							pt={{ md: '4', lg: '0' }}>
							<Paging
								BooksPerPage={BooksPerPage}
								TotalBooksLength={books.length}
								setCurrentPage={setCurrentPage}
								CurrentPage={CurrentPage}
							/>
						</Box>

						<Box
							maxW='7xl'
							mx='auto'
							px={{
								base: '4',
								md: '8',
								lg: '12',
							}}
							py={{
								base: '6',
								md: '8',
								lg: '12',
							}}>
							<BookHolder>
								{loading ? (
									<Center>
										<Spinner
											thickness='4px'
											speed='0.65s'
											emptyColor='gray.200'
											color='blue.500'
											size='xl'
										/>
									</Center>
								) : slicedBooks.length === 0 ? (
									<h2>No books found!</h2>
								) : (
									slicedBooks.map((b) => (
										<Book key={b.id} product={b} />
									))
								)}
							</BookHolder>
						</Box>
						<Paging
							BooksPerPage={BooksPerPage}
							TotalBooksLength={books.length}
							setCurrentPage={setCurrentPage}
							CurrentPage={CurrentPage}
						/>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
};

export default BookShelf;
