import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Page404() {
	return (
		<Box textAlign='center' py={10} px={6} pt='24' h='90vh'>
			<Heading
				display='inline-block'
				as='h2'
				size='2xl'
				bgGradient='linear(to-r, red.400, red.600)'
				backgroundClip='text'>
				404
			</Heading>
			<Text fontSize='18px' mt={3} mb={2}>
				Page Not Found
			</Text>
			<Text color={'gray.500'} mb={6}>
				The page you're looking for does not seem to exist
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
