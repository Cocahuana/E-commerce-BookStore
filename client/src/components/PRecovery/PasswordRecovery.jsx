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

function PasswordRecovery(props) {
	const [show, setShow] = React.useState(false);
	const [passwords, setPasswords] = React.useState(['', '']);
	const [errors, setErrors] = React.useState({});
	const { userId } = props.match.params;
	return (
		<Stack
			minH={'100vh'}
			direction={{ base: 'column', md: 'row' }}
			bg={useColorModeValue('gray.200', 'gray.500')}>
			<Flex p={8} flex={1} align={'center'} justify={'center'}>
				<Stack spacing={4} w={'full'} maxW={'md'} borderRadius={'10px'}>
					<Heading fontSize={'2xl'}>Create a new password</Heading>

					<FormControl id='password'>
						<FormLabel>New Password</FormLabel>
						<InputGroup>
							<Input
								name='password'
								bg={useColorModeValue(
									'whiteAlpha.800',
									'gray.400'
								)}
								value={passwords[0]}
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
					<FormControl id='password'>
						<FormLabel>Repeat Password</FormLabel>
						<InputGroup>
							<Input
								name='password'
								bg={useColorModeValue(
									'whiteAlpha.800',
									'gray.400'
								)}
								value={passwords[1]}
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
						<Button colorScheme={'blue'} variant={'solid'}>
							Change Password
						</Button>
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

export default PasswordRecovery;
