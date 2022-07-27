import React from 'react';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Image,
	Checkbox,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link as BuenLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userSignUp } from '../../../redux/actions/index';

function SignUp() {
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	const dispatch = useDispatch();
	const history = useHistory();

	const [registerUser, setRegisterUser] = useState({
		username: '',
		email: '',
		password: '',
	});

	const handleOnChange = (e) => {
		setRegisterUser({
			...registerUser,
			[e.target.name]: e.target.value,
		});
	};

	const handleRegister = (event) => {
		dispatch(userSignUp(registerUser));
		history.push(`/login`);
	};

	return (
		<Stack
			minH={'100vh'}
			direction={{ base: 'column', md: 'row' }}
			bg={'lightgrey'}>
			<Flex p={8} flex={1} align={'center'} justify={'center'}>
				<Stack spacing={4} w={'full'} maxW={'md'}>
					<Heading fontSize={'2xl'}>Sign up to your account</Heading>

					<FormControl id='username'>
						<FormLabel>Username</FormLabel>
						<Input
							placeholder='username'
							name='username'
							onChange={(e) => handleOnChange(e)}
							bg={'white'}
						/>
					</FormControl>

					<FormControl id='email'>
						<FormLabel>Email address</FormLabel>
						<Input
							placeholder='email'
							name='email'
							onChange={(e) => handleOnChange(e)}
							bg={'white'}
							type='email'
						/>
					</FormControl>

					<FormControl id='password'>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								placeholder='password'
								name='password'
								onChange={(e) => handleOnChange(e)}
								bg={'white'}
								type={show ? 'text' : 'password'}
							/>
							<InputRightElement h={'full'}>
								<Button
									variant={'ghost'}
									onClick={() => setShow((show) => !show)}>
									{show ? <ViewIcon /> : <ViewOffIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>

					<Stack spacing={6}>
						<Button
							colorScheme={'blue'}
							variant={'solid'}
							onClick={(event) => handleRegister(event)}>
							Sign up
						</Button>
					</Stack>

					<Stack pt={6}>
						<Text align={'center'}>
							Already a user?{' '}
							<BuenLink to='/login'>
								<Button
									as={'a'}
									color={'blue.400'}
									variant={'link'}>
									Login
								</Button>
							</BuenLink>
						</Text>
					</Stack>
				</Stack>
			</Flex>

			<Flex
				flex={1}
				padding={'15px'}
				paddingTop={{ sm: '10px', md: '20px', lg: '70px' }}>
				<Image
					alt={'Login Image'}
					objectFit={'cover'}
					src={
						'http://xurxodev.com/content/images/2016/09/Libros-recomendados.jpg'
					}
				/>
			</Flex>
		</Stack>
	);
}

export default SignUp;
