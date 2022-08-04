import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link as BuenLink } from 'react-router-dom';
import { PriceTag } from '../BookShelf/BookHolder/Book/PriceTag';
import Cart from '../Cart/Cart';
import SummaryPurchase from '../Cart/SummaryPurchase';

import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Image,
	Checkbox,
	tokenToCSSVar,
} from '@chakra-ui/react';

export default function Purchase() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { cart, summary } = useSelector((state) => state);
	console.log(cart);
	console.log(summary);

	return (
		<Box>
			<Cart />
			<BuenLink to='/pay'>
				<Button>Continue purchase</Button>
			</BuenLink>
		</Box>
	);
}
