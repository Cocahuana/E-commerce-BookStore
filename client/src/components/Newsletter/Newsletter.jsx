import {
	Box,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { SubscribeForm } from './SubscribeForm';
import { Link as BuenLink } from 'react-router-dom';

export const Newsletter = () => (
	<Box height='100vh'>
		<Modal
			isOpen={true}
			onClose={() => void 0}
			size='2xl' // `trapFocus` and `blockScrollOnMount` are only switched off so that the preview works properly.
			blockScrollOnMount={false}
			trapFocus={false}>
			<ModalOverlay />
			<ModalContent borderRadius='2xl' mx='4'>
				<ModalBody>
					<Stack
						maxW='xs'
						mx='auto'
						py={{
							base: '12',
							md: '16',
						}}
						spacing={{
							base: '6',
							md: '10',
						}}>
						//Logo
						<Stack spacing='3' textAlign='center'>
							<Text fontSize='lg'>
								Enter your email below &amp;
							</Text>
							<Text
								color={useColorModeValue(
									'blue.500',
									'blue.200'
								)}
								fontWeight='extrabold'
								fontSize={{
									base: '5xl',
									md: '6xl',
								}}
								textTransform='uppercase'
								transform='scale(1.2)'>
								AND GET
							</Text>
							<Text fontSize='lg'>
								<Box
									as='span'
									whiteSpace='nowrap'
									fontWeight='bold'></Box>{' '}
								exclusive access to our latest news
							</Text>
						</Stack>
						<SubscribeForm />
						<BuenLink to='/books'>
							<Link
								fontSize='sm'
								textAlign='center'
								color={useColorModeValue(
									'gray.600',
									'gray.400'
								)}
								textDecoration='underline'>
								No, I don’t want to subscribe right now
							</Link>
						</BuenLink>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	</Box>
);
