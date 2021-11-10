import { useState } from 'react';
import { Text, Button, Spinner, Center, Input } from '@chakra-ui/react';
import { useAuth } from '@/context/AuthUserContext';

export default function Home() {
	const { authUser, loading, signInWithEmail, signUserOut } = useAuth();
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	if (loading) {
		return (
			<Center w="100vw" h="100vh">
				<Spinner />
			</Center>
		);
	}

	if (authUser) {
		return (
			<Center w="100vw" h="100vh" flexDir="column">
				Logged In
				<Button my="5" onClick={signUserOut}>
					Log Out
				</Button>
			</Center>
		);
	}

	const handleLogin = (e) => {
		e.preventDefault();
		signInWithEmail(email, pass).then((user) => {
			console.log(user);
			console.log('Successfully logged in to the firebase!');
		});
	};

	return (
		<Center w="100vw" h="100vh" display="flex" flexDir="column">
			<Text py="5">Login to DesignHolt</Text>
			<label>Email</label>
			<Input type="email" onChange={(e) => setEmail(e.target.value)} />
			<label>Pass</label>
			<Input type="password" onChange={(e) => setPass(e.target.value)} />
			<Button
				type="submit"
				onClick={handleLogin}
				variant="ghost"
				colorScheme="purple"
			>
				Log in
			</Button>
		</Center>
	);
}
