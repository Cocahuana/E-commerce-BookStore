import {
	Avatar,
	Box,
	Button,
	Center,
	Checkbox,
	Flex,
	HStack,
	VStack,
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
	saveFilterLanguage,
	saveFilterOnSale,
	resetFilters,
	getBooksByTitleOrAuthor,
} from '../../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClear } from 'react-icons/ai';

function Filter({ setCurrentPage }) {
	const dispatch = useDispatch();
	const { genres, filters, booksCopy } = useSelector((state) => state);
	const [sliderValue, setSliderValue] = useState(filters.price);
	const [onsale, setOnSale] = useState(filters.onsale);
	const [language, setLanguage] = useState(filters.language);
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
	const handleOnSale = (e) => {
		e.preventDefault();
		if (e.target.checked) {
			setOnSale(true);
		} else {
			setOnSale(false);
		}
	};
	const handleLanguage = (e) => {
		e.preventDefault();
		if (e.target.checked) {
			setLanguage(e.target.value);
		} else {
			setLanguage('');
		}
	};
	const handleOrderBy = (e) => {
		e.preventDefault();
		setOrderBy(e.target.value);
	};

	const handleSlideChange = (pricesArr) => {
		if (pricesArr[0] === pricesArr[1] && pricesArr[1] === 60) {
			pricesArr[0] = pricesArr[0] - 1;
		} else if (pricesArr[0] === pricesArr[1] && pricesArr[0] === 0) {
			pricesArr[1] = pricesArr[1] + 1;
		}
		setSliderValue(pricesArr);
	};
	const handleReset = (e) => {
		e.preventDefault();
		dispatch(resetFilters());
		dispatch(getBooksByTitleOrAuthor(''));
		setSliderValue([0, 60]);
		setOnSale(false);
		setLanguage('');
		setIsChecked([]);
		setOrderBy('');
	};

	function areEqual(array1, array2) {
		if (array1.length === array2.length) {
			return array1.every((element) => {
				if (array2.includes(element)) {
					return true;
				}

				return false;
			});
		}

		return false;
	}

	useEffect(() => {
		if (!genres.length) dispatch(getGenres());

		if (!areEqual(filters.genres, isChecked))
			dispatch(saveFilterGenre(isChecked));

		if (!areEqual(filters.price, sliderValue))
			dispatch(saveFilterPrice(sliderValue));

		if (filters.language !== language)
			dispatch(saveFilterLanguage(language));

		if (filters.onsale !== onsale) dispatch(saveFilterOnSale(onsale));

		if (filters.order !== orderBy) dispatch(saveOrder(orderBy));

		dispatch(applyFilters());
		setCurrentPage(1);
	}, [
		dispatch,
		isChecked,
		sliderValue,
		orderBy,
		language,
		onsale,
		booksCopy,
	]);

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

			<Center>
				<Button
					rightIcon={<AiOutlineClear />}
					colorScheme='blue'
					variant='outline'
					onClick={(e) => handleReset(e)}>
					Clear Filters
				</Button>
			</Center>

			<Center>
				<Flex h='40' justify='space-between' alignItems='center'>
					<Stack spacing={0} direction='column' alignItems='center'>
						<Flex>Sort By: </Flex>
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

			<VStack justify={'center'} alignItems={'center'} w={'100%'}>
				<Flex
					justify='space-between'
					alignItems='center'
					flexDirection={'column'}>
					Genres:
					<Stack pt={'10px'} spacing={5} direction='column'>
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
					pt={'15px'}
					alignItems='center'
					justify='space-between'
					flexDirection={'column'}>
					Languages:
					<Stack
						w={'178px'}
						pt={'10px'}
						spacing={5}
						direction='column'>
						<Flex direction='column'>
							<Stack spacing={4}>
								<Checkbox
									onChange={(e) => handleLanguage(e)}
									value={'ENGLISH'}
									isChecked={language === 'ENGLISH'}>
									English
								</Checkbox>
								<Checkbox
									onChange={(e) => handleLanguage(e)}
									value={'ESPAÑOL'}
									isChecked={language === 'ESPAÑOL'}>
									Spanish
								</Checkbox>
							</Stack>
						</Flex>
					</Stack>
				</Flex>

				<Flex
					pt={'15px'}
					justify='space-between'
					alignItems='center'
					flexDirection={'column'}>
					Tags:
					<Stack
						w={'178px'}
						pt={'10px'}
						spacing={5}
						direction='column'>
						<Flex direction='column'>
							<Stack spacing={4}>
								<Checkbox
									onChange={(e) => handleOnSale(e)}
									value='onsale'
									isChecked={onsale}>
									On Sale Only
								</Checkbox>
							</Stack>
						</Flex>
					</Stack>
				</Flex>
			</VStack>

			<Flex
				justifyContent='center'
				alignItems='center'
				direction='column'
				h='32'>
				Price:
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
						mt='5'
						ml='-5'
						w='15'>
						{sliderValue[0]}$
					</RangeSliderMark>

					<RangeSliderMark
						value={sliderValue[1]}
						textAlign='center'
						mt='5'
						ml='-5'
						w='15'>
						{sliderValue[1]}$
					</RangeSliderMark>
					<RangeSliderThumb
						index={0}
						bg={useColorModeValue('gray.300', 'white')}
					/>
					<RangeSliderThumb
						index={1}
						bg={useColorModeValue('gray.300', 'white')}
					/>
				</RangeSlider>
			</Flex>
		</Stack>
	);
}

export default Filter;
