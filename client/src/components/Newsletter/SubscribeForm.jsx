import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';

export const SubscribeForm = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<Stack as='form' spacing='3' onSubmit={(e) => handleSubmit}>
			<FormControl id='email'>
				<FormLabel srOnly>Enter your email</FormLabel>
				<Input
					type='email'
					placeholder='Enter your email'
					size='lg'
					fontSize='md'
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
