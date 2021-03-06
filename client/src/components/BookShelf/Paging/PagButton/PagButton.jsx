import React from 'react';
import { chakra, Flex, Icon } from '@chakra-ui/react';
export const PagButton = (props) => {
	const activeStyle = {
		bg: 'gray.500',
		_dark: {
			bg: 'gray.500',
		},
		color: 'blue',
	};
	return (
		<chakra.button
			onClick={props.onClick}
			mx={1}
			px={4}
			py={2}
			rounded='md'
			bg='white'
			_dark={{
				bg: 'gray.700',
			}}
			color='gray.700'
			opacity={props.disabled && 0.6}
			_hover={!props.disabled && activeStyle}
			cursor={props.disabled && 'not-allowed'}
			{...(props.active && activeStyle)}
			display={
				props.p &&
				!props.active && {
					base: 'none',
					sm: 'block',
				}
			}>
			{props.children}
		</chakra.button>
	);
};
