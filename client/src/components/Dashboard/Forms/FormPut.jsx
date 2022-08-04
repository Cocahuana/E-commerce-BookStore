import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, resetDetails } from '../../../redux/actions';

function FormPut(props) {
	const { id } = props.match.params;
	const dispatch = useDispatch();

	const { details } = useSelector((state) => state);

	useEffect(() => {
		dispatch(getDetails(id));

		return () => {
			dispatch(resetDetails());
		};
	}, [dispatch]);

	return <div>FormPut</div>;
}

export default FormPut;
