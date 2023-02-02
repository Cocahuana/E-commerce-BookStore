import {
	Box,
	Container,
	Grid,
	GridItem,
	Spinner,
	Center,
	Flex,
} from "@chakra-ui/react";
import * as React from "react";
import { BookHolder } from "./BookHolder/BookHolder";
import { Book } from "./BookHolder/Book/Book";
import SearchBar from "./SearchBar/SearchBar";
import Filter from "./Filters/Filter";
import { Paging } from "./Paging/Paging";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
	getBooksByTitleOrAuthor,
	getCart,
	userGetFavorite,
} from "../../redux/actions";
import { useHistory } from "react-router-dom";
const BookShelf = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { cart, allFavourites, summary, userId, books, query, subscribed } =
		useSelector((state) => state);
	const [CurrentPage, setCurrentPage] = useState(1);
	const BooksPerPage = 12;
	const indexOfLastBook = CurrentPage * BooksPerPage;
	const indexOfFirstBook = indexOfLastBook - BooksPerPage;

	let slicedBooks = books.slice(indexOfFirstBook, indexOfLastBook);

	const loading = useSelector((state) => state.loading);

	const { token, userRole, isSignedIn } = useSelector((state) => state);

	const [favs, setFavs] = useState({});

	useEffect(() => {
		if (!books.length) dispatch(getBooksByTitleOrAuthor(query));
		if (userId) dispatch(userGetFavorite(userId));
		if (userId) dispatch(getCart(userId));
	}, [dispatch]);

	useEffect(() => {
		// setting variables in localStorage ----
		localStorage.setItem("cart", JSON.stringify(cart));
		localStorage.setItem("summary", JSON.stringify(summary));
		//localStorage.setItem('activeCartId', JSON.stringify(activeCart.id));
		// localStorage.setItem('favorites', JSON.stringify(allFavourites));
		if (token.length === 0) {
			localStorage.setItem("isSignedIn", false);
		} else {
			localStorage.setItem("isSignedIn", true);
			localStorage.setItem("token", token);
			localStorage.setItem("userRole", userRole);
		}
	}, [cart, token]);

	useEffect(() => {
		const favourites = {};
		for (let i = 0; allFavourites.length > i; i++) {
			favourites[allFavourites[i].id] = true;
		}
		setFavs(favourites);
	}, [allFavourites]);

	return (
		<Flex
			w={"100%"}
			flexDirection={"column"}
			align='center'
			justifyContent={"center"}
		>
			<Box
				pt={"16"}
				bg={"gray.100"}
				w={{ base: "100%", sm: "100%", md: "70%", lg: "70%" }}
			>
				<SearchBar setCurrentPage={setCurrentPage} />
			</Box>
			<Container
				minW={{ base: "100%", sm: "100%", md: "70%", lg: "70%" }}
				m='auto'
				py={"5"}
			>
				<Flex
					flexDirection={{
						base: "column",
						sm: "column",
						md: "column",
						xl: "row",
					}}
				>
					<Box minW={"sm"}>
						<Filter setCurrentPage={setCurrentPage} />
					</Box>
					<Box>
						<Box
							display={{ base: "none", md: "block", lg: "block" }}
							pt={{ md: "4", lg: "0" }}
						>
							<Paging
								BooksPerPage={BooksPerPage}
								TotalBooksLength={books.length}
								setCurrentPage={setCurrentPage}
								CurrentPage={CurrentPage}
							/>
						</Box>

						<Box
							px={{
								base: "4",
								md: "8",
								lg: "12",
							}}
							py={{
								base: "6",
								md: "8",
								lg: "12",
							}}
						>
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
									slicedBooks?.map((b) => (
										<Book
											isFav={favs[b.id]}
											setFavs={setFavs}
											key={b.id}
											product={b}
										/>
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
		</Flex>
	);
};

export default BookShelf;
