import {
	Avatar,
	Box,
	Button,
	Center,
	Checkbox,
	Flex,
	Icon,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderMark,
	RangeSliderThumb,
	RangeSliderTrack,
	Select,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
	applyFilters,
	getGenres,
	saveOrder,
	saveFilterGenre,
	saveFilterPrice,
} from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function Filter({ setCurrentPage }) {
	const dispatch = useDispatch();
	const { genres, filters, booksCopy } = useSelector((state) => state);
	const [sliderValue, setSliderValue] = useState(filters.price);
	const [isChecked, setIsChecked] = useState(filters.genres);
	const [orderBy, setOrderBy] = useState(filters.order);

	const handleCheckChange = (e) => {
		e.preventDefault();
		if (e.target.checked) {
			//agrego el genero al estado local si se marca
			if (!isChecked.includes(e.target.value)) {
				setIsChecked([...isChecked, e.target.value]);
			}
		} else {
			setIsChecked(
				//remuevoe el genero del estado local si se desmarca
				isChecked.filter((checkBox) => checkBox !== e.target.value)
			);
		}
	};
	const handleOrderBy = (e) => {
		e.preventDefault();
		setOrderBy(e.target.value);
	};

	const handleSlideChange = (pricesArr) => {
		setSliderValue(pricesArr);
	};

	useEffect(() => {
		dispatch(getGenres());
		dispatch(saveFilterGenre(isChecked));
		dispatch(saveFilterPrice(sliderValue));
		dispatch(saveOrder(orderBy));
		dispatch(applyFilters());
		setCurrentPage(1);
	}, [dispatch, isChecked, sliderValue, orderBy, booksCopy]);

	return (
		<Stack
			boxShadow={useColorModeValue(
				'2px 6px 22px rgba(160, 174, 192, 0.6)',
				'2px 6px 18px rgba(9, 17, 28, 0.9)'
			)}
			bg={useColorModeValue('whiteAlpha.300', 'gray.800')}
			rounded='md'
			overflow='hidden'>
			<Flex
				justify='center'
				alignItems='center'
				bg={useColorModeValue('gray.200', 'blackAlpha.300')}
				h='32'>
				<Text
					fontWeight='semibold'
					fontSize={{
						base: '2xl',
						md: 'md',
						lg: '2xl',
					}}>
					Filters
				</Text>
			</Flex>
			<Flex justify='space-between' alignItems='center'>
				<Stack
					spacing={5}
					direction='column'
					alignItems='center'
					pl='2'>
					<Flex direction='column'>
						<Stack spacing={4}>
							{genres.map((p, g) => (
								<Checkbox
									onChange={(e) => handleCheckChange(e)}
									value={p.name}
									isChecked={isChecked.includes(p.name)}
									key={g}>
									{p.name}
								</Checkbox>
							))}
						</Stack>
					</Flex>
				</Stack>
			</Flex>

			<Flex
				justifyContent='center'
				alignItems='center'
				direction='column'
				h='32'>
				Price
				<RangeSlider
					w='70%'
					step={1}
					min={0}
					max={60}
					aria-label={['min', 'max']}
					defaultValue={filters.price}
					onChange={(pricesArr) => handleSlideChange(pricesArr)}>
					<RangeSliderTrack bg='blue.100'>
						<RangeSliderFilledTrack />
					</RangeSliderTrack>
					<RangeSliderMark
						value={sliderValue[0]}
						textAlign='center'
						bg='blue.500'
						color='white'
						mt='5'
						ml='-5'
						w='15'>
						{sliderValue[0]}$
					</RangeSliderMark>

					<RangeSliderMark
						value={sliderValue[1]}
						textAlign='center'
						bg='blue.500'
						color='white'
						mt='5'
						ml='-5'
						w='15'>
						{sliderValue[1]}$
					</RangeSliderMark>
					<RangeSliderThumb index={0} />
					<RangeSliderThumb index={1} />
				</RangeSlider>
			</Flex>

			<Center>
				<Flex h='40' justify='space-between' alignItems='center'>
					<Stack spacing={0} direction='column' alignItems='center'>
						<Flex>Rating</Flex>
						<Flex direction='column' p={2}>
							<Select
								onChange={handleOrderBy}
								variant='filled'
								defaultValue={'Default'}>
								<option value='Default' disabled>
									rating
								</option>
								<option value='highest'>
									Rating High to Low
								</option>
								<option value='lowest'>
									Rating Low to High
								</option>
							</Select>
						</Flex>
					</Stack>
				</Flex>
			</Center>
		</Stack>
	);
}

export default Filter;
