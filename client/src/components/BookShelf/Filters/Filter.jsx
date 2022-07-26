import {
	Avatar,
	Box,
	Button,
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
	VStack,
} from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import {
	filterBookGenre,
	getGenres,
	orderBook,
	getBooks,
	slideprice,
	saveChecked,
} from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function Filter({ setCurrentPage }) {
	const dispatch = useDispatch();

	const { genres, booksCopy, isBoxChecked } = useSelector((state) => state);

	const [min, setMin] = useState(0)
	const [max, setMax] = useState(0)
	const [defaultslidevalue, setDefaultslidevalue] = useState([0, 0]);
	const [isChecked, setIsChecked] = useState(isBoxChecked);

	let prices = booksCopy.map((e) => {
		return e.price;
	});

	useEffect(() => {
		let Max = prices ? Math.max(...prices) : 'Cargando';
		let Min = prices ? Math.min(...prices) : 'Cargando';
		setMin(Min)
		setMax(Max)
		setDefaultslidevalue([Min, Max])
	},[booksCopy])

	const handleSelect = (e) => {
		e.preventDefault();
		if (e.target.checked) {
			if (!isChecked.includes(e.target.value)) {
				setIsChecked([...isChecked, e.target.value]);
			}
		} else {
			setIsChecked(
				isChecked.filter((checkBox) => checkBox !== e.target.value)
			);
			dispatch(filterBookGenre(isChecked));
		}
	};
	const handleOrderBy = (e) => {
		e.preventDefault();
		dispatch(orderBook(e.target.value));
	};

	const handleslidechange = (e) => {
		dispatch(slideprice(e));
		setMin(e[0])
		setMax(e[1])
		console.log(e)
	};

	useEffect(() => {
		dispatch(getGenres());
		dispatch(filterBookGenre(isChecked));
		setCurrentPage(1);
		return () => {
			dispatch(saveChecked(isChecked));
		};
	}, [dispatch, isChecked]);

	return (
		<Stack
			boxShadow={useColorModeValue(
				'2px 6px 8px rgba(160, 174, 192, 0.6)',
				'2px 6px 8px rgba(9, 17, 28, 0.9)'
			)}
			bg={useColorModeValue('whiteAlpha.300', 'gray.800')}
			rounded='md'
			overflow='hidden'>
			<Flex
				justify='center'
				alignItems='center'
				_hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
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
			<Flex
				justify='space-between'
				alignItems='center'
				_hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}>
				<Stack
					spacing={5}
					direction='column'
					alignItems='center'
					pl='2'>
					<Flex>Generos</Flex>
					<Flex direction='column'>
						<Stack spacing={4}>
							{genres.map((p, g) => (
								<Checkbox
									onChange={(e) => handleSelect(e)}
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
				_hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
				h='32'>
				Price
				<RangeSlider
					w='70%'
					step={50}
					min={defaultslidevalue[0]}
					max={defaultslidevalue[1]}
					aria-label={['min', 'max']}
					defaultValue={[defaultslidevalue[0], defaultslidevalue[1]]}
					onChange={(val) => handleslidechange(val)}>
					<RangeSliderTrack bg='blue.100'>
						<RangeSliderFilledTrack />
					</RangeSliderTrack>
					<RangeSliderMark
						value={min}
						textAlign='center'
						bg='blue.500'
						color='white'
						mt='5'
						ml='-5'
						w='15'>
						{min}$
					</RangeSliderMark>

					<RangeSliderMark
						value={max}
						textAlign='center'
						bg='blue.500'
						color='white'
						mt='5'
						ml='-8'
						w='15'>
						{max}$
					</RangeSliderMark>
					<RangeSliderThumb index={0} />
					<RangeSliderThumb index={1} />
				</RangeSlider>
			</Flex>

			<Flex
				h='40'
				justify='space-between'
				alignItems='center'
				_hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}>
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
							<option value='highToLow'>
								Rating High to Low
							</option>
							<option value='lowToHi'>Rating Low to High</option>
						</Select>
					</Flex>
				</Stack>
			</Flex>
		</Stack>
	);
}

export default Filter;
