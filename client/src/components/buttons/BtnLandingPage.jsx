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
const BtnLandingPage = () => {
	return (
		<BuenLink to='/'>
			<Text
				textAlign={useBreakpointValue({
					base: 'center',
					md: 'left',
				})}
				color={useColorModeValue('gray.800', 'white')}>
				<Highlight
					query={'E-Book'}
					styles={{
						px: '1',
						py: '1',
						rounded: 'xl',
						bg: 'brand.pepe',
						color: 'white',
					}}>
					E-BookStore
				</Highlight>
			</Text>
		</BuenLink>
	);
};

export default BtnLandingPage;
