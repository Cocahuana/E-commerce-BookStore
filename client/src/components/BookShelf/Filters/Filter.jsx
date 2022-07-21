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
import React, { Fragment } from 'react';
import { useState } from 'react';

function Filter() {
	const [sliderValue, setSliderValue] = useState([30, 80]);
	return (
		<Stack
			boxShadow={useColorModeValue(
				'2px 6px 8px rgba(160, 174, 192, 0.6)',
				'2px 6px 8px rgba(9, 17, 28, 0.9)'
			)}
			bg={useColorModeValue('whiteAlpha.300', 'gray.800')}
			rounded="md"
			overflow="hidden"
		>
			<Flex
				justify="center"
				alignItems="center"
				_hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
				h="32"
			>
				<Text
					fontWeight="semibold"
					fontSize={{
						base: '2xl',
						md: 'md',
						lg: '2xl',
					}}
				>
					Filters
				</Text>
			</Flex>
			<Flex
				justify="space-between"
				alignItems="center"
				_hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
			>
				<Stack spacing={5} direction="column" alignItems="center" pl="2">
					<Flex>Generos</Flex>
					<Flex direction="column">
						<Stack spacing={4}>
							<Checkbox>Genero</Checkbox>
							<Checkbox>Genero1</Checkbox>
							<Checkbox>Genero1</Checkbox>
							<Checkbox>Genero1</Checkbox>
							<Checkbox>Genero1</Checkbox>
							<Checkbox>Genero1</Checkbox>
						</Stack>
					</Flex>
				</Stack>
			</Flex>

			<Flex
				justifyContent="center"
				alignItems="center"
				direction="column"
				_hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
				h="32"
			>
				Price
				<RangeSlider
					aria-label={['min', 'max']}
					defaultValue={[30, 80]}
					onChange={(val) => setSliderValue(val)}
				>
					<RangeSliderTrack>
						<RangeSliderFilledTrack />
					</RangeSliderTrack>

					<RangeSliderMark
						value={sliderValue[1]}
						textAlign="center"
						bg="blue.500"
						color="white"
						mt="-10"
						ml="-5"
						w="12"
					>
						{sliderValue[1]}$
					</RangeSliderMark>
					<RangeSliderThumb index={0} />
					<RangeSliderThumb index={1} />
				</RangeSlider>
			</Flex>

			<Flex
				h="40"
				justify="space-between"
				alignItems="center"
				_hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
			>
				<Stack spacing={0} direction="column" alignItems="center">
					<Flex>Rating</Flex>
					<Flex direction="column" p={2}>
						<Select variant="filled" placeholder="rating">
							<option value="option1">Option 1</option>
							<option value="option2">Option 2</option>
							<option value="option3">Option 3</option>
						</Select>
					</Flex>
				</Stack>
			</Flex>
		</Stack>
	);
}

export default Filter;
