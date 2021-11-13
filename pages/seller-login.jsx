import Head from 'next/head';
import Layout, { siteTitle } from '@/layout/layout';
import {
	Box,
	Text,
	Heading,
	FormControl,
	FormErrorMessage,
	Spacer,
	// InputGroup,
	// InputLeftElement,
	Stack,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import {
	Button,
	FormLabel,
	Input,
	InputGroup,
} from '@/components/uiComponents';

const handleLogin = (e) => {
	e.preventDefault();
};

export default function SellerLogin() {
	return (
		<Layout>
			<Head>
				<title>Seller Login | {siteTitle}</title>
			</Head>

			<Box
				h="xl"
				mx="5"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Box>
					<Heading as="h2">Seller login panel</Heading>
					<Text mt="1" color="gray.500">
						Login to make yourself motivated!
					</Text>
					<Stack as="form" mt="10" w="sm" maxW="xl" spacing={3}>
						<FormControl id="email">
							<FormLabel>Email</FormLabel>
							<InputGroup
								icon={<EmailIcon color="gray.300" w="5" h="5" />}
								placeholder="Enter your email"
								type="email"
							/>
						</FormControl>

						<FormControl id="pass">
							<FormLabel>Password</FormLabel>
							<InputGroup
								icon={<LockIcon color="gray.300" w="5" h="5" />}
								placeholder="Enter your password"
								type="password"
							/>
						</FormControl>
						<Spacer />
						<Button onClick={handleLogin} type="submit" colorScheme="purple">
							Log In
						</Button>
					</Stack>
				</Box>
			</Box>
		</Layout>
	);
}
