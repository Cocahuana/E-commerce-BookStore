import { Box, Heading, Text, Button } from '@chakra-ui/react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link as BuenLink } from 'react-router-dom';
import { checkoutCart, getCart } from '../../redux/actions';
// Traigo la publisheable key de stripe para hacer los pagos (esta es la demo para practicar hacer pagos que no son reales)

const KEY =
	'pk_test_51LSdXMF5Vwy6vv6Z1ddeuf2axD3L8DrlxQSaSf4uWRsZZAXNtGGkrdJ5dpECnOZBbp8bc3VBXFcHuIoY5gIl29xV00jo5iLGip';
export default function Pay() {
	const dispatch = useDispatch();
	const history = useHistory();
	//Seteo el token (con el que se va a asociar la compra con la cuenta de stripe)
	const [stripeToken, setStripeToken] = useState(null);
	const { summary, userName, userProfilePicture, userId } = useSelector(
		(state) => state
	);

	// Como stripe sí o sí debe recibir un numero entero este debe multiplicarse por 100
	// Al mismo tiempo Stripe no acepta puntos, por lo que con Math.trunc le removemos decimales infinitos innecesarios
	let total = Math.trunc(summary.toFixed(2) * 100);

	//Seteo para usar luego el token (que se genera solo)
	const onToken = (token) => {
		setStripeToken(token);
	};

	useEffect(() => {
		// Le pego a la ruta que crea el pedido (no tiene nada que ver con la orden de compra)
		const makeRequest = async () => {
			try {
				const res = await axios.post('/payment/create', {
					//Le paso los datos que quiero usar. Los ultimos 2 digitos del amount son centavos.
					tokenId: stripeToken.id,
					amount: total,
				});
				history.push('/success', {
					data: res.data,
				});
				dispatch(checkoutCart(userId));
				console.log(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		stripeToken && makeRequest();
	}, [stripeToken]);

	return (
		<Box textAlign='center' py={10} px={6} pt='24' h='90vh'>
			<Heading
				display='inline-block'
				as='h2'
				size='2xl'
				bgGradient='linear(to-r, red.400, red.600)'
				backgroundClip='text'>
				PAY!!
			</Heading>
			{
				//StripeCheckout es un componente que trae por defecto Stripe. No se debe quitar
			}
			<StripeCheckout
				name={userName}
				image={userProfilePicture}
				description={`Your total is ${summary}`}
				amount={total}
				token={onToken}
				stripeKey={KEY}>
				<Button>
					<Text fontSize='18px' mt={3} mb={2}>
						HERE
					</Text>
				</Button>
			</StripeCheckout>
			<Text color={'gray.500'} mb={6}>
				This is a payment page
			</Text>
			<BuenLink to='/'>
				<Button
					colorScheme='red'
					bgGradient='linear(to-r, red.400, red.500, red.600)'
					color='white'
					variant='solid'>
					Back to BookStore
				</Button>
			</BuenLink>
		</Box>
	);
}
