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
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, saveFilterGenre } from '../../redux/actions/index';
import { Link as BuenLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Carousel({ books }) {
	const dispatch = useDispatch();
	const { genres } = useSelector((state) => state);
	const history = useHistory();

	const handleSelect = (e) => {
		dispatch(saveFilterGenre([e.target.value]));
		history.push('/books');
	};

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);
	const slides = [
		{
			img: 'https://books.google.com/books/content/images/frontcover/aVPNxmllbAUC?fife=w240-h480',
		},
		{
			img: 'https://books.google.com/books/content/images/frontcover/zl13g5uRM4EC?fife=w240-h480',
		},
		{
			img: 'https://books.google.com/books/content/images/frontcover/aVPNxmllbAUC?fife=w240-h480',
		},
		{
			img: 'https://books.google.com/books/content/images/frontcover/l1zUsIJCBf8C?fife=w240-h480',
		},
		{
			img: 'https://books.google.com/books/content/images/frontcover/wrOQLV6xB-wC?fife=w240-h480',
		},
		{
			img: 'https://books.google.com/books/publisher/content/images/frontcover/GTwBCwAAQBAJ?fife=w240-h480',
		},
	];

	const responsive = {
		0: { items: 1 },
		568: { items: 2 },
		1024: { items: 4 },
	};

	const items = [
		<Box className='item' data-value='1'>
			<Image
				objectFit='cover'
				src='https://books.google.com/books/content/images/frontcover/l1zUsIJCBf8C?fife=w240-h480'
			/>
		</Box>,
		<Box className='item' data-value='2'>
			<Image
				objectFit='cover'
				src='https://books.google.com/books/content/images/frontcover/TcHzLfehDDUC?fife=w240-h480'
			/>
		</Box>,
		<Box className='item' data-value='3'>
			<Image
				objectFit='cover'
				src='https://books.google.com/books/content/images/frontcover/zl13g5uRM4EC?fife=w240-h480'
			/>
		</Box>,
		<Box className='item' data-value='4'>
			<Image
				objectFit='cover'
				src='https://books.google.com/books/content/images/frontcover/aVPNxmllbAUC?fife=w240-h480'
			/>
		</Box>,
		<Box className='item' data-value='5'>
			<Image
				objectFit='cover'
				src='https://books.google.com/books/content/images/frontcover/wrOQLV6xB-wC?fife=w240-h480'
			/>
		</Box>,
		<Box className='item' data-value='6'>
			<Image
				objectFit='cover'
				src='https://books.google.com/books/publisher/content/images/frontcover/GTwBCwAAQBAJ?fife=w240-h480'
			/>
		</Box>,
	];

	return (
		<Container maxW='7xl' p={{ base: 5, md: 8 }}>
			<Stack pt={2} minH={300} justifyContent='center'>
				<Box p={2}>
					<Flex justifyContent='space-between'>
						<chakra.h1
							fontSize={{
								base: '10px',
								md: '15px',
								lg: '20px',
							}}
							fontWeight='semibold'
							color='brand.600'
							lineHeight='shorter'>
							Category
						</chakra.h1>
						<BuenLink to='/books'>
							<chakra.h1
								fontSize={{
									base: '10px',
									md: '15px',
									lg: '20px',
								}}
								fontWeight='semibold'
								color='brand.600'
								lineHeight='shorter'
								cursor='pointer'>
								Show all -
							</chakra.h1>
						</BuenLink>
					</Flex>
				</Box>
				<SimpleGrid
					columns={{ base: 1, sm: 2, md: 5, lg: 6 }}
					spacing={5}
					mt={2}>
					{genres.slice(0, 6).map((p, i) => (
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
							fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
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
								base: '10px',
								md: '15px',
								lg: '20px',
							}}
							fontWeight='semibold'
							color='brand.600'
							lineHeight='shorter'>
							Nuevos lanzamientos
						</chakra.h1>
						<BuenLink to='/books'>
							<chakra.h1
								fontSize={{
									base: '10px',
									md: '15px',
									lg: '20px',
								}}
								fontWeight='semibold'
								color='brand.600'
								lineHeight='shorter'
								cursor='pointer'>
								Show all -
							</chakra.h1>
						</BuenLink>
					</Flex>
				</Box>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={5}>
					{books?.slice(0, 5)?.map((b, i) => (
						<Box
							bg='white'
							_dark={{
								bg: 'gray.800',
							}}
							shadow='lg'
							boxShadow='md'
							rounded='md'
							key={i}
							borderWidth={1}>
							<Image
								w='full'
								h={'56'}
								fit='cover'
								src={b.image}
								alt='avatar'
							/>

							<Box py={5} textAlign='center'>
								<chakra.h1
									fontSize='md'
									fontWeight='semibold'
									color='gray.700'
									_dark={{
										color: 'gray.200',
									}}>
									{b.title}
								</chakra.h1>
								<chakra.span
									fontSize='sm'
									color='gray.700'
									_dark={{
										color: 'gray.200',
									}}>
									{b.authors}
								</chakra.span>
								<chakra.h2
									fontSize='md'
									fontWeight='semibold'
									color='gray.700'
									_dark={{
										color: 'gray.200',
									}}>
									$ {b.price}
								</chakra.h2>
							</Box>
						</Box>
					))}
				</SimpleGrid>
			</Stack>
			<Stack pt={2} minH={800} justifyContent='center'>
				<Box p={2}>
					<Flex justifyContent='space-between'>
						<chakra.h1
							fontSize={{
								base: '10px',
								md: '15px',
								lg: '20px',
							}}
							fontWeight='semibold'
							color='brand.600'
							lineHeight='shorter'>
							Top Books
						</chakra.h1>
						<BuenLink to='/books'>
							<chakra.h1
								fontSize={{
									base: '10px',
									md: '15px',
									lg: '20px',
								}}
								fontWeight='semibold'
								color='brand.600'
								lineHeight='shorter'
								cursor='pointer'>
								Show all -
							</chakra.h1>
						</BuenLink>
					</Flex>
				</Box>
				<Box>
					<AliceCarousel
						mouseTracking
						items={items}
						autoPlay
						autoPlayInterval={1000}
						responsive={responsive}
						disableDotsControls
						disableButtonsControls
						controlsStrategy='alternate'
						infinite
					/>
				</Box>
			</Stack>
		</Container>
	);
}

export default Carousel;
