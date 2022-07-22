import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
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
	/*var products = [
		{
			id: '1',
			name: 'Bamboo Tan',
			currency: 'USD',
			price: 199,
			flag: 'new',
			imageUrl:
				'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
			rating: 4,
			ratingCount: 1,
			description:
				'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
		},
		{
			id: '2',
			name: 'Iconic Turquoise',
			currency: 'USD',
			price: 199,
			salePrice: 179.99,
			flag: 'on-sale',
			imageUrl:
				'https://images.unsplash.com/photo-1509941943102-10c232535736?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
			rating: 4,
			ratingCount: 12,
			description:
				'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
		},
		{
			id: '3',
			name: 'Marble Leather',
			currency: 'USD',
			price: 199,
			imageUrl:
				'https://images.unsplash.com/photo-1564594985645-4427056e22e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
			rating: 4,
			ratingCount: 12,
			description:
				'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
		},
		{
			id: '4',
			name: 'Silve wolf',
			currency: 'GBP',
			price: 199,
			imageUrl:
				'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80',
			rating: 5,
			ratingCount: 1,
			description:
				'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
		},
		{
			id: '5',
			name: 'Bamboo Tan',
			currency: 'USD',
			price: 199,
			flag: 'new',
			imageUrl:
				'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
			rating: 4,
			ratingCount: 1,
			description:
				'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
		},
		{
			id: '6',
			name: 'Iconic Turquoise',
			currency: 'USD',
			price: 199,
			salePrice: 179.99,
			flag: 'on-sale',
			imageUrl:
				'https://images.unsplash.com/photo-1509941943102-10c232535736?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
			rating: 4,
			ratingCount: 12,
			description:
				'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
		},
		{
			id: '7',
			name: 'Marble Leather',
			currency: 'USD',
			price: 199,
			imageUrl:
				'https://images.unsplash.com/photo-1564594985645-4427056e22e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
			rating: 4,
			ratingCount: 12,
			description:
				'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
		},
		{
			id: '8',
			name: 'Silve wolf',
			currency: 'GBP',
			price: 199,
			imageUrl:
				'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80',
			rating: 5,
			ratingCount: 1,
			description:
				'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
		},
		{
			id: '9',
			name: 'Bamboo Tan',
			currency: 'USD',
			price: 199,
			flag: 'new',
			imageUrl:
				'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
			rating: 4,
			ratingCount: 1,
			description:
				'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
		},
		{
			id: '10',
			name: 'Iconic Turquoise',
			currency: 'USD',
			price: 199,
			salePrice: 179.99,
			flag: 'on-sale',
			imageUrl:
				'https://images.unsplash.com/photo-1509941943102-10c232535736?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
			rating: 4,
			ratingCount: 12,
			description:
				'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
		},
	];*/
	const dispatch = useDispatch();
	const { books } = useSelector((state) => state);
	const [CurrentPage, setCurrentPage] = useState(1);
	const BooksPerPage = 10;
	const indexOfLastBook = CurrentPage * BooksPerPage;
	const indexOfFirstBook = indexOfLastBook - BooksPerPage;

	let slicedBooks = books.slice(indexOfFirstBook, indexOfLastBook);

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
			h='95em'
			pt='20'
			gap='1'
			fontWeight='bold'>
			<GridItem pl='2' area={'header'}>
				<SearchBar />
			</GridItem>
			<GridItem pl='2' area={'nav'}>
				<Filter />
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
						{slicedBooks.map((b) => (
							<Book key={b.id} product={b} />
						))}
					</BookHolder>
				</Box>
				<Paging
					BooksPerPage={BooksPerPage}
					TotalBooksLength={books.length}
					setCurrentPage={setCurrentPage}
					currentpage={CurrentPage}
				/>
			</GridItem>
		</Grid>
	);
};

export default BookShelf;
