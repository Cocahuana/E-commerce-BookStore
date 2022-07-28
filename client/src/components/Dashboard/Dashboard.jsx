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
import { useSelector } from 'react-redux';

function Dashboard() {
	const { adminBooks } = useSelector((state) => state);

	return (
		<Flex direction='column' pt={{ base: '120px', md: '75px', sm: '20px' }}>
			<Container maxW={'container.xl'}>
				<BooksTable books={adminBooks} />
			</Container>
		</Flex>
	);
}

export default Dashboard;
