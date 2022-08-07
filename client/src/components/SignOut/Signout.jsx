import React from 'react';
import { Button, useColorModeValue, Stack } from '@chakra-ui/react';
import { userSignOut } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
import { UserAuth } from '../firebase/context';

function Signout(props) {
	//SIGN OUT BUTTON, DISPATCHS THE ACTION THAT CLEARS LOCALSTORAGE AND SETS ISSIGNEDIN STATE IN FALSE
	const dispatch = useDispatch();
	const history = useHistory();
	const { logOut } = UserAuth();

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(userSignOut());
		logOut();
		$crisp.push(['do', 'session:reset']);
		Swal.fire(
			'Sign Out',
			'You have been signed out successfully!',
			'success'
		);
		history.push('/');
		//localStorage.clear();
	};
	return (
		<Stack align={'center'} w={props.wid}>
			<Button
				// bg={useColorModeValue('red.500', 'red.400')}
				colorScheme={'twitter'}
				w={props.wid}
				onClick={(e) => handleClick(e)}
				display={{ md: 'inline-flex' }}
				fontSize={'sm'}
				fontWeight={600}
				color={useColorModeValue('gray.700', 'white')}
				// _hover={{
				// 	bg: 'gray.200',
				// }}
			>
				{' '}
				Sign out
			</Button>
		</Stack>
	);
}

export default Signout;
