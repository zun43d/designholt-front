import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthUserContext';
import { Input, Label, Button, Center } from '@chakra-ui/react';

export default function NewUser() {
	const { createUserWithEmail, signOut } = useAuth();
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	const handleCreate = () => {
		createUserWithEmail(email, pass)
			.then((user) => {
				console.log(user);
				console.log('A new user was created!');
				router.push('/');
			})
			.catch((err) => {
				console.log('Shit! Maybe I did something wrong or firebase fucked up!');
			});
	};

	return (
		<Center w="100vw" h="100vh" flexDir="column">
			<Input type="email" onChange={(e) => setEmail(e.target.value)} />
			<Input type="password" onChange={(e) => setPass(e.target.value)} />
			<Button onClick={(e) => email && pass && handleCreate()}>
				Create User
			</Button>
		</Center>
	);
}
