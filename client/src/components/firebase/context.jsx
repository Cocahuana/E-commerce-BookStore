import { useContext, createContext, useEffect, useState, useId } from 'react';
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { addGoogleUser } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const dispatch = useDispatch();

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		// si no tengo id entonces hace el pop up
		signInWithPopup(auth, provider);
	};
	if (user !== null && Object.keys(user).length !== 0) {
		dispatch(addGoogleUser(user));
	}
	//cuando hago el log out se me tiene q vaciar el local state de user.

	const logOut = () => {
		signOut(auth);
	};

	//cada vez q user sea distinto de null despachar accion

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	});

	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
