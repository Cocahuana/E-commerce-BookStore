import {
	Box,
	Button,
	Container,
	Flex,
	Icon,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useColorModeValue,
	Center,
	Spinner,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import BooksTable from './BooksTable';
import { useSelector, useDispatch } from 'react-redux';
import UserTable from './UserTable';
import { getAllUsers, getBooksByTitleOrAuthor } from '../../redux/actions';

function Dashboard() {
	const { adminBooks, loading, allUsers } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBooksByTitleOrAuthor(''));
		dispatch(getAllUsers());
	}, [dispatch]);
	console.log(allUsers);
	return (
		<Box>
			{loading ? (
				<Center>
					<Spinner
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='blue.500'
						size='xl'
					/>
				</Center>
			) : (
				<Flex direction='column' pt={{ base: '120px', md: '75px', sm: '20px' }}>
					<Container maxW={'container.xl'}>
						<Tabs variant='enclosed'>
							<TabList>
								<Tab>Books</Tab>
								<Tab>Users</Tab>
							</TabList>
							<TabPanels>
								<TabPanel p={0}>
									<BooksTable books={adminBooks} />
								</TabPanel>
								<TabPanel p={0}>
									<UserTable />
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Container>
				</Flex>
			)}
		</Box>
	);
}

export default Dashboard;
