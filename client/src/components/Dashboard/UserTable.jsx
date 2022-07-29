import React from 'react';
import {
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	chakra,
	Badge,
	Button,
	Flex,
	Td,
	Icon,
	Box,
	Image,
	Stack,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Search2Icon, SmallAddIcon } from '@chakra-ui/icons';

function UserTable() {
	const textColor = useColorModeValue('gray.700', 'white');

	return (
		<Box rounded={'md'} boxShadow={'xl'}>
			<Flex p={'10'} justify={'space-between'} align='center'>
				<Box>
					<chakra.h1 fontWeight={'bold'} fontSize={'3xl'}>
						List All Users
					</chakra.h1>
				</Box>
				<Flex>
					<InputGroup>
						<Input />
						<InputRightElement>
							<Search2Icon />
						</InputRightElement>
					</InputGroup>
				</Flex>
			</Flex>

			<Table variant='simple' color={textColor}>
				<Thead>
					<Tr my='.8rem' pl='0px' color='gray.400'>
						<Th color='gray.400'>User</Th>
						<Th color='gray.400'>Price</Th>
						<Th color='gray.400'>Books</Th>
						<Th color='gray.400'>Rating</Th>
						<Th color='gray.400'>Edit</Th>
						<Th color='gray.400'>Delete</Th>
					</Tr>
				</Thead>

				<Tbody>
					<Tr>
						<Td minWidth={{ sm: '250px' }} pl='0px'>
							<Flex
								align='center'
								py='.8rem'
								minWidth='100%'
								flexWrap='nowrap'
								pl={'4'}
							>
								<Image w='40px' borderRadius='10px' me='18px' />
								<Flex direction='column'>
									<Text
										fontSize='md'
										color={textColor}
										fontWeight='bold'
										minWidth='10px'
									>
										adsda
									</Text>
									<Text fontSize='sm' color='gray.400' fontWeight='normal'>
										authors
									</Text>
								</Flex>
							</Flex>
						</Td>

						<Td>
							<Flex direction='column'>
								<Text fontSize='md' color={textColor} fontWeight='bold'>
									xdd
								</Text>
								<Text fontSize='sm' color='gray.400' fontWeight='normal'>
									...
								</Text>
							</Flex>
						</Td>
						<Td></Td>
						<Td>
							<Text
								fontSize='md'
								color={textColor}
								fontWeight='bold'
								pb='.5rem'
							>
								rating
							</Text>
						</Td>
						<Td>
							<Button p='0px' bg='transparent' variant='no-hover'>
								<Icon color='blue.300' as={FaPencilAlt} me='4px' />
								<Text
									fontSize='md'
									color='gray.400'
									fontWeight='bold'
									cursor='pointer'
								>
									Edit
								</Text>
							</Button>
						</Td>
						<Td>
							<Button p='0px' bg='transparent' variant='no-hover'>
								<Text
									fontSize='md'
									color='gray.400'
									fontWeight='bold'
									cursor='pointer'
								>
									<Icon color='red.500' as={FaTrashAlt} me='4px' />
									Delete
								</Text>
							</Button>
						</Td>
					</Tr>
				</Tbody>
			</Table>
		</Box>
	);
}

export default UserTable;
