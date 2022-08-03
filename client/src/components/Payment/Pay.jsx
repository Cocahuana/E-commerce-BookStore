import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useState, useEffect } from 'react';
// Traigo la publisheable key de stripe para hacer los pagos (esta es la demo para practicar hacer pagos que no son reales)

const KEY =
	'pk_test_51LSdXMF5Vwy6vv6Z1ddeuf2axD3L8DrlxQSaSf4uWRsZZAXNtGGkrdJ5dpECnOZBbp8bc3VBXFcHuIoY5gIl29xV00jo5iLGip';
export default function Pay() {
	//Seteo el token (con el que se va a asociar la compra con la cuenta de stripe)
	const [stripeToken, setStripeToken] = useState(null);

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
					amount: 5000,
				});
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
				name='cocahuana'
				image='https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf21c2ee30c00121a/627cbc382b67610d5673246f/GettyImages-1347553871.jpg'
				description='Your total is $50'
				amount={5000}
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
			<Link to='/'>
				<Button
					colorScheme='red'
					bgGradient='linear(to-r, red.400, red.500, red.600)'
					color='white'
					variant='solid'>
					Back to BookStore
				</Button>
			</Link>
		</Box>
	);
}
