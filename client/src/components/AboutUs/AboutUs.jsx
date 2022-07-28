import React from 'react';
import {
	Text,
	chakra,
	Box,
	Avatar,
	Flex,
	SimpleGrid,
	Button,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';

const testimonials = [
	{
		name: 'Mati',
		position: 'developer',
		company: 'BookStore',
		image: 'https://media-exp1.licdn.com/dms/image/C4E03AQG1T43fQUxrXg/profile-displayphoto-shrink_200_200/0/1620223234059?e=1663804800&v=beta&t=XLAAn-oViBmX17S-k6tsiMCu1G0VQw1AEW6AMcf3Tn8',
		content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
		rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
		risus at semper`,
	},
	{
		name: 'Ale',
		position: 'CEO',
		company: 'BookStore',
		image: 'https://media-exp1.licdn.com/dms/image/C5603AQEpi5VxOr05rw/profile-displayphoto-shrink_200_200/0/1632938782612?e=1663804800&v=beta&t=LEz42gvrQXgiDn8A5QuF5sP6LG4F4ZeqoWATjN5nG-w',
		content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
		rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
		risus at semper`,
	},
	{
		name: 'Lucho',
		position: 'developer',
		company: 'BookStore',
		image: 'https://media-exp1.licdn.com/dms/image/C5603AQGu6VKsTDyi4Q/profile-displayphoto-shrink_200_200/0/1614379338899?e=1663804800&v=beta&t=yVuO9DQMrYdymoEH95aGdV9Cb_EEH1-7eHJ4BTWGZVU',
		content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
		rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
		risus at semper`,
	},
	{
		name: 'Trini',
		position: 'developer',
		company: 'BookStore',
		image: 'https://media-exp1.licdn.com/dms/image/C4D03AQEcb0vchcf9lw/profile-displayphoto-shrink_200_200/0/1654380893259?e=1663804800&v=beta&t=jeR_ICRGp6ZpObUz1D6044w77Jg2o8FFhwVBNPo_g7Y',
		content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
		rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
		risus at semper`,
	},
	{
		name: 'Rodri',
		position: 'GOD developer',
		company: 'BookStore',
		image: 'https://media-exp1.licdn.com/dms/image/C4D03AQH_lUshhI_MWA/profile-displayphoto-shrink_200_200/0/1652545023557?e=1664409600&v=beta&t=_T1Jw5caShcd1NIUOFmNlvlLbaZptwydjNrj-Zw1S0w',
		content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
		rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
		risus at semper`,
	},
	{
		name: 'Eze',
		position: 'Dj developer',
		company: 'BookStore',
		image: 'https://media-exp1.licdn.com/dms/image/C4D03AQEfHUP7juANMA/profile-displayphoto-shrink_200_200/0/1642718526971?e=1664409600&v=beta&t=s_aT2CJVubXY2l7XNdWMZ0C3KWgWq2Pw4a3FbIUlMVk',
		content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
		rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
		risus at semper`,
	},
	{
		name: 'Gabi',
		position: '.json developer',
		company: 'BookStore',
		image: 'https://media-exp1.licdn.com/dms/image/D4D35AQEjfcHMzjYW4g/profile-framedphoto-shrink_200_200/0/1652637831839?e=1659571200&v=beta&t=zbljChkan5pcBECPpP60OoB4pWFEZ2Rv1kjs20tlo24',
		content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
		rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
		risus at semper`,
	},
	{
		name: 'Ivo',
		position: 'Backend Developer',
		company: 'BookStore',
		image: 'https://ca.slack-edge.com/TPRS7H4PN-U031M29E25C-01724309db4f-512',
		content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
		rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
		risus at semper`,
	},
];

function AboutUs() {
	return (
		<Flex
			bg='#edf3f8'
			_dark={{
				bg: '#3e3e3e',
			}}
			w='full'
			justifyContent='center'
			alignItems='center'>
			<Flex
				shadow='xl'
				bg='white'
				_dark={{
					bg: 'gray.900',
				}}
				px={8}
				py={20}
				mx='auto'
				flexDirection='column'>
				<Flex flexDirection='column' alignItems={'center'}>
					<chakra.h2
						mb={4}
						fontSize={{
							base: '2xl',
							md: '4xl',
						}}
						fontWeight='bold'
						letterSpacing='tight'
						textAlign={{
							base: 'center',
							md: 'left',
						}}
						color='brand.pepeoscuro'
						_dark={{
							color: 'gray.400',
						}}
						lineHeight={{
							md: 'shorter',
						}}>
						What's E-Bookstore?
					</chakra.h2>
					<chakra.p
						mb={5}
						textAlign={{
							base: 'center',
							sm: 'left',
							lg: 'center',
						}}
						color='gray.600'
						_dark={{
							color: 'gray.400',
						}}
						fontSize={{
							md: 'lg',
						}}>
						It's an online bookstore where you can save, comment,
						rate and buy your favorite digital and physical books
					</chakra.p>
				</Flex>

				<Flex
					alignItems={'center'}
					pt={'16'}
					flexDirection={'column'}
					order={{
						base: 'initial',
						md: 2,
					}}>
					<chakra.h2
						mb={4}
						fontSize={{
							base: '2xl',
							md: '4xl',
						}}
						fontWeight='extrabold'
						letterSpacing='tight'
						textAlign={{
							base: 'center',
							md: 'left',
							lg: 'center',
						}}
						color='brand.pepeoscuro'
						_dark={{
							color: 'gray.400',
						}}
						lineHeight={{
							md: 'shorter',
						}}>
						Why E-Bookstore?
					</chakra.h2>
					<chakra.p
						mb={5}
						textAlign={{
							base: 'center',
							lg: 'center',
							sm: 'left',
						}}
						color='gray.600'
						_dark={{
							color: 'gray.400',
						}}
						fontSize={{
							md: 'lg',
						}}>
						Because if we dont, we aint passing Next to our Because
						if we dont, we aint passing and free plugins you can use
						our expansive Because if we dont, we aint passing
						Payments and build advanced and Because if we dont, we
						aint passing
					</chakra.p>
				</Flex>
				<Flex
					alignItems={'center'}
					pt={'16'}
					flexDirection={'column'}
					order={{
						base: 'initial',
						md: 2,
					}}>
					<chakra.h1
						mb={4}
						fontSize={{
							base: '2xl',
							md: '4xl',
						}}
						fontWeight='bold'
						letterSpacing='tight'
						textAlign={{
							base: 'center',
							md: 'left',
							lg: 'center',
						}}
						color='brand.pepe'
						_dark={{
							color: 'gray.400',
						}}>
						Our Team
					</chakra.h1>
					<SimpleGrid
						columns={{ base: 1, md: 2 }}
						placeItems='center'
						spacing={10}
						mt={12}
						mb={4}>
						{testimonials.map((obj, index) => (
							<Stack
								key={index}
								direction={{ base: 'column', sm: 'row' }}
								spacing={2}
								mb={5}
								justify='center'>
								<Stack
									maxW='345px'
									boxShadow='lg'
									rounded='md'
									p={6}
									pos='relative'
									bg={useColorModeValue('white', 'gray.800')}
									_after={{
										content: `""`,
										w: '0',
										h: '0',
										borderColor: `transparent ${useColorModeValue(
											'white',
											'#1a202c'
										)} transparent`,
										borderStyle: 'solid',
										borderWidth: '10px 0 10px 10px',
										position: 'absolute',
										top: { base: 'unset', sm: '45%' },
										right: { base: 'unset', sm: '-10px' },
										left: { base: '48%', sm: 'unset' },
										bottom: { base: '-15px', sm: 'unset' },
										transform: {
											base: 'rotate(90deg)',
											sm: 'unset',
										},
										display: 'block',
									}}>
									<chakra.p
										fontWeight='light'
										fontSize='medium'>
										{obj.content}
									</chakra.p>
								</Stack>
								<Stack
									direction='column'
									spacing={2}
									p={2}
									justify='flex-end'
									alignItems='center'>
									<Avatar
										size='lg'
										showBorder={true}
										borderColor='brand.pepeoscuro'
										name='avatar'
										src={obj.image}
									/>
									<Box textAlign='center'>
										<Text fontWeight='bold' fontSize='md'>
											{obj.name}
										</Text>
										<Text
											fontWeight='medium'
											fontSize='xs'
											color='gray.400'>
											{obj.position}, {obj.company}
										</Text>
									</Box>
								</Stack>
							</Stack>
						))}
					</SimpleGrid>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default AboutUs;
