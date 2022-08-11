import { SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';

export const BookHolder = (props) => {
	const columns = React.useMemo(() => {
		const count = React.Children.toArray(props.children).filter(
			React.isValidElement
		).length;
		return {
			base: Math.min(1, count),
			md: Math.min(2, count),
			lg: Math.min(3, count),
			xl: Math.min(3, count),
			'2xl': Math.min(4, count),
		};
	}, [props.children]);
	return (
		<SimpleGrid
			justifyItems={'center'}
			columns={columns}
			columnGap={{
				base: '4',
				md: '6',
			}}
			rowGap={{
				base: '8',
				md: '10',
			}}
			{...props}
		/>
	);
};
