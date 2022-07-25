import {
	Box,
	Container,
	Grid,
	GridItem,
	Spinner,
	Center,
} from '@chakra-ui/react';
import * as React from 'react';
import { BookHolder } from './BookHolder/BookHolder';
import { Book } from './BookHolder/Book/Book';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filters/Filter';
import { Paging } from './Paging/Paging';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBooks } from '../../../redux/actions';

const BookShelf = () => {
	const dispatch = useDispatch();
	const { books } = useSelector((state) => state);
	const [CurrentPage, setCurrentPage] = useState(1);
	const BooksPerPage = 10;
	const indexOfLastBook = CurrentPage * BooksPerPage;
	const indexOfFirstBook = indexOfLastBook - BooksPerPage;

	let slicedBooks = books.slice(indexOfFirstBook, indexOfLastBook);

	const loading = useSelector((state) => state.loading);

	useEffect(() => {
		if (!books.length) dispatch(getBooks());
	}, [dispatch]);

	return (
		<Grid
			templateAreas={`"header header"
		          "nav main"
		          "nav footer"`}
			gridTemplateRows={'300px 1fr 50px'}
			gridTemplateColumns={'300px 1fr'}
			h='100em'
			pt='20'
			gap='1'
			fontWeight='bold'>
			<GridItem pl='2' area={'header'}>
				<SearchBar setCurrentPage={setCurrentPage} />
			</GridItem>
			<GridItem pl='2' area={'nav'}>
				<Filter setCurrentPage={setCurrentPage} />
			</GridItem>
			<GridItem pl='2' bg='whiteAlpha.100' area={'main'}>
				<Paging
					BooksPerPage={BooksPerPage}
					TotalBooksLength={books.length}
					setCurrentPage={setCurrentPage}
					CurrentPage={CurrentPage}
				/>
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
						) : typeof slicedBooks === 'string' ||
						  slicedBooks.length === 0 ? (
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
			</GridItem>
		</Grid>
	);
};

export default BookShelf;
