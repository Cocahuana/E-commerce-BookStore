import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Unauthorized401() {
	return (
		<Box textAlign='center' py={10} px={6} pt='24' h='90vh'>
			<Heading
				display='inline-block'
				as='h2'
				size='2xl'
				bgGradient='linear(to-r, red.400, red.600)'
				backgroundClip='text'>
				401
			</Heading>
			<Text fontSize='18px' mt={3} mb={2}>
				Authorization is required
			</Text>
			<Text color={'gray.500'} mb={6}>
				The page you are trying to access is not available for your
				current status.
			</Text>
			<Link to='/'>
				<Button
					colorScheme='red'
					bgGradient='linear(to-r, red.400, red.500, red.600)'
					color='white'
					variant='solid'>
					Back to BookStore
				</Button>
			</Link>
		</Box>
	);
}
