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
		<div>
			{summary > 0 ? (
				<div>
					Total:
					<PriceTag price={summaryFormatted} currency={'USD'} />
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default SummaryPurchase;
