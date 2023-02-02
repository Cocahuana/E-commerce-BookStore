import React from "react";
import {
	chakra,
	Box,
	Flex,
	SimpleGrid,
	Badge,
	Input,
	Button,
	InputGroup,
	InputRightElement,
	Image,
	Container,
	Stack,
	Divider,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Search2Icon } from "@chakra-ui/icons";
import Carousel from "../Carousel/Carousel";
import { Link as BuenLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getBooksByTitleOrAuthor,
	resetFilters,
} from "../../redux/actions/index.js";

function LandingPage() {
	const dispatch = useDispatch();

	const [search, setSearch] = useState("");

	const handleOnChange = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	const handleOnClick = (e) => {
		dispatch(getBooksByTitleOrAuthor(search));
	};

	const { books } = useSelector((state) => state);

	useEffect(() => {
		dispatch(getBooksByTitleOrAuthor(""));
		dispatch(resetFilters());
	}, [dispatch]);

	return (
		<Box>
			<SimpleGrid
				bg='brand.pepe'
				columns={{
					base: 1,
					md: 2,
				}}
				spacing={0}
				_after={{
					bg: "brand.500",
					opacity: 0.25,
					pos: "absolute",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					zIndex: -1,
					content: '" "',
				}}
				minH={800}
			>
				<Flex
					direction='column'
					alignItems='start'
					justifyContent='center'
					px={{
						base: 4,
						lg: 30,
					}}
					py={24}
					bg='brand.pepe'
				>
					<Badge
						color='white'
						px={3}
						py={1}
						mb={3}
						variant='solid'
						colorScheme='brand'
						rounded='full'
					>
						Beta
					</Badge>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<chakra.h1
							mb={6}
							fontSize={{
								base: "4xl",
								md: "6xl",
								lg: "7xl",
							}}
							fontWeight='bold'
							_dark={{
								color: "gray.800",
							}}
						>
							Online library.
						</chakra.h1>
						Find
					</motion.div>
					<chakra.form w='full' mb={6}>
						<Box
							display={{
								base: "block",
								lg: "none",
							}}
						>
							<Input
								size='lg'
								color='brand.900'
								type='text'
								placeholder='Find your book here...'
								bg='white'
								value={search}
								onChange={(e) => handleOnChange(e)}
							/>
						</Box>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 2 }}
						>
							<InputGroup
								size='lg'
								w='full'
								display={{
									base: "none",
									lg: "flex",
								}}
							>
								<Input
									size='lg'
									type='email'
									color='black'
									placeholder='Find your book here...'
									bg={"white"}
									_placeholder={{ color: "gray.700" }}
									value={search}
									onChange={(e) => handleOnChange(e)}
								/>
								<InputRightElement
									w='auto'
									bg='blue.500'
									roundedRight={4}
								>
									<BuenLink to={`/books`}>
										<Button
											color='white'
											variant='solid'
											colorScheme='brand'
											size='lg'
											type='submit'
											roundedLeft={0}
											onClick={(e) => handleOnClick(e)}
											leftIcon={<Search2Icon />}
										>
											Search Book
										</Button>
									</BuenLink>
								</InputRightElement>
							</InputGroup>
						</motion.div>
					</chakra.form>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
					>
						<chakra.p
							pr={{
								base: 0,
								lg: 16,
							}}
							mb={4}
							fontSize='md'
							_dark={{
								color: "gray.800",
							}}
						>
							Or if you want to see all books:
							<BuenLink to={"/books"}>
								<Button size='xs' margin={2} colorScheme='gray'>
									Click Here
								</Button>
							</BuenLink>
						</chakra.p>
					</motion.div>
				</Flex>
				<Flex align='center'>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
					>
						<Image
							src='https://cdn.dribbble.com/users/1226039/screenshots/6531907/reader_getup-02.png'
							alt='bookk'
							fit='cover'
							w='full'
							loading='lazy'
						/>
					</motion.div>
				</Flex>
			</SimpleGrid>
			<Stack bg='blackAlpha.100' justifyContent='center'>
				<Carousel books={books} />
			</Stack>
		</Box>
	);
}

export default LandingPage;
