import { Search2Icon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	Stack,
	Text,
	useColorModeValue,
	chakra,
	Spacer,
	Input,
	Image,
	InputGroup,
	InputRightElement,
	Button,
} from '@chakra-ui/react';
import React from 'react';

function SearchBar() {
	return (
		<Box pb={8} bg="blackAlpha.200">
			<Stack pos="relative" bg="whiteAlpha.800" height="120px" w="100%"></Stack>
			<Box maxW="7xl" p={4} isolation="isolate" mt="-6rem" marginInline="auto">
				<Box
					boxShadow={useColorModeValue(
						'0 4px 6px rgba(160, 174, 192, 0.6)',
						'0 4px 6px rgba(9, 17, 28, 0.9)'
					)}
					bg={useColorModeValue('white', 'gray.800')}
					p={{ base: 4, sm: 8 }}
					overflow="hidden"
					rounded="2xl"
				>
					<Stack
						pos="relative"
						zIndex={1}
						direction="column"
						spacing={5}
						textAlign="center"
					>
						<chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold">
							Explore All Books
						</chakra.h1>

						<Stack
							direction={{ base: 'column', md: 'row' }}
							spacing={3}
							justify="center"
						>
							<chakra.form w="full" mb={6}>
								<Box
									display={{
										base: 'block',
										lg: 'none',
									}}
								>
									<Input
										size="lg"
										color="brand.900"
										type="text"
										placeholder="Find your book, author here..."
										bg="white"
									/>
								</Box>

								<InputGroup
									size="lg"
									w="full"
									display={{
										base: 'none',
										lg: 'flex',
									}}
								>
									<Input
										size="lg"
										color="brand.900"
										type="email"
										placeholder="Find your book, author, here..."
										bg="white"
									/>
									<InputRightElement w="auto" bg="blue.500" roundedRight={4}>
										<Button
											color="white"
											variant="solid"
											colorScheme="brand"
											size="lg"
											type="submit"
											roundedLeft={0}
											leftIcon={<Search2Icon />}
										>
											Search
										</Button>
									</InputRightElement>
								</InputGroup>
							</chakra.form>
						</Stack>
					</Stack>
				</Box>
			</Box>
		</Box>
	);
}

export default SearchBar;
