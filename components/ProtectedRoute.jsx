import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthUserContext';
import { Center, Spinner } from '@chakra-ui/react';

export default function ProtectedRoute({ children }) {
	const { authUser, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !authUser) {
			router.push('/seller/login');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser, loading]);

	if (!loading && authUser) {
		return children;
	}

	return (
		<Center h="36">
			<Spinner />
		</Center>
	);
}
