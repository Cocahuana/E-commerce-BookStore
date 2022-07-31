import React, { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
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
	tokenToCSSVar,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, checkStates } from '../../redux/actions/index';
import { useHistory } from 'react-router-dom';
import { Link as BuenLink } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../firebase/context.jsx';

function SignIn() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [show, setShow] = React.useState(false);
	const { token } = useSelector((state) => state);
	// const handleClick = () => setShow(!show);

	const [user, setLoginUser] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		// Checkea si el token esta o no vacio
		dispatch(checkStates());
		// Si llega el token (porque es correcto, sino llega vacio)
		// entonces setea email y password y te manda a /books mientras
		// te aparece un sweet alert sobre que el login fue un exito
		if (token) {
			setLoginUser({
				email: '',
				password: '',
			});
			history.push('/books');
		}
	}, [dispatch, token]);

	const handleOnChange = (e) => {
		setLoginUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSignIn = (e) => {
		e.preventDefault();

		if (user.email === '' || user.password === '') {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Login inputs can not be empty, sorry!',
			});
		} else {
			// Compueba si la autentication es correcta o no
			dispatch(userLogin(user));
		}
	};

	const { googleSignIn } = UserAuth();

	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Stack
			minH={'100vh'}
			direction={{ base: 'column', md: 'row' }}
			bg={useColorModeValue('gray.200', 'gray.500')}>
			<Flex p={8} flex={1} align={'center'} justify={'center'}>
				<Stack spacing={4} w={'full'} maxW={'md'} borderRadius={'10px'}>
					<Heading fontSize={'2xl'}>Sign in to your account</Heading>

					<FormControl id='username'>
						<FormLabel>Username</FormLabel>
						<Input
							bg={useColorModeValue('whiteAlpha.800', 'gray.400')}
							name='email'
							value={user.email}
							onChange={(e) => handleOnChange(e)}
						/>
					</FormControl>

					<FormControl id='password'>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								name='password'
								onChange={(e) => handleOnChange(e)}
								bg={useColorModeValue(
									'whiteAlpha.800',
									'gray.400'
								)}
								value={user.password}
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
						<Stack
							direction={{ base: 'column', sm: 'row' }}
							align={'start'}
							justify={'space-between'}>
							<Checkbox>Remember me</Checkbox>
							<Button
								as={'a'}
								variant={'link'}
								color={'blue.500'}>
								Forgot password?
							</Button>
						</Stack>

						<Button
							colorScheme={'blue'}
							variant={'solid'}
							onClick={(event) => handleSignIn(event)}>
							Sign in
						</Button>
						<GoogleButton
							colorScheme={'blue'}
							variant={'solid'}
							onClick={handleGoogleSignIn}>
							Sign in with Google
						</GoogleButton>
					</Stack>

					<Stack pt={6}>
						<Text align={'center'}>
							Don´t have an account?{' '}
							<BuenLink to='/register'>
								<Button
									as={'a'}
									color={'blue.400'}
									variant={'link'}>
									Register
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
						'https://estaticos.muyinteresante.es/uploads/images/test/5899d3b75cafe85ef18b4568/test-libros0.jpg'
					}
				/>
			</Flex>
		</Stack>
	);
}

export default SignIn;
