import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { delCart } from '../../../redux/actions';
import { Button } from '@chakra-ui/react';
import {
	Box,
	HStack,
	Icon,
	Image,
	Link,
	Stack,
	Text,
	useColorModeValue as mode,
} from '@chakra-ui/react';

const Cart = () => {
	const { cart } = useSelector((state) => state);
	const [sum, setSum] = useState([]);
	const dispatch = useDispatch();

	const handleOnDelete = (id) => {
		dispatch(delCart(id));
	};
	return (
		<div>
			{cart.length > 0 ? (
				cart?.map((e) => {
					return (
						<div>
							<Button onClick={() => handleOnDelete(e.id)}>
								X
							</Button>
							<Stack direction='row' spacing='5' width='full'>
								<Image
									rounded='lg'
									width='100px'
									height='100px'
									fit='cover'
									src={e.image}
									alt={e.title}
									draggable='false'
									loading='lazy'
								/>
								<Box pt='4'>
									<Stack spacing='0.5'>
										<Text fontWeight='medium'>
											{e.title}
										</Text>
										<Text fontWeight='medium'>
											{e.price}
											{e.currency}$
										</Text>
									</Stack>
									{sum}
								</Box>
							</Stack>
						</div>
					);
				})
			) : (
				<h3>No hay nada en el carrito!</h3>
			)}
		</div>
	);
};

export default Cart;
