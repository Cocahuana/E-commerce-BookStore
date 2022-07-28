import React from 'react';
import { Button } from '@chakra-ui/react';
import { userSignOut } from '../../redux/actions';
import { useDispatch } from 'react-redux';

function signout() {
	//SIGN OUT BUTTON, DISPATCHS THE ACTION THAT CLEARS LOCALSTORAGE AND SETS ISSIGNEDIN STATE IN FALSE
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(userSignOut());
	};
	return (
		<Button bg={'red.400'} w={'50%'} onClick={handleClick}>
			Sign out
		</Button>
	);
}

export default signout;
