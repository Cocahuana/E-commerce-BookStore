import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	addToCart,
	getDetails,
	resetDetails,
	getAllUsers,
	userAddFavorite,
	userAddFavState,
	userGetPurchases,
} from "../../redux/actions";
import { Link as BuenLink, useHistory } from "react-router-dom";
import {
	Box,
	Container,
	Stack,
	Text,
	Image,
	Flex,
	Button,
	SimpleGrid,
	useColorModeValue,
	useToast,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { TiShoppingCart, TiHeartOutline } from "react-icons/ti";
import { Rating } from "../BookShelf/BookHolder/Book/Rating";
import { PriceTag } from "../BookShelf/BookHolder/Book/PriceTag";
import Swal from "sweetalert2";
import Reviews from "./Reviews";
import CommentPoster from "./CommentPoster";

function BookDetail(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const toast = useToast();
	const { id } = props.match.params;

	const { cart, summary, allUsers, userId, details, userRole, isSignedIn } =
		useSelector((state) => state);
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const [comments, setComments] = UseState([])

	const handleOnClick = (id) => {
		dispatch(addToCart(id, userId));
		let flag = true;
		cart.map((e) => {
			if (e.id === id) flag = false;
		});
		if (flag) {
			toast({
				title: "Added to the cart successfully",
				status: "success",
				isClosable: "true",
				duration: "2000",
				position: "top",
			});
		} else {
			toast({
				title: "This book is already on the cart",
				status: "info",
				isClosable: "true",
				duration: "2000",
				position: "top",
			});
		}
	};

	const handleOnFavourite = (id) => {
		if (userId && userRole === "User") {
			dispatch(userAddFavorite(userId, id));
			dispatch(userAddFavState(id));
		} else if (userRole === "Admin") {
			toast({
				title: "Admin can´t add favourites",
				status: "warning",
				isClosable: "true",
				duration: "2000",
				position: "top",
			});
		} else {
			history.push("/login");
			toast({
				title: "You need to be logged in to add to Favourites",
				status: "warning",
				isClosable: "true",
				duration: "2000",
				position: "top",
			});
		}
	};

	useEffect(() => {
		if (!allUsers.length) dispatch(getAllUsers());
		dispatch(getDetails(id));
		localStorage.setItem("cart", JSON.stringify(cart));
		localStorage.setItem("summary", JSON.stringify(summary));
		return () => {
			dispatch(resetDetails());
		};
	}, [dispatch, cart]);

	useEffect(() => {
		if (details.stock === 0) {
			onOpen();
		}
	});

	const handleOnClickRev = () => {
		toast({
			title: "You need to be logged in to post comments",
			status: "warning",
			isClosable: "true",
			duration: "2000",
			position: "top",
		});
	};

	// let comments = details?.Comments?.map((c) => {
	// 	return {
	// 		text: c.text,
	// 		user: allUsers.filter((u) => c.UserId === u.id),
	// 	};
	// });

	let reviewData = details?.Comments?.map((r) => {
		let reviewer = allUsers.filter((u) => r.UserId === u.id);
		return {
			avatarSrc: reviewer[0]?.profile_picture,
			review: r.text,
			stars: r.rating || 0,
			userName: reviewer[0]?.username,
			dateTime: r.date,
		};
	});

	if (details.stock > 0) {
		return (
			<Container
				align={"center"}
				bg={useColorModeValue("gray.200", "gray.900")}
				color={useColorModeValue("gray.700", "whiteAlpha.600")}
				minW={"100%"}
				minH={"90vh"}
				paddingTop={"10vh"}
			>
				<Box
					maxW={"6xl"}
					textAlign='left'
					border='1px'
					borderColor={useColorModeValue("gray.200", "gray.900")}
				>
					<SimpleGrid
						columns={{ base: 1, lg: 2 }}
						rows={{ base: 3, lg: 3 }}
						bg={useColorModeValue("whiteAlpha.600", "gray.700")}
						//spacing={{ base: 8, md: 10 }}
					>
						<Flex>
							<Flex
								w={"100%"}
								//Si le sacas maxHeight && los pixeles, la card se ajusta al dropdown del description
								maxHeight={{
									base: "500px",
									sm: "400px",
									lg: "700px",
								}}
								align={"center"}
								justify={"center"}
							>
								<Image
									rounded={"md"}
									alt={"book image"}
									src={details?.image}
									fit={"container"}
									align={"center"}
									w={{ base: "75%", sm: "75%", lg: "90%" }}
									h={{ base: "90%", sm: "90%", lg: "90%" }}
								/>
							</Flex>
						</Flex>
						<Stack
							p={{ base: 10, sm: 10, md: 10, lg: 10 }}
							border='1px'
							borderColor={useColorModeValue(
								"gray.200",
								"gray.900"
							)}
							m='24px'
							rounded='10px'
						>
							<Box as={"header"}>
								<Text
									fontWeight={"bold"}
									fontSize={{
										base: "1xl",
										sm: "2xl",
										lg: "3xl",
									}}
								>
									{details?.title}
								</Text>
							</Box>
							<Stack>
								<Text
									w='100%'
									fontSize={{
										base: "24px",
										sm: "24px",
										lg: "36px",
									}}
								>
									<PriceTag
										w='100%'
										price={details.price}
										salePrice={details.salePrice}
										currency={details.currency}
									/>
								</Text>
							</Stack>

							<Stack spacing={{ base: 4, sm: 6 }}>
								<Text fontSize={"20px"}>
									{details?.authors}
								</Text>

								<Text fontSize={"20px"}>
									<Text paddingTop={"9px"}>
										<Rating
											size='20px'
											defaultValue={details?.rating}
										/>
									</Text>
								</Text>
								<Flex
									fontSize={{ base: "10px", lg: "20px" }}
									minH='100px'
									align={"center"}
								>
									{details?.Genres?.map((e) => (
										<Flex
											bg={useColorModeValue(
												"gray.200",
												"gray.700"
											)}
											h='50px'
											w='47%'
											m='auto'
											align='center'
											justify='center'
											border='1px'
											borderColor={useColorModeValue(
												"gray.200",
												"gray.900"
											)}
											borderRadius='20px'
										>
											{e.name}
										</Flex>
									))}
								</Flex>
								<Text fontSize={"20px"}>
									<Text>
										{"Language: "}
										{details?.Languages?.map(
											(e) =>
												e.name.charAt(0) +
												e.name.slice(1).toLowerCase()
										) + ""}
									</Text>
								</Text>
							</Stack>
							<Stack
								py={"30px"}
								justify={"center"}
								align={"center"}
							>
								<Text fontSize={"20px"}>
									<Text>Stock Available:</Text>
								</Text>
								<Text>
									<Text>{details.stock} units</Text>
								</Text>
							</Stack>
							<Stack>
								<Box>
									<Button
										onClick={() =>
											handleOnClick(details.id)
										}
										w={"100%"}
										size={"lg"}
										bg={useColorModeValue(
											"blue.500",
											"blue.200"
										)}
										color={useColorModeValue(
											"white",
											"gray.900"
										)}
										leftIcon={<TiShoppingCart />}
										textTransform={"uppercase"}
										transition={"1s"}
										_hover={{
											bg: useColorModeValue(
												"blue.200",
												"blue.500"
											),
											color: useColorModeValue(
												"gray.900",
												"white"
											),
										}}
									>
										Add to cart
									</Button>
								</Box>
								<Box>
									<Button
										onClick={() =>
											handleOnFavourite(details.id)
										}
										w={"100%"}
										size={"lg"}
										bg={useColorModeValue(
											"blue.500",
											"blue.200"
										)}
										color={useColorModeValue(
											"white",
											"gray.900"
										)}
										leftIcon={<TiHeartOutline />}
										textTransform={"uppercase"}
										transition={"1s"}
										_hover={{
											bg: useColorModeValue(
												"blue.200",
												"blue.500"
											),
											color: useColorModeValue(
												"gray.900",
												"white"
											),
										}}
									>
										Add to favourites
									</Button>
								</Box>
								<Box
									direction='row'
									alignItems='center'
									justifyContent={"center"}
								>
									<BuenLink to={"/books"} w={"100%"}>
										<Button
											align={"center"}
											justify={"center"}
											size={"lg"}
											w={"100%"}
											transition={"1s"}
											color={useColorModeValue(
												"#3483fa",
												"gray.900"
											)}
											bg={useColorModeValue(
												"rgba(65, 137, 230, 0.35)",
												"blue.200"
											)}
											textTransform={"uppercase"}
											_hover={{
												bg: useColorModeValue(
													"rgba(65, 137, 230, 0.50)",
													"rgba(65, 137, 230, 0.35)"
												),
												color: useColorModeValue(
													"#3483fa",
													"white"
												),
											}}
										>
											Home
										</Button>
									</BuenLink>
								</Box>
							</Stack>
						</Stack>
					</SimpleGrid>
					<Stack
						p={"20px"}
						bg={useColorModeValue("whiteAlpha.600", "gray.700")}
						direction='column'
						alignItems='center'
						justifyContent={"center"}
					>
						<Box
							p={"5px"}
							rounded={"5px"}
							w={"100%"}
							bg={useColorModeValue("blue.500", "blue.200")}
							color={useColorModeValue("white", "gray.900")}
							flex='1'
							textAlign='center'
						>
							Description
						</Box>
						<Text
							textAlign='justify'
							p={"10px"}
							justifyContent={"center"}
							dangerouslySetInnerHTML={{
								__html: details?.description,
							}}
						/>
					</Stack>
				</Box>
				<Reviews reviewData={reviewData} />
				<CommentPoster id={id} />
			</Container>
		);
	} else {
		return (
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Something went wrong</ModalHeader>
					<ModalBody>
						<Text>We don´t have stock of this book</Text>
					</ModalBody>
					<ModalFooter>
						<BuenLink to={"/books"}>
							<Button onClick={onClose}>Close</Button>
						</BuenLink>
					</ModalFooter>
				</ModalContent>
			</Modal>
		);
	}
}

export default BookDetail;
