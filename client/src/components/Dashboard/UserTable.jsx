import React, { useState } from 'react';
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
	useToast,
} from '@chakra-ui/react';
import {
	FaPencilAlt,
	FaTrashAlt,
	FaUserAltSlash,
	FaUserAlt,
} from 'react-icons/fa';
import { MdUpgrade } from 'react-icons/md';
import { Search2Icon, SmallAddIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllUsers,
	upgradeToAdmin,
	filteredAdminUsers,
	toUnBanUser,
} from '../../redux/actions';
import { toBanUser } from '../../redux/actions/index';

function UserTable({ user }) {
	const textColor = useColorModeValue('gray.700', 'white');
	const toast = useToast();
	const dispatch = useDispatch();

	const [userSearch, setUserSearch] = useState('');

	const { token } = useSelector((state) => state);

	// const { idUser } = useSelector((state) => state);

	// useEffect(() => {}, [dispatch]);

	var ordered = user?.sort(function (a, b) {
		if (a.username > b.username) {
			return 1;
		}
		if (a.username < b.username) {
			return -1;
		}
		return 0;
	});
	console.log(ordered);

	const handleUpgrade = async (id, token, status) => {
		console.log(status);
		if (status === 'Admin') {
			toast({
				title: 'The user is already an Admin!',
				status: 'warning',
				isClosable: 'true',
				duration: '1500',
			});
		} else {
			dispatch(upgradeToAdmin(id, token));
			dispatch(getAllUsers());
		}
	};
	const handleBan = (id, token, status) => {
		if (status === 'Banned') {
			// toast({
			// 	title: 'User is already banned!',
			// 	status: 'warning',
			// 	isClosable: 'true',
			// 	duration: '1500',
			// });
			dispatch(toUnBanUser(id, token));
		} else {
			dispatch(toBanUser(id, token));
			// dispatch(getAllUsers());
		}
		setTimeout(() => {
			dispatch(getAllUsers());
		}, 300);
	};

	const handleOnChange = (e) => {
		e.preventDefault();
		setUserSearch(e.target.value);
	};

	const handleOnClick = () => {
		dispatch(filteredAdminUsers(userSearch));
	};

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
						<Input onChange={(e) => handleOnChange(e)} />
						<InputRightElement>
							<Button onClick={() => handleOnClick()}>
								<Search2Icon />
							</Button>
						</InputRightElement>
					</InputGroup>
				</Flex>
			</Flex>

			<Table variant='simple' color={textColor}>
				<Thead>
					<Tr my='.8rem' pl='0px' color='gray.400'>
						<Th color='gray.400'>User</Th>
						<Th color='gray.400'>Email</Th>
						<Th color='gray.400'>Status</Th>
						<Th color='gray.400'>Upgrade to Admin</Th>
					</Tr>
				</Thead>
				<Tbody>
					{ordered?.map((u, i) => (
						<Tr key={i}>
							<Td minWidth={{ sm: '250px' }} pl='0px'>
								<Flex
									align='center'
									py='.8rem'
									minWidth='100%'
									flexWrap='nowrap'
									pl={'4'}>
									<Image
										w='40px'
										borderRadius='10px'
										me='18px'
										src={u.profile_picture}
									/>
									<Flex direction='column'>
										<Text
											fontSize='md'
											color={textColor}
											fontWeight='bold'
											minWidth='10px'>
											{u.username}
										</Text>
										<Text
											fontSize='sm'
											color='gray.400'
											fontWeight='normal'></Text>
									</Flex>
								</Flex>
							</Td>

							<Td>
								<Flex direction='column'>
									<Text
										fontSize='md'
										color={textColor}
										fontWeight='bold'>
										{u.email}
									</Text>
									<Text
										fontSize='sm'
										color='gray.400'
										fontWeight='normal'></Text>
								</Flex>
							</Td>

							<Td>
								<Text
									fontSize='md'
									color={
										u.status !== 'Banned'
											? textColor
											: 'red.500'
									}
									fontWeight='bold'
									pb='.5rem'>
									{u.status}
								</Text>
							</Td>
							<Td>
								<Button
									p='0px'
									bg='transparent'
									variant='no-hover'
									onClick={() =>
										handleUpgrade(u.id, token, u.status)
									}>
									<Icon
										color='blue.300'
										as={MdUpgrade}
										me='4px'
									/>
									<Text
										fontSize='md'
										color='gray.400'
										fontWeight='bold'
										cursor='pointer'>
										Upgrade
									</Text>
								</Button>
							</Td>
							<Td>
								<Button
									p='0px'
									bg='transparent'
									variant='no-hover'
									onClick={() =>
										handleBan(u.id, token, u.status)
									}>
									<Text
										fontSize='md'
										color='gray.400'
										fontWeight='bold'
										cursor='pointer'>
										<Icon
											color={
												u.status !== 'Banned'
													? 'red.500'
													: 'blue.500'
											}
											as={
												u.status !== 'Banned'
													? FaUserAltSlash
													: FaUserAlt
											}
											me='4px'
										/>
										{u.status !== 'Banned'
											? 'Ban User'
											: 'Unban User'}
									</Text>
								</Button>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
			<br />
			<br />
			<br />
		</Box>
	);
}

export default UserTable;
