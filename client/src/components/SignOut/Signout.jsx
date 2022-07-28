import React from 'react';
import { Button } from '@chakra-ui/react';
import { userSignOut } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

function signout() {
	//SIGN OUT BUTTON, DISPATCHS THE ACTION THAT CLEARS LOCALSTORAGE AND SETS ISSIGNEDIN STATE IN FALSE
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(userSignOut());
		//localStorage.clear();
		Swal.fire(
			'Sign Out',
			'You have been signed out successfully!',
			'success'
		);
	};
	return (
		<Button
			bg={'red.500'}
			w={'50%'}
			onClick={handleClick}
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
