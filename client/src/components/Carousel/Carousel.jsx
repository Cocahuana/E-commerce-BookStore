import {
	Box,
	Button,
	chakra,
	Container,
	Flex,
	Image,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, saveFilterGenre } from "../../redux/actions/index";
import { Link as BuenLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Carousel({ books }) {
	const dispatch = useDispatch();
	const { genres, loading } = useSelector((state) => state);
	const history = useHistory();

	const handleSelect = (e) => {
		dispatch(saveFilterGenre([e.target.value]));
		history.push("/books");
	};

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	const responsive = {
		0: { items: 1 },
		568: { items: 2 },
		1024: { items: 4 },
	};

	let booksToSort = books;

	return (
		<Container maxW='7xl' p={{ base: 5, md: 8 }}>
			<Stack pt={2} minH={300} justifyContent='center'>
				<Box p={2}>
					<Flex justifyContent='space-between'>
						<chakra.h1
							fontSize={{
								base: "10px",
								md: "15px",
								lg: "20px",
							}}
							fontWeight='semibold'
							color='brand.600'
							lineHeight='shorter'
						>
							Category
						</chakra.h1>
						<BuenLink to='/books'>
							<chakra.h1
								fontSize={{
									base: "10px",
									md: "15px",
									lg: "20px",
								}}
								fontWeight='semibold'
								color='brand.600'
								lineHeight='shorter'
								cursor='pointer'
							>
								Show all -
							</chakra.h1>
						</BuenLink>
					</Flex>
				</Box>
				<SimpleGrid
					columns={{ base: 1, sm: 2, md: 5, lg: 6 }}
					spacing={5}
					mt={2}
				>
					{genres?.slice(0, 6).map((p, i) => (
						<Button
							key={i}
							p={2}
							size='lg'
							boxShadow='md'
							rounded='md'
							align='center'
							value={p.name}
							onClick={handleSelect}
							cursor='pointer'
							fontSize={{ base: "sm", md: "md", lg: "lg" }}
						>
							{p.name}
						</Button>
					))}
				</SimpleGrid>
			</Stack>
			<Stack pt={1} minH={400} justifyContent='center'>
				<Box p={2}>
					<Flex justifyContent='space-between'>
						<chakra.h1
							fontSize={{
								base: "10px",
								md: "15px",
								lg: "20px",
							}}
							fontWeight='semibold'
							color='brand.600'
							lineHeight='shorter'
						>
							Recent releases
						</chakra.h1>
						<BuenLink to='/books'>
							<chakra.h1
								fontSize={{
									base: "10px",
									md: "15px",
									lg: "20px",
								}}
								fontWeight='semibold'
								color='brand.600'
								lineHeight='shorter'
								cursor='pointer'
							>
								Show all -
							</chakra.h1>
						</BuenLink>
					</Flex>
				</Box>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={5}>
					{books
						?.slice(books.length - 6, books.length - 1) // ULTIMOS LIBROS AGREGADOS
						?.map((b, i) => (
							<BuenLink to={`/book/${b.id}`} key={i}>
								<Box
									bg='white'
									_dark={{
										bg: "gray.800",
									}}
									shadow='lg'
									boxShadow='md'
									rounded='md'
									key={i}
									borderWidth={1}
								>
									<Image
										w='full'
										h={"56"}
										fit='contain'
										src={b.image}
										alt='avatar'
									/>

									<Box py={5} textAlign='center'>
										<chakra.h1
											fontSize='md'
											fontWeight='semibold'
											color='gray.700'
											_dark={{
												color: "gray.200",
											}}
										>
											<Text noOfLines={1}>{b.title}</Text>
										</chakra.h1>
										<chakra.span
											fontSize='sm'
											color='gray.700'
											_dark={{
												color: "gray.200",
											}}
										>
											{b.authors}
										</chakra.span>
										<chakra.h2
											fontSize='md'
											fontWeight='semibold'
											color='gray.700'
											_dark={{
												color: "gray.200",
											}}
										>
											$ {b.price}
										</chakra.h2>
									</Box>
								</Box>
							</BuenLink>
						))}
				</SimpleGrid>
			</Stack>
			<Stack pt={2} minH={800} justifyContent='center'>
				<Box p={2}>
					<Flex justifyContent='space-between'>
						<chakra.h1
							fontSize={{
								base: "10px",
								md: "15px",
								lg: "20px",
							}}
							fontWeight='semibold'
							color='brand.600'
							lineHeight='shorter'
						>
							Top Books
						</chakra.h1>
						<BuenLink to='/books'>
							<chakra.h1
								fontSize={{
									base: "10px",
									md: "15px",
									lg: "20px",
								}}
								fontWeight='semibold'
								color='brand.600'
								lineHeight='shorter'
								cursor='pointer'
							>
								Show all -
							</chakra.h1>
						</BuenLink>
					</Flex>
				</Box>
				<Box>
					{loading ? (
						<h1>Hola</h1>
					) : (
						((booksToSort = booksToSort
							.sort(function (a, b) {
								if (a.rating < b.rating) {
									return 1;
								}
								if (a.rating > b.rating) {
									return -1;
								}
								return 0;
							})
							.slice(0, 6)
							.map((e) => (
								<BuenLink to={`/book/${e.id}`}>
									<Box className='item'>
										<Image
											h='31rem'
											objectFit='cover'
											src={e.image}
										/>
									</Box>
								</BuenLink>
							))),
						(
							<AliceCarousel
								mouseTracking
								items={booksToSort}
								autoPlay
								autoPlayInterval={1000}
								responsive={responsive}
								disableDotsControls
								disableButtonsControls
								controlsStrategy='alternate'
								infinite
							/>
						))
					)}
				</Box>
			</Stack>
		</Container>
	);
}

export default Carousel;
