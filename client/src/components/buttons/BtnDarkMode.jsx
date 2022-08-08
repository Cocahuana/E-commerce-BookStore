import React from 'react';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import { Button, useColorMode } from '@chakra-ui/react';
const BtnDarkMode = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Button
			aria-label='Toggle Color Mode'
			onClick={toggleColorMode}
			_focus={{ boxShadow: 'none' }}
			w='fit-content'>
			{colorMode === 'light' ? (
				<BsMoonStarsFill title='Toggle to dark mode' />
			) : (
				<BsSun title='Toggle to light mode' />
			)}
		</Button>
	);
};

export default BtnDarkMode;
