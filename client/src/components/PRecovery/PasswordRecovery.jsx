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
	FormHelperText,
	FormErrorMessage,
	useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	userLogin,
	checkStates,
	resetPassword,
} from '../../redux/actions/index';
import { useHistory } from 'react-router-dom';
import { Link as BuenLink } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../firebase/context.jsx';

function PasswordRecovery(props) {
	function validate(passwords) {
		let invalidPassword = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;

		let errors = { password: 'ready' };

		//---------- Password Start ----------//
		if (passwords[0] !== passwords[1])
			errors.password = 'Password check must match';
		if (invalidPassword.test(passwords[0]))
			errors.password =
				'Invalid Password, at least 8 characters needed, must contain at least one uppercase letter, lowercase letter, number and special character';
		if (!passwords[0]) errors.password = 'Password required';
		//---------- Password End ----------//

		return errors;
	}
	const [show, setShow] = React.useState(false);
	const [show2, setShow2] = React.useState(false);
	const [password, setPassword] = React.useState('');
	const [checkpass, setCheckPass] = React.useState('');
	const [errors, setErrors] = React.useState({});
	const { userId } = props.match.params;
	const dispatch = useDispatch();
	const history = useHistory();
	const toast = useToast();
	const handleChange = (e) => {
		if (e.target.name === 'pass') {
			setPassword(e.target.value);
			setErrors(validate([e.target.value, checkpass]));
		} else {
			setCheckPass(e.target.value);
			setErrors(validate([password, e.target.value]));
		}
	};
	const handleSetNewPassword = (e) => {
		e.preventDefault();
		dispatch(resetPassword(userId, password));
		toast({
			title: 'Password changed successfuly',
			status: 'success',
			isClosable: 'true',
			duration: '1000',
			position: 'bottom',
		});
		history.push('/login');
	};
	return (
		<Stack
			minH={'100vh'}
			direction={{ base: 'column', md: 'row' }}
			bg={useColorModeValue('gray.200', 'gray.500')}>
			<Flex p={8} flex={1} align={'center'} justify={'center'}>
				<Stack spacing={4} w={'full'} maxW={'md'} borderRadius={'10px'}>
					<Heading fontSize={'2xl'}>Create a new password</Heading>


					<FormControl id='pass' isInvalid={errors.password}>
						<FormLabel>New Password</FormLabel>
						<InputGroup>
							<Input
								name='pass'

								bg={useColorModeValue(
									'whiteAlpha.800',
									'gray.400'
								)}

								value={password}
								type={show ? 'text' : 'password'}
								onChange={handleChange}

							/>
							<InputRightElement h={'full'}>
								<Button
									variant={'ghost'}
									onClick={() => setShow((show) => !show)}>
									{show ? <ViewIcon /> : <ViewOffIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>

						{errors.password && errors.password !== 'ready' ? (
							<FormErrorMessage>
								{errors.password}
							</FormErrorMessage>
						) : (
							<FormHelperText>Example: Messi.1234</FormHelperText>
						)}
					</FormControl>
					<FormControl id='check'>
						<FormLabel>Repeat Password</FormLabel>
						<InputGroup>
							<Input
								name='check'

								bg={useColorModeValue(
									'whiteAlpha.800',
									'gray.400'
								)}

								value={checkpass}
								type={show2 ? 'text' : 'password'}
								onChange={handleChange}

							/>
							<InputRightElement h={'full'}>
								<Button
									variant={'ghost'}

									onClick={() => setShow2((show) => !show)}>
									{show2 ? <ViewIcon /> : <ViewOffIcon />}

								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>

					<Stack spacing={6}>

						<Button
							colorScheme={'blue'}
							variant={'solid'}
							disabled={errors.password !== 'ready'}
							onClick={handleSetNewPassword}>

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
