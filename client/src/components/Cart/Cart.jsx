import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
	const { cart } = useSelector((state) => state);
	return (
		<div>
			{cart.length > 0 ? (
				cart?.map((e) => {
					return (
						<div>
							<h4>{e.id}</h4>
							<h4>{e.title}</h4>
							<h4>{e.authors}</h4>
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
