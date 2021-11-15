import { useState, useEffect } from 'react';
import {
	auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from './firebase';

const formatAuthUser = (user) => ({
	uid: user.uid,
	email: user.email,
	token: user.accessToken,
});

export default function useFirebaseAuth() {
	const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const authStateChanged = async (authState) => {
		if (!authState) {
			setAuthUser(null);
			setLoading(false);
			return;
		}

		setLoading(true);
		var formattedUser = formatAuthUser(authState);
		setAuthUser(formattedUser);
		setLoading(false);
	};

	const clear = () => {
		setAuthUser(null);
		setLoading(true);
	};

	const signInWithEmail = (email, pass) =>
		signInWithEmailAndPassword(auth, email, pass);

	const createUserWithEmail = (email, pass) =>
		createUserWithEmailAndPassword(auth, email, pass);

	const signUserOut = () => signOut(auth);

	// listen for Firebase state change
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, authStateChanged);
		return () => unsubscribe();
	}, []);

	return {
		authUser,
		loading,
		signInWithEmail,
		createUserWithEmail,
		signUserOut,
	};
}
