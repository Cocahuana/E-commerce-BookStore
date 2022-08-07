import React from 'react';
import { Link as BuenLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
const BtnSignUp = () => {
	return (
		<BuenLink to='/register'>
			<Button
				as={'a'}
				display={{
					base: 'none',
					md: 'inline-flex',
				}}
				fontSize={'sm'}
				fontWeight={600}
				color={'white'}
				bg={'brand.pepe'}
				_hover={{
					bg: '#2E3532',
				}}>
				Sign Up
			</Button>
		</BuenLink>
	);
};

export default BtnSignUp;
