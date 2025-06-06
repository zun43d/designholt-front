import { useState, useEffect } from 'react';
import {
	auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
	sendEmailVerification,
} from './firebase';
import { createUser, getUserFromSanity } from './sanityDb';

const formatAuthUser = (user, sanityUser) => ({
	uid: user.uid,
	email: user.email,
	token: user.accessToken,
	photoUrl: sanityUser?.photoUrl || undefined,
	name: sanityUser?.fullName,
	isVerified: user.emailVerified,
});

export default function useFirebaseAuth() {
	const [fireUser, setFireUser] = useState(null);
	const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createNewUser = async ({ uid, email }, userData) =>
		await createUser(uid, email, userData);

	const handleUser = async (rawUser) => {
		if (rawUser) {
			setLoading(true);
			setFireUser(rawUser);
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
			setFireUser(null);
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

	const sendVerificationEmail = async (user) =>
		sendEmailVerification(user || auth.currentUser, {
			url: 'https://www.designholt.com/seller/dashboard/portfolio',
		});

	const signInWithEmail = (email, pass) =>
		signInWithEmailAndPassword(auth, email, pass);

	const createUserWithEmail = ({ email, password, ...userData }) =>
		createUserWithEmailAndPassword(auth, email, password)
			.then((res) => {
				createNewUser(res.user, userData).then(() => {
					sendVerificationEmail(res.user);
				});
			})
			.catch((err) => err.message);

	const signUserOut = () => signOut(auth);

	const forgotPassword = async (email) =>
		await sendPasswordResetEmail(auth, email, {
			url: 'https://www.designholt.com/seller/login',
		});

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
		forgotPassword,
		sendVerificationEmail,
	};
}
