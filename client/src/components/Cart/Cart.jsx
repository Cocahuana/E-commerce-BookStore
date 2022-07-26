import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { delCart } from '../../../redux/actions';
import { Button } from '@chakra-ui/react';

const Cart = () => {
	const { cart } = useSelector((state) => state);
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
							<h4>{e.id}</h4>
							<h4>{e.title}</h4>
							<h4>{e.authors}</h4>
							<h4>{e.price}</h4>
							<Button onClick={() => handleOnDelete(e.id)}>
								X
							</Button>
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
