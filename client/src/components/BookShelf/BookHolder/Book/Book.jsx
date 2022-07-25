import {
	AspectRatio,
	Box,
	Button,
	HStack,
	Icon,
	Image,
	Link,
	Skeleton,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	Center,
} from '@chakra-ui/react';
import * as React from 'react';
import { Rating } from './Rating';
import { FavouriteButton } from './FavouriteButton';
import { PriceTag } from './PriceTag';
import { Link as BuenLink } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';

export const Book = (props) => {
	const { product, rootProps } = props;
	const {
		title,
		authors,
		image,
		price,
		salePrice,
		rating,
		ratingCount,
		id,
		currency,
	} = product;
	return (
		<Stack
			maxW={'20vh'}
			spacing={useBreakpointValue({
				base: '4',
				md: '5',
			})}
			{...rootProps}>
			<Box position='relative' h='30vh' w='100%'>
				<BuenLink to={`/book/${id}`}>
					<Link>
						<Image
							src={image}
							alt={title}
							draggable='false'
							fallback={<Skeleton />}
							h='30vh'
							w='100%'
							borderRadius={useBreakpointValue({
								base: 'md',
								md: 'xl',
							})}
						/>
					</Link>
				</BuenLink>
				<FavouriteButton
					position='absolute'
					top='4'
					right='4'
					aria-label={`Add ${title} to your favourites`}
				/>
			</Box>
			<Stack>
				<Stack spacing='2'>
					<BuenLink to={`/book/${id}`}>
						<Link>
							<Text
								fontWeight='bold'
								color={useColorModeValue(
									'gray.700',
									'gray.400'
								)}>
								{title.length < 25
									? title
									: title.slice(0, 22) + '...'}
							</Text>
						</Link>
					</BuenLink>
					<Text
						fontWeight='medium'
						color={useColorModeValue('gray.700', 'gray.400')}>
						{authors}
					</Text>
					<PriceTag
						price={price}
						salePrice={salePrice}
						currency={currency}
					/>
				</Stack>
				<HStack display='flex'>
					<Rating defaultValue={rating} size='sm' />
					<HStack>
						<Text
							fontSize='sm'
							paddingLeft='16px'
							color={useColorModeValue('gray.600', 'gray.400')}>
							{ratingCount}
						</Text>
						<Icon as={FaCommentDots} color='blue.500' />
					</HStack>
				</HStack>
			</Stack>
			<Stack align='center'>
				<Button w='100%' colorScheme='blue' isFullWidth>
					Add to cart
				</Button>
				<Link
					textDecoration='underline'
					fontWeight='medium'
					color={useColorModeValue('gray.600', 'gray.400')}>
					Quick shop
				</Link>
			</Stack>
		</Stack>
	);
};
