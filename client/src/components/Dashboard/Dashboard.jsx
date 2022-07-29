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
} from '@chakra-ui/react';
import React from 'react';
import BooksTable from './BooksTable';
import { useSelector } from 'react-redux';
import UserTable from './UserTable';

function Dashboard() {
	const { adminBooks } = useSelector((state) => state);

	return (
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
	);
}

export default Dashboard;
