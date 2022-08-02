import { Icon, IconButton, LightMode } from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { userGetFavorite } from '../../../../redux/actions';

export const FavouriteButton = (props) => {
	const { id, userId, isFav } = props;
	const { allFavourites } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [alreadyFav, setAlreadyFav] = useState(false);

	// useEffect(() => {
	// 	allFavourites.map((e) => {
	// 		if (e.id === id) setAlreadyFav(true);
	// 	});
	// },[JSON.stringify(allFavourites)])

	return (
		<LightMode>
			{isFav === true ? (
				<IconButton
					isRound
					bg='white'
					color='gray.900'
					size='sm'
					_hover={{
						transform: 'scale(1.1)',
					}}
					sx={{
						':hover > svg': {
							transform: 'scale(1.1)',
						},
					}}
					transition='all 0.15s ease'
					icon={
						<Icon
							as={FiHeart}
							fill='red.400'
							transition='all 0.15s ease'
						/>
					}
					boxShadow='base'
					{...props}
				/>
			) : (
				<IconButton
					isRound
					bg='white'
					color='gray.900'
					size='sm'
					_hover={{
						transform: 'scale(1.1)',
					}}
					sx={{
						':hover > svg': {
							transform: 'scale(1.1)',
						},
					}}
					transition='all 0.15s ease'
					icon={<Icon as={FiHeart} transition='all 0.15s ease' />}
					boxShadow='base'
					{...props}
				/>
			)}
		</LightMode>
	);
};
