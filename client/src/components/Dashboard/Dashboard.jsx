import {
	Box,
	Button,
	Container,
	Flex,
	Icon,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import BooksTable from './BooksTable';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

function Dashboard() {
	return (
		<Flex direction='column' pt={{ base: '120px', md: '75px', sm: '20px' }}>
			<Container maxW={'container.xl'}>
				<BooksTable />
			</Container>
		</Flex>
	);
}

export default Dashboard;
