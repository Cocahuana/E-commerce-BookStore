import {
	Box,
	GridItem,
	Heading,
	SimpleGrid,
	Text,
	chakra,
	Stack,
	FormLabel,
	FormControl,
	InputGroup,
	InputLeftAddon,
	Input,
	Textarea,
	FormHelperText,
	Flex,
	Avatar,
	Icon,
	VisuallyHidden,
	Button,
	Divider,
	Select,
	Container,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

function FormAdd() {
	const { genres } = useSelector((state) => state);

	const format = (val) => `$` + val;
	const parse = (val) => val.replace(/^\$/, '');

	const [value, setValue] = React.useState('1.53');

	return (
		<Box
			bg='#edf3f8'
			_dark={{
				bg: '#111',
			}}
			pt={'20'}
		>
			<Container maxW={'container.lg'}>
				<Box>
					<chakra.form
						method='POST'
						shadow='base'
						rounded={[null, 'md']}
						overflow={{
							sm: 'hidden',
						}}
					>
						<Stack
							px={4}
							py={5}
							p={[null, 6]}
							bg='white'
							_dark={{
								bg: '#141517',
							}}
							spacing={6}
						>
							<SimpleGrid columns={6} spacing={6}>
								<FormControl as={GridItem} colSpan={[6, 3]}>
									<FormLabel
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}
									>
										Name Of The Book
									</FormLabel>
									<Input
										type='text'
										name='first_name'
										id='first_name'
										autoComplete='given-name'
										mt={1}
										focusBorderColor='brand.400'
										shadow='sm'
										size='sm'
										w='full'
										rounded='md'
									/>
								</FormControl>

								<FormControl as={GridItem} colSpan={[6, 3]}>
									<FormLabel
										htmlFor='last_name'
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}
									>
										Author
									</FormLabel>
									<Input
										type='text'
										name='last_name'
										id='last_name'
										autoComplete='family-name'
										mt={1}
										focusBorderColor='brand.400'
										shadow='sm'
										size='sm'
										w='full'
										rounded='md'
									/>
								</FormControl>

								<FormControl as={GridItem} colSpan={3}>
									<FormLabel
										htmlFor='street_address'
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}
									>
										xd
									</FormLabel>
									<Input
										type='text'
										name='street_address'
										id='street_address'
										autoComplete='street-address'
										mt={1}
										focusBorderColor='brand.400'
										shadow='sm'
										size='sm'
										w='full'
										rounded='md'
									/>
								</FormControl>
								<FormControl as={GridItem} colSpan={[6, 3]}>
									<FormLabel
										htmlFor='country'
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}
									>
										Genres/Category
									</FormLabel>
									<Select
										id='country'
										name='country'
										autoComplete='country'
										placeholder='Select option'
										mt={1}
										focusBorderColor='brand.400'
										shadow='sm'
										size='sm'
										w='full'
										rounded='md'
									>
										{genres.map((g, i) => (
											<option key={i}>{g.name}</option>
										))}
									</Select>
								</FormControl>

								<FormControl as={GridItem}>
									<FormLabel
										htmlFor='city'
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}
									>
										Rating
									</FormLabel>
									<NumberInput
										defaultValue={1}
										precision={1}
										max={5}
										step={0.5}
										min={0}
										clampValueOnBlur={false}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
								<FormControl as={GridItem}>
									<FormLabel
										htmlFor='city'
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}
									>
										Price
									</FormLabel>
									<NumberInput
										onChange={(valueString) => setValue(parse(valueString))}
										value={format(value)}
										max={500}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
							</SimpleGrid>
						</Stack>
						<Box
							px={{
								base: 4,
								sm: 6,
							}}
							py={3}
							bg='gray.50'
							_dark={{
								bg: '#121212',
							}}
							textAlign='right'
						>
							<Button
								type='submit'
								colorScheme='brand'
								_focus={{
									shadow: '',
								}}
								fontWeight='md'
							>
								Save
							</Button>
						</Box>
					</chakra.form>
				</Box>

				<Divider
					my='5'
					borderColor='gray.300'
					_dark={{
						borderColor: 'whiteAlpha.300',
					}}
					visibility={{
						base: 'hidden',
						sm: 'visible',
					}}
				/>
				<Box>
					<chakra.form
						method='POST'
						shadow='base'
						rounded={[null, 'md']}
						overflow={{
							sm: 'hidden',
						}}
					>
						<Stack
							px={4}
							py={5}
							bg='white'
							_dark={{
								bg: '#141517',
							}}
							spacing={6}
							p={{
								sm: 6,
							}}
						>
							<div>
								<FormControl id='email' mt={1}>
									<FormLabel
										fontSize='sm'
										fontWeight='md'
										color='gray.700'
										_dark={{
											color: 'gray.50',
										}}
									>
										Description
									</FormLabel>
									<Textarea
										placeholder='This book is amazing ...'
										mt={1}
										rows={3}
										shadow='sm'
										focusBorderColor='brand.400'
										fontSize={{
											sm: 'sm',
										}}
									/>
									<FormHelperText>
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Iusto minima consectetur eligendi neque dicta debitis velit
										ipsa, labore pariatur quasi, architecto fuga cupid
									</FormHelperText>
								</FormControl>
							</div>

							<FormControl>
								<FormLabel
									fontSize='sm'
									fontWeight='md'
									color='gray.700'
									_dark={{
										color: 'gray.50',
									}}
								>
									Photo
								</FormLabel>
								<Flex alignItems='center' mt={1}>
									<Avatar
										boxSize={12}
										bg='gray.100'
										_dark={{
											bg: 'gray.800',
										}}
										icon={
											<Icon
												boxSize={9}
												mt={3}
												rounded='full'
												color='gray.300'
												_dark={{
													color: 'gray.700',
												}}
											/>
										}
									/>
									<Button
										type='button'
										ml={5}
										variant='outline'
										size='sm'
										fontWeight='medium'
										_focus={{
											shadow: 'none',
										}}
									>
										Change
									</Button>
								</Flex>
							</FormControl>

							<FormControl>
								<FormLabel
									fontSize='sm'
									fontWeight='md'
									color='gray.700'
									_dark={{
										color: 'gray.50',
									}}
								>
									Cover photo
								</FormLabel>
								<Flex
									mt={1}
									justify='center'
									px={6}
									pt={5}
									pb={6}
									borderWidth={2}
									_dark={{
										color: 'gray.500',
									}}
									borderStyle='dashed'
									rounded='md'
								>
									<Stack spacing={1} textAlign='center'>
										<Icon
											mx='auto'
											boxSize={12}
											color='gray.400'
											_dark={{
												color: 'gray.500',
											}}
											stroke='currentColor'
											fill='none'
											viewBox='0 0 48 48'
											aria-hidden='true'
										>
											<path
												d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</Icon>
										<Flex
											fontSize='sm'
											color='gray.600'
											_dark={{
												color: 'gray.400',
											}}
											alignItems='baseline'
										>
											<chakra.label
												htmlFor='file-upload'
												cursor='pointer'
												rounded='md'
												fontSize='md'
												color='brand.600'
												_dark={{
													color: 'brand.200',
												}}
												pos='relative'
												_hover={{
													color: 'brand.400',
													_dark: {
														color: 'brand.300',
													},
												}}
											>
												<span>Upload a file</span>
												<VisuallyHidden>
													<input
														id='file-upload'
														name='file-upload'
														type='file'
													/>
												</VisuallyHidden>
											</chakra.label>
											<Text pl={1}>or drag and drop</Text>
										</Flex>
										<Text
											fontSize='xs'
											color='gray.500'
											_dark={{
												color: 'gray.50',
											}}
										>
											PNG, JPG, GIF up to 10MB
										</Text>
									</Stack>
								</Flex>
							</FormControl>
						</Stack>
						<Box
							px={{
								base: 4,
								sm: 6,
							}}
							py={3}
							bg='gray.50'
							_dark={{
								bg: '#121212',
							}}
							textAlign='right'
						>
							<Button
								type='submit'
								colorScheme='blue'
								_focus={{
									shadow: '',
								}}
								fontWeight='md'
							>
								Save
							</Button>
						</Box>
					</chakra.form>
				</Box>
				<Divider
					my='5'
					borderColor='gray.300'
					visibility={{
						base: 'hidden',
						sm: 'visible',
					}}
				/>
			</Container>
		</Box>
	);
}

export default FormAdd;
