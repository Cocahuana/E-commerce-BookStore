import React, { useEffect } from 'react';
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
	useColorMode,
	useColorModeValue,
	Image,
	Checkbox,
	FormHelperText,
	FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as BuenLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendWelcomeEmail, userSignUp } from '../../redux/actions/index';
import validate from '../validations.js';
import Swal from 'sweetalert2';
import { useToast } from '@chakra-ui/react';

function SignUp() {
	const [show, setShow] = React.useState(false);
	//const handleClick = () => setShow(!show);
	const dispatch = useDispatch();
	const history = useHistory();
	const toast = useToast();

	const [registerUser, setRegisterUser] = useState({
		username: '',
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({});

	const { registeredUsers } = useSelector((state) => state);
	if (
		registeredUsers?.email === registerUser?.email &&
		registerUser.username !== '' &&
		registerUser.password !== '' &&
		Object.values(errors).length === 0
	) {
		Swal.fire(
			'Sign Up',
			'You have been registered successfully!',
			'success'
		);
		setRegisterUser({
			username: '',
			email: '',
			password: '',
		});
		history.push(`/login`);
	}

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setRegisterUser({
			...registerUser,
			[name]: value,
		});
		setErrors(
			validate({
				...registerUser,
				[name]: value,
			})
		);
	};

	const handleRegister = (e) => {
		e.preventDefault();

		if (Object.values(errors).length > 0) {
			toast({
				title: 'Please complete the information required',
				status: 'warning',
				isClosable: 'true',
				duration: '2000',
				position: 'bottom',
			});
		} else if (
			registerUser.username === '' ||
			registerUser.email === '' ||
			registerUser.password === ''
		) {
			toast({
				title: 'Please complete the form',
				status: 'warning',
				isClosable: 'true',
				duration: '2000',
				position: 'bottom',
			});
		} else {
			dispatch(userSignUp(registerUser));
		}
	};

	return (
		<Stack
			minH={'100vh'}
			direction={{ base: 'column', md: 'row' }}
			bg={useColorModeValue('gray.200', 'gray.500')}>
			<Flex p={8} flex={1} align={'center'} justify={'center'}>
				<Stack spacing={4} w={'full'} maxW={'md'}>
					<Heading fontSize={'2xl'}>Sign up to your account</Heading>

					<FormControl id='username' isInvalid={errors.username}>
						<FormLabel>Username</FormLabel>
						<Input
							name='username'
							onChange={(e) => handleOnChange(e)}
							bg={useColorModeValue('whiteAlpha.800', 'gray.400')}
						/>

						{errors.username && errors.username ? (
							<FormErrorMessage>
								{errors.username}
							</FormErrorMessage>
						) : (
							<FormHelperText>Example: Messi</FormHelperText>
						)}
					</FormControl>

					<FormControl id='email' isInvalid={errors.email}>
						<FormLabel>Email address</FormLabel>
						<Input
							name='email'
							onChange={(e) => handleOnChange(e)}
							bg={useColorModeValue('whiteAlpha.800', 'gray.400')}
							type='email'
						/>
						{errors.email && errors.email ? (
							<FormErrorMessage>{errors.email}</FormErrorMessage>
						) : (
							<FormHelperText>
								Example: Messi@email.com
							</FormHelperText>
						)}
					</FormControl>

					<FormControl id='password' isInvalid={errors.password}>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								name='password'
								onChange={(e) => handleOnChange(e)}
								bg={useColorModeValue(
									'whiteAlpha.800',
									'gray.400'
								)}
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
						{errors.password && errors.password ? (
							<FormErrorMessage>
								{errors.password}
							</FormErrorMessage>
						) : (
							<FormHelperText>Example: MessiG04t</FormHelperText>
						)}
					</FormControl>

					<Stack spacing={6}>
						<Button
							colorScheme={'blue'}
							variant={'solid'}
							onClick={(e) => handleRegister(e)}>
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
