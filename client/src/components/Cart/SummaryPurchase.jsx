import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { PriceTag } from '../BookShelf/BookHolder/Book/PriceTag';

export function formatPrice(value, opts = {}) {
	const { locale = 'en-US', currency = 'USD' } = opts;
	const formatter = new Intl.NumberFormat(locale, {
		currency,
		style: 'currency',
		maximumFractionDigits: 2,
	});
	return formatter.format(value);
}

const SummaryPurchase = () => {
	let { summary } = useSelector((state) => state);

	let summaryFormatted = formatPrice(summary, 'USD');

	return (
		<Box>
			<Divider py={'1'}></Divider>
			<Box pt={'4'}>
				{summary > 0 ? (
					<Flex justify={'space-between'}>
						<Text fontSize={'md'} fontWeight={'bold'}>
							Total:
						</Text>

						<PriceTag price={summaryFormatted} currency={'USD'} />
					</Flex>
				) : (
					<div></div>
				)}
			</Box>
		</Box>
	);
};

export default SummaryPurchase;
