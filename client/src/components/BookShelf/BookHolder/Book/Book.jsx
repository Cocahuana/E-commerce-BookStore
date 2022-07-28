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
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../../redux/actions/index';
import Swal from 'sweetalert2';

export const Book = (props) => {
	const { product, rootProps } = props;

	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(addToCart(id));
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'Added to the cart successfully',
			showConfirmButton: false,
			timer: 1500,
		});
	};

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
				lg: '4',
			})}
			{...rootProps}>
			<Box position='relative'>
				<BuenLink to={`/book/${id}`}>
					<Link>
						<Image
							src={image}
							alt={title}
							draggable='false'
							fallback={<Skeleton />}
							boxSize={{
								base: 'min-content',
								md: 'md',
								lg: '60',
							}}
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
					id={id}
					onClick={console.log(id)}
				/>
			</Box>
			<Stack>
				<Stack spacing='2'>
					<BuenLink to={`/book/${id}`}>
						<Link>
							<Text
								h='3rem'
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
						h='2rem'
						mt={'16px'}
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
				<Button colorScheme='blue' onClick={handleAddToCart}>
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
