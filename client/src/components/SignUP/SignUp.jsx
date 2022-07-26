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

function SignUp() {
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	const [usernameReg, setUsernameReg] = useState('');
	const [passwordReg, setPasswordReg] = useState('');
	const [emailReg, setEmailReg] = useState('');

	const register = () => {
		axios({
			method: 'post',
			data: {
				username: usernameReg,
				email: emailReg,
				password: passwordReg,
			},
			url: 'http://localhost:3001/register',
		}).then((res) => alert(JSON.stringify(res.data)));
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
							onChange={(e) => setUsernameReg(e.target.value)}
							bg={'white'}
						/>
					</FormControl>

					<FormControl id='email'>
						<FormLabel>Email address</FormLabel>
						<Input
							placeholder='email'
							onChange={(e) => setEmailReg(e.target.value)}
							bg={'white'}
							type='email'
						/>
					</FormControl>

					<FormControl
						id='password'
						onChange={(e) => setPasswordReg(e.target.value)}>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								placeholder='password'
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
							onClick={(event) => register(event)}>
							Sign up
						</Button>
					</Stack>

					<Stack pt={6}>
						<Text align={'center'}>
							Already a user?{' '}
							<Button
								as={'a'}
								color={'blue.400'}
								variant={'link'}
								href={'/login'}>
								Login
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
						'http://xurxodev.com/content/images/2016/09/Libros-recomendados.jpg'
					}
				/>
			</Flex>
		</Stack>
	);
}

export default SignUp;
