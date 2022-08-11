import React from 'react';
import { Link as BuenLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
const BtnAdminDashboard = () => {
	return (
		<BuenLink to='/adminDashboard'>
			<Button as={'a'} fontSize={'sm'} fontWeight={400}>
				Admin
			</Button>
		</BuenLink>
	);
};

export default BtnAdminDashboard;
