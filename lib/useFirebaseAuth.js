import { useState, useEffect } from 'react';
import {
	auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from './firebase';
import { createUser, getUserFromSanity } from './sanityDb';

const formatAuthUser = (user, sanityUser) => ({
	uid: user.uid,
	email: user.email,
	token: user.accessToken,
	photoUrl: sanityUser.photoUrl,
	name: sanityUser.fullName,
});

export default function useFirebaseAuth() {
	const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createNewUser = async ({ uid, email }, userData) =>
		await createUser(uid, email, userData);

	const handleUser = async (rawUser) => {
		if (rawUser) {
			setLoading(true);
			const { uid, email } = rawUser;
			const sanityUser = await getUserFromSanity(uid, email);

			const user = formatAuthUser(rawUser, sanityUser);
			setAuthUser(user);
			setLoading(false);

			return user;
		} else {
			setLoading(false);
			setAuthUser(false);
			return false;
		}
	};

	const authStateChanged = async (authState) => {
		if (!authState) {
			setAuthUser(null);
			setLoading(false);
			return;
		}

		handleUser(authState);

		// setLoading(true);
		// let formattedUser = formatAuthUser(authState);
		// setAuthUser(formattedUser);
		// setLoading(false);
	};

	const clear = () => {
		setAuthUser(null);
		setLoading(true);
	};

	const signInWithEmail = (email, pass) =>
		signInWithEmailAndPassword(auth, email, pass);

	const createUserWithEmail = ({ email, password, ...userData }) =>
		createUserWithEmailAndPassword(auth, email, password)
			.then((res) => createNewUser(res.user, userData))
			.catch((err) => err.message);

	const signUserOut = () => signOut(auth);

	// listen for Firebase state change
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, authStateChanged);
		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		authUser,
		loading,
		signInWithEmail,
		createUserWithEmail,
		signUserOut,
	};
}
