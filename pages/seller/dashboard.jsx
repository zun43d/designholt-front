import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthUserContext';

export default function Dashboard() {
	const router = useRouter();
	const { authUser, signUserOut } = useAuth();

	const handleSignOut = () => {
		signUserOut().then((res) => router.push('/'));
	};

	return (
		<div>
			<p>Dashboard</p>
			<button onClick={handleSignOut}>Sign Out</button>
		</div>
	);
}
