import React from 'react';
import { Link as BuenLink } from 'react-router-dom';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Switch,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	useColorMode,
	Center,
	HStack,
	Menu,
	MenuButton,
	Avatar,
	MenuList,
	MenuItem,
	MenuDivider,
	Highlight,
} from '@chakra-ui/react';
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
