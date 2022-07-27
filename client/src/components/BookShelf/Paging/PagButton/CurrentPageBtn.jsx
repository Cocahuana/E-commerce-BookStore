import React from 'react';
import { chakra, Flex, Icon } from '@chakra-ui/react';
export const CurrentPagBtn = (props) => {
	return (
		<chakra.button
			onClick={props.onClick}
			mx={1}
			px={4}
			py={2}
			rounded='md'
			bg='brand.pepeoscuro'
			_dark={{
				bg: 'gray.700',
			}}
			color='white'
			opacity={props.disabled && 0.6}
			cursor={props.disabled && 'not-allowed'}
			{...props.active}
			display={
				props.p &&
				!props.active && {
					base: 'none',
					sm: 'block',
				}
			}
		>
			{props.children}
		</chakra.button>
	);
};
