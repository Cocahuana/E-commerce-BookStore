import React from 'react';
import { Link as BuenLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
const BtnSignIn = () => {
	return (
		<BuenLink to='/login'>
			<Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'}>
				Sign In
			</Button>
		</BuenLink>
	);
};

export default BtnSignIn;
