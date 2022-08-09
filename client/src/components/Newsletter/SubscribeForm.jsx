import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSubscribeStatus } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

export const SubscribeForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const toast = useToast();
	const [email, setEmail] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(changeSubscribeStatus(email));
		toast({
			title: 'You are now subscribed!!!',
			status: 'success',
			isClosable: 'true',
			duration: '1500',
			position: 'top',
		});
		history.push('/books');
	};

	console.log(email);

	function handleChange(e) {
		setEmail({
			[e.target.name]: e.target.value,
		});
	}

	return (
		<Stack as='form' spacing='3' onSubmit={(e) => handleSubmit(e)}>
			<FormControl id='email'>
				<FormLabel srOnly>Enter your email</FormLabel>
				<Input
					type='email'
					placeholder='Enter your email'
					size='lg'
					fontSize='md'
					name='email'
					onChange={(e) => handleChange(e)}
					focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
				/>
			</FormControl>
			<Button
				type='submit'
				fontWeight='bold'
				textTransform='uppercase'
				fontSize='xl'
				colorScheme='blue'
				size='lg'>
				SUBSCRIBE
			</Button>
		</Stack>
	);
};
