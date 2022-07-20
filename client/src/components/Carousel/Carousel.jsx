import { MoonIcon, QuestionIcon, SunIcon } from '@chakra-ui/icons';
import {
	Box,
	chakra,
	Container,
	Flex,
	Image,
	SimpleGrid,
	Stack,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function Carousel() {
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
	];

	const responsive = {
		0: { items: 1 },
		568: { items: 2 },
		1024: { items: 4 },
	};

	const items = [
		<Box className="item" data-value="1">
			<Image
				objectFit="cover"
				src="https://books.google.com/books/content/images/frontcover/l1zUsIJCBf8C?fife=w240-h480"
			/>
		</Box>,
		<Box className="item" data-value="2">
			<Image
				objectFit="cover"
				src="https://books.google.com/books/content/images/frontcover/TcHzLfehDDUC?fife=w240-h480"
			/>
		</Box>,
		<Box className="item" data-value="3">
			<Image
				objectFit="cover"
				src="https://books.google.com/books/content/images/frontcover/zl13g5uRM4EC?fife=w240-h480"
			/>
		</Box>,
		<Box className="item" data-value="4">
			<Image
				objectFit="cover"
				src="https://books.google.com/books/content/images/frontcover/aVPNxmllbAUC?fife=w240-h480"
			/>
		</Box>,
		<Box className="item" data-value="5">
			<Image
				objectFit="cover"
				src="https://books.google.com/books/content/images/frontcover/wrOQLV6xB-wC?fife=w240-h480"
			/>
		</Box>,
	];

	return (
		<Container maxW="7xl" p={{ base: 5, md: 8 }}>
			<Stack pt={2} minH={300} justifyContent="center">
				<Box p={2}>
					<Flex justifyContent="space-between">
						<chakra.h1
							fontSize={{
								base: '10px',
								md: '15px',
								lg: '20px',
							}}
							fontWeight="semibold"
							color="brand.600"
							lineHeight="shorter"
						>
							Category
						</chakra.h1>
						<chakra.h1
							fontSize={{
								base: '10px',
								md: '15px',
								lg: '20px',
							}}
							fontWeight="semibold"
							color="brand.600"
							lineHeight="shorter"
							cursor="pointer"
						>
							Show all -
						</chakra.h1>
					</Flex>
				</Box>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={5} mt={2}>
					<Box p={5} boxShadow="md" rounded="md" borderWidth={1} align="center">
						<Text fontWeight="bold" fontSize="x-large">
							Romance
						</Text>
						<MoonIcon />
					</Box>
					<Box p={5} boxShadow="md" rounded="md" borderWidth={1} align="center">
						<Text fontWeight="bold" fontSize="x-large">
							Romance
						</Text>
						<SunIcon />
					</Box>
					<Box p={5} boxShadow="md" rounded="md" borderWidth={1} align="center">
						<Text fontWeight="extrabold" fontSize="x-large">
							Fantasy
						</Text>
						<QuestionIcon />
					</Box>
					<Box p={5} boxShadow="md" rounded="md" borderWidth={1} align="center">
						<Text fontWeight="extrabold" fontSize="x-large">
							Fantasy
						</Text>
						<SunIcon />
					</Box>
					<Box p={5} boxShadow="md" rounded="md" borderWidth={1} align="center">
						<Text fontWeight="extrabold" fontSize="x-large">
							Fantasy
						</Text>
						<MoonIcon />
					</Box>
				</SimpleGrid>
			</Stack>
			<Stack pt={1} minH={400} justifyContent="center">
				<Box p={2}>
					<Flex justifyContent="space-between">
						<chakra.h1
							fontSize={{
								base: '10px',
								md: '15px',
								lg: '20px',
							}}
							fontWeight="semibold"
							color="brand.600"
							lineHeight="shorter"
						>
							Nuevos lanzamientos
						</chakra.h1>
						<chakra.h1
							fontSize={{
								base: '10px',
								md: '15px',
								lg: '20px',
							}}
							fontWeight="semibold"
							color="brand.600"
							lineHeight="shorter"
							cursor="pointer"
						>
							Show all -
						</chakra.h1>
					</Flex>
				</Box>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={5}>
					<Box
						bg="white"
						_dark={{
							bg: 'gray.800',
						}}
						shadow="lg"
						boxShadow="md"
						rounded="md"
						borderWidth={1}
					>
						<Image
							w="full"
							h={'56'}
							fit="cover"
							src="https://books.google.com/books/publisher/content/images/frontcover/uDuGDwAAQBAJ?fife=w240-h480"
							alt="avatar"
						/>

						<Box py={5} textAlign="center">
							<chakra.h1
								fontSize="md"
								fontWeight="semibold"
								color="gray.700"
								_dark={{
									color: 'gray.200',
								}}
							>
								Starsight
							</chakra.h1>
							<chakra.span
								fontSize="sm"
								color="gray.700"
								_dark={{
									color: 'gray.200',
								}}
							>
								Brandon Sanderson
							</chakra.span>
							<chakra.h2
								fontSize="md"
								fontWeight="semibold"
								color="gray.700"
								_dark={{
									color: 'gray.200',
								}}
							>
								$ 1.301
							</chakra.h2>
						</Box>
					</Box>
					<Box
						bg="white"
						_dark={{
							bg: 'gray.800',
						}}
						shadow="lg"
						boxShadow="md"
						rounded="md"
						borderWidth={1}
						align="center"
					>
						<Image
							w="full"
							h={56}
							fit="cover"
							src="https://books.google.com/books/publisher/content/images/frontcover/tTMGAwAAQBAJ?fife=w240-h480"
							alt="avatar"
						/>

						<Box py={5} textAlign="center">
							<chakra.h1
								fontSize="md"
								fontWeight="semibold"
								color="gray.700"
								_dark={{
									color: 'gray.200',
								}}
							>
								Divergent Series Four-Book
							</chakra.h1>
							<chakra.span
								fontSize="sm"
								color="gray.700"
								_dark={{
									color: 'gray.200',
								}}
							>
								Veronica Roth
							</chakra.span>
							<chakra.h2
								fontSize="md"
								fontWeight="semibold"
								color="gray.700"
								_dark={{
									color: 'gray.200',
								}}
							>
								$ 1.301
							</chakra.h2>
						</Box>
					</Box>
					<Box
						bg="white"
						_dark={{
							bg: 'gray.800',
						}}
						shadow="lg"
						boxShadow="md"
						rounded="md"
						borderWidth={1}
						align="center"
					>
						<Image
							w="full"
							h={56}
							fit="cover"
							src="https://books.google.com/books/content/images/frontcover/Yz8Fnw0PlEQC?fife=w240-h480"
							alt="avatar"
						/>

						<Box py={5} textAlign="center">
							<chakra.h1
								fontSize="md"
								fontWeight="semibold"
								color="gray.700"
								_dark={{
									color: 'gray.200',
								}}
							>
								The Hunger Games
							</chakra.h1>
							<chakra.span
								fontSize="sm"
								color="gray.700"
								_dark={{
									color: 'gray.200',
								}}
							>
								Suzanne Collins
							</chakra.span>
							<chakra.h2
								fontSize="md"
								fontWeight="semibold"
								color="gray.700"
								_dark={{
									color: 'gray.200',
								}}
							>
								$ 1.404
							</chakra.h2>
						</Box>
					</Box>
					<Box
						bg="white"
						_dark={{
							bg: 'gray.800',
						}}
						shadow="lg"
						boxShadow="md"
						rounded="md"
						borderWidth={1}
						align="center"
					>
						<Image
							w="full"
							h={56}
							fit="cover"
							src="https://books.google.com/books/publisher/content/images/frontcover/0BwyDwAAQBAJ?fife=w240-h480"
							alt="avatar"
						/>

						<Box py={5} textAlign="center">
							<chakra.span
								fontSize="sm"
								color="gray.700"
								_dark={{
									color: 'gray.200',
								}}
							>
								Comprame porfa
							</chakra.span>
						</Box>
					</Box>
					<Box
						bg="white"
						_dark={{
							bg: 'gray.800',
						}}
						shadow="lg"
						boxShadow="md"
						rounded="md"
						borderWidth={1}
						align="center"
					>
						<Image
							w="full"
							h={56}
							fit="cover"
							src="https://books.google.com/books/publisher/content/images/frontcover/_fpRDwAAQBAJ?fife=w240-h480"
							alt="avatar"
						/>

						<Box py={5} textAlign="center">
							<chakra.span
								fontSize="sm"
								color="gray.700"
								_dark={{
									color: 'gray.200',
								}}
							>
								Puto el que lee
							</chakra.span>
						</Box>
					</Box>
				</SimpleGrid>
			</Stack>
			<Stack pt={2} minH={800} justifyContent="center">
				<Box p={2}>
					<Flex justifyContent="space-between">
						<chakra.h1
							fontSize={{
								base: '10px',
								md: '15px',
								lg: '20px',
							}}
							fontWeight="semibold"
							color="brand.600"
							lineHeight="shorter"
						>
							Top Books
						</chakra.h1>
						<chakra.h1
							fontSize={{
								base: '10px',
								md: '15px',
								lg: '20px',
							}}
							fontWeight="semibold"
							color="brand.600"
							lineHeight="shorter"
							cursor="pointer"
						>
							Show all -
						</chakra.h1>
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
						controlsStrategy="alternate"
						infinite
					/>
				</Box>
			</Stack>
		</Container>
	);
}

export default Carousel;
