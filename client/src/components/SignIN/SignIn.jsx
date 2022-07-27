import React from 'react';
import { useState } from 'react';
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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../redux/actions/index';
import { useHistory } from 'react-router-dom';

function SignIn() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	const [user, setnewUser] = useState({
		email: '',
		password: '',
	});

	const handleOnChange = (e) => {
		setnewUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSignUp = (event) => {
		dispatch(userLogin(user));
		//history.push(`/books`);
	};

	return (
		<Stack
			minH={'100vh'}
			direction={{ base: 'column', md: 'row' }}
			bg={'lightgrey'}>
			<Flex p={8} flex={1} align={'center'} justify={'center'}>
				<Stack spacing={4} w={'full'} maxW={'md'} borderRadius={'10px'}>
					<Heading fontSize={'2xl'}>Sign in to your account</Heading>

					<FormControl id='username'>
						<FormLabel>Username or email</FormLabel>
						<Input
							bg={'white'}
							name='email'
							onChange={(e) => handleOnChange(e)}
						/>
					</FormControl>

					<FormControl id='password'>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
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
							onClick={(event) => handleSignUp(event)}>
							Sign in
						</Button>
					</Stack>

					<Stack pt={6}>
						<Text align={'center'}>
							Don´t have an account?{' '}
							<Button
								as={'a'}
								color={'blue.400'}
								variant={'link'}
								href={'/register'}>
								Register
							</Button>
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
