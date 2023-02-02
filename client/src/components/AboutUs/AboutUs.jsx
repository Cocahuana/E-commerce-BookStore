import {
	IMG_eze,
	IMG_trini,
	IMG_mati,
	IMG_rodri,
	IMG_lucho,
	IMG_gaby,
	IMG_ale,
} from "./assets";
import {
	Text,
	chakra,
	Box,
	Avatar,
	Flex,
	SimpleGrid,
	Button,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const testimonials = [
	{
		name: "Mati",
		position: "developer",
		company: "BookStore",
		Github: "github.com/mati-farias",
		LinkedIn:
			"https://www.linkedin.com/in/mat%C3%ADas-alejandro-farias-623a0954/",
		image: IMG_mati,
		content: `This should have worked, I don't understand. This works, I don't understand`,
	},
	{
		name: "Ale",
		position: "developer",
		company: "BookStore",
		Github: "https://github.com/aledx18",
		LinkedIn: "https://www.linkedin.com/in/alejandro-díaz-35a326222",
		image: IMG_ale,
		content: `Invest on Chakra UI. Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.`,
	},
	{
		name: "Lucho",
		position: "developer",
		company: "BookStore",
		Github: "https://github.com/LucianoFedericoC",
		LinkedIn: "https://www.linkedin.com/in/lucianofedericocarducci",
		image: IMG_lucho,
		content: `Bugs? I don't know what kind of feature that is.`,
	},
	{
		name: "Trini",
		position: "suffering dev",
		company: "BookStore",
		Github: "https://github.com/Trinigv",
		LinkedIn:
			"https://www.linkedin.com/in/trinidad-garcia-valicente-a8049715b/",
		image: IMG_trini,
		content: `Debugging an app is like a box of chocolates. You never know what you're gonna get`,
	},
	{
		name: "Rodri",
		position: "GOD developer",
		company: "BookStore",
		Github: "https://github.com/rodri0112",
		LinkedIn: "https://www.linkedin.com/in/soriano-rodrigo",
		image: IMG_rodri,
		content: `Cooking hotfixes on production is my happy meal`,
	},
	{
		name: "Ezequiel Domínguez",
		position: "DJ developer",
		company: "BookStore",
		Github: "https://github.com/Cocahuana",
		LinkedIn: "https://www.linkedin.com/in/ezequiel-dominguez-dev/",
		image: IMG_eze,
		content: `What can you expect from a project without your colleagues listening to good music?`,
	},
	{
		name: "Gabriel",
		position: ".json developer",
		company: "BookStore",
		Github: "https://github.com/aledx18",
		LinkedIn: "https://www.linkedin.com/in/alejandro-díaz-35a326222",
		image: IMG_gaby,
		content: `I'm the dude who data is afraid of, Gabriel is the first name it comes to your mind when it comes to saving data, my JSONs are the best of all corners of my desk.`,
	},
	{
		name: "Ivan Chueco",
		position: "Back Developer",
		company: "BookStore",
		Github: "https://github.com/Ivan-Chueco-Tendler",
		LinkedIn: "https://www.linkedin.com/in/ivan-chueco-935804247/",
		image: "https://ca.slack-edge.com/TPRS7H4PN-U031M29E25C-01724309db4f-512",
		content: `"Run as fast as you can but you won't go far" said Ivan's middlewares to the hacker`,
	},
];

function AboutUs() {
	return (
		<Flex
			bg={useColorModeValue("#edf3f8", "gray.600")}
			w='full'
			justifyContent='center'
			alignItems='center'
		>
			<Flex
				shadow='xl'
				bg='white'
				_dark={{
					bg: "gray.800",
				}}
				px={8}
				py={20}
				mx='auto'
				flexDirection='column'
			>
				<Flex flexDirection='column' alignItems={"center"}>
					<chakra.h2
						mb={4}
						fontSize={{
							base: "2xl",
							md: "4xl",
						}}
						fontWeight='bold'
						letterSpacing='tight'
						textAlign={{
							base: "center",
							md: "left",
						}}
						color='brand.pepeoscuro'
						_dark={{
							color: "gray.400",
						}}
						lineHeight={{
							md: "shorter",
						}}
					>
						What's E-Bookstore?
					</chakra.h2>
					<chakra.p
						mb={5}
						textAlign={{
							base: "center",
							sm: "left",
							lg: "center",
						}}
						color='gray.600'
						_dark={{
							color: "gray.400",
						}}
						fontSize={{
							md: "lg",
						}}
					>
						It's an online bookstore where you can save, comment,
						rate and buy your favorite digital and physical books
					</chakra.p>
				</Flex>

				<Flex
					alignItems={"center"}
					pt={"16"}
					flexDirection={"column"}
					order={{
						base: "initial",
						md: 2,
					}}
				>
					<chakra.h2
						mb={4}
						fontSize={{
							base: "2xl",
							md: "4xl",
						}}
						fontWeight='extrabold'
						letterSpacing='tight'
						textAlign={{
							base: "center",
							md: "left",
							lg: "center",
						}}
						color='brand.pepeoscuro'
						_dark={{
							color: "gray.400",
						}}
						lineHeight={{
							md: "shorter",
						}}
					>
						Why E-Bookstore?
					</chakra.h2>
					<chakra.p
						mb={5}
						textAlign={{
							base: "center",
							lg: "center",
							sm: "left",
						}}
						color='gray.600'
						_dark={{
							color: "gray.400",
						}}
						fontSize={{
							md: "lg",
						}}
					>
						Who better to talk about books than the authors
						themselves? <br /> <br />
						"A book is a gift you can open again and again"
						-Garrison Keillor <br /> "Once you read a book you care
						about, some part of it is always with you" -Louis
						L'Amour <br />
						"If you don't like to read you haven't found the right
						book yet" -JK Rowling
					</chakra.p>
				</Flex>
				<Flex
					alignItems={"center"}
					pt={"16"}
					flexDirection={"column"}
					order={{
						base: "initial",
						md: 2,
					}}
				>
					<chakra.h1
						mb={4}
						fontSize={{
							base: "2xl",
							md: "4xl",
						}}
						fontWeight='bold'
						letterSpacing='tight'
						textAlign={{
							base: "center",
							md: "left",
							lg: "center",
						}}
						color='brand.pepe'
						_dark={{
							color: "gray.400",
						}}
					>
						Our Team
					</chakra.h1>
					<SimpleGrid
						columns={{ base: 1, md: 2 }}
						placeItems='center'
						spacing={10}
						mt={12}
						mb={4}
					>
						{testimonials.map((obj, index) => (
							<Stack
								border='1px'
								borderColor={useColorModeValue(
									"gray.200",
									"gray.900"
								)}
								key={index}
								direction={{ base: "column", sm: "row" }}
								spacing={2}
								mb={5}
								justify='center'
							>
								<Stack
									w='345px'
									h='175px'
									justifyContent={"center"}
									align={"center"}
									boxShadow='lg'
									rounded='md'
									p={6}
									pos='relative'
									bg={useColorModeValue("white", "gray.800")}
									position={"static"}
								>
									<chakra.p
										fontWeight='light'
										fontSize='medium'
									>
										{obj.content}
									</chakra.p>
								</Stack>
								<Stack
									minW={"175px"}
									direction='column'
									spacing={2}
									p={2}
									justify='flex-end'
									alignItems='center'
								>
									<Avatar
										size='lg'
										showBorder={true}
										position={"static"}
										borderColor='brand.pepeoscuro'
										name='avatar'
										src={obj.image}
									/>
									<Box textAlign='center'>
										<Text fontWeight='bold' fontSize='md'>
											{obj.name}
										</Text>
										<Text
											fontWeight='medium'
											fontSize='xs'
											color='gray.400'
										>
											{obj.position}, {obj.company}
										</Text>
										<Flex
											justifyContent={"space-around"}
											pt={"2"}
										>
											<Box color={"linkedin.600"}>
												<a
													href={obj.LinkedIn}
													target={"_blank"}
												>
													<FaLinkedin
														size={"21px"}
														color={""}
													/>
												</a>
											</Box>
											<Box color={"gray.600"}>
												<a
													href={obj.Github}
													target={"_blank"}
												>
													<FaGithub size={"21px"} />
												</a>
											</Box>
										</Flex>
									</Box>
								</Stack>
							</Stack>
						))}
					</SimpleGrid>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default AboutUs;
