import { createContext, useContext } from 'react';
import useFirebaseAuth from '../lib/useFirebaseAuth';

const authContext = createContext({
	authUser: null,
	loading: true,
	signInWithEmail: async () => {},
	createUserWithEmail: async () => {},
	signOut: async () => {},
});

export default function AuthProvider({ children }) {
	const auth = useFirebaseAuth();

	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
