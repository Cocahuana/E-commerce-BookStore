import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { userSignOut } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';

function signout() {
	//SIGN OUT BUTTON, DISPATCHS THE ACTION THAT CLEARS LOCALSTORAGE AND SETS ISSIGNEDIN STATE IN FALSE
	const dispatch = useDispatch();
	const history = useHistory();

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(userSignOut());
		Swal.fire(
			'Sign Out',
			'You have been signed out successfully!',
			'success'
		);
		history.push('/');
		//localStorage.clear();
	};
	return (
		<Button
			bg={useColorModeValue('red.500', 'red.400')}
			w={'50%'}
			onClick={(e) => handleClick(e)}
			display={{ base: 'none', md: 'inline-flex' }}
			fontSize={'sm'}
			fontWeight={600}
			color={'black'}
			_hover={{
				fontSize: 'md',
				bg: 'lightgray',
			}}>
			{' '}
			Sign out
		</Button>
	);
}

export default signout;
