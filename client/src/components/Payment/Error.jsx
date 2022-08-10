import React from 'react';
import { Link } from 'react-router-dom';
import {
	Box,
	Heading,
	Text,
	Button,
	Center,
	Spinner,
	Stack,
	VStack,
	Img,
} from '@chakra-ui/react';

export default function Error() {
	return (
		<VStack
			justify={'center'}
			textAlign='center'
			// py={10}
			px={6}
			pt='24'
			h='90vh'>
			<Heading
				w={'30%'}
				p={'4%'}
				display='inline-block'
				as='h2'
				bgGradient='linear(to-r, blue.600, blue.400)'
				backgroundClip='text'>
				Error
				<Stack px={"5%"} display='inline-block'>
					<Img					
						boxSize={'30px'}
						src='https://www.dlf.pt/dfpng/middlepng/481-4818276_warning-icon-png-png-download-general-safety-lab.png'
					/>
				</Stack>
			</Heading>
			<Text pb={'3%'} fontSize='20px' mt={3} mb={2}>
				Your purchase could not be completed!
			</Text>
			<Text w={'50%'} color={'gray.500'} mb={6}>
				Please repeat the purchase steps
				<Link to='/purchase'>
					<Button pl={'1%'} color={'blue.400'} variant={'link'}>
						here
					</Button>
				</Link>
			</Text>
			{/* <Stack color={'blue'}>
				{loader ? (
					<Center>
						<Spinner
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='blue.500'
							size='xl'
						/>
					</Center>
				) : (
					receipt?.Books?.map((e) => (
						<Text>
							<p>{e.title}</p>
							<p>{e.price}</p>
						</Text>
					))
				)}
				{<h1>{receipt.totalPrice}</h1>}
			</Stack> */}
			<Stack py={'5%'}>
				<Link to='/books'>
					<Button
						bgGradient='linear(to-r, blue.400, blue.600)'
						color={'whiteAlpha.700'}
						_hover={{
							bgGradient: 'linear(to-r, blue.600, blue.400)',
							color: 'black',
						}}
						variant='solid'>
						Back to BookStore
					</Button>
				</Link>
			</Stack>
		</VStack>
	);
}
