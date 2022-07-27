import React from 'react';
import {
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	Avatar,
	Badge,
	Button,
	Flex,
	Td,
	Icon,
} from '@chakra-ui/react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getBooks } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

function BooksTable() {
	const textColor = useColorModeValue('gray.700', 'white');
	const books = useSelector((state) => state.books);
	console.log(books);

	return (
		<Table variant='simple' color={textColor}>
			<Thead>
				<Tr my='.8rem' pl='0px' color='gray.400'>
					<Th color='gray.400'>Books</Th>
				</Tr>
			</Thead>
			<Tbody>
				<Tr>
					<Td minWidth={{ sm: '250px' }} pl='0px'>
						<Flex align='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
							<Avatar w='50px' borderRadius='12px' me='18px' />
							<Flex direction='column'>
								<Text
									fontSize='md'
									color={textColor}
									fontWeight='bold'
									minWidth='100%'
								>
									Name Book
								</Text>
								<Text fontSize='sm' color='gray.400' fontWeight='normal'>
									...
								</Text>
							</Flex>
						</Flex>
					</Td>

					<Td>
						<Flex direction='column'>
							<Text fontSize='md' color={textColor} fontWeight='bold'>
								Price
							</Text>
							<Text fontSize='sm' color='gray.400' fontWeight='normal'>
								$$....
							</Text>
						</Flex>
					</Td>
					<Td>
						<Badge fontSize='16px' p='3px 10px' borderRadius='8px'>
							status
						</Badge>
					</Td>
					<Td>
						<Text fontSize='md' color={textColor} fontWeight='bold' pb='.5rem'>
							date
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
	);
}

export default BooksTable;
