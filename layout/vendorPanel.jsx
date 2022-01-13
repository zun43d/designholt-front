import { useState } from 'react';
import firebaseAuth from '@/lib/useFirebaseAuth';
import { useAuth } from '@/context/AuthUserContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/layout/layout';
import VendorNav from '@/components/VendorNav';
import { Box, Heading, Link, Text, useToast } from '@chakra-ui/react';
import { Button } from '@/components/uiComponents';

export default function VendorPanel({ children, ...rest }) {
	const { authUser, loading } = useAuth();
	const toast = useToast();

	const [isLoading, setIsLoading] = useState(false);
	const [isEmailSent, setIsEmailSent] = useState(false);
	const { sendVerificationEmail } = firebaseAuth();

	const resendEmail = () => {
		setIsLoading(true);
		sendVerificationEmail()
			.then((res) => {
				setIsEmailSent(true);
				setIsLoading(false);
				toast({
					title: 'Email successfully sent',
					description: 'Please check your email to verify your account',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			})
			.catch((err) => {
				setIsLoading(false);
				toast({
					title: 'Error! Try after some moment.',
					description: err.message,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			});
	};

	const renderChildren = (children, rest) => (
		<>
			<VendorNav />
			<Box {...rest}>{children}</Box>
		</>
	);

	const renderNotVerified = () => (
		<Box
			maxW="6xl"
			mx="auto"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
		>
			<Box
				fontSize="xl"
				fontWeight="semibold"
				textAlign="center"
				// w="96"
				mt="20"
				py="5"
				px="8"
				border="1px"
				borderColor="red.200"
			>
				<Heading size="md" color="red.700" pb="3">
					Kindly verify your email address.
				</Heading>
				<Text fontSize="sm">
					We&apos;ve sent you an email with a verification link. Verify yourself
					to access furthur!
				</Text>
			</Box>
			<br />
			<Text fontSize="sm">
				Haven&apos;t received the verification email yet?{' '}
			</Text>
			<Button
				bg="transparent"
				size="sm"
				color="purple.500"
				_hover={{ backgroundColor: 'none', textDecoration: 'underline' }}
				isLoading={isLoading}
				disabled={isEmailSent}
				onClick={resendEmail}
			>
				Resend email
			</Button>
		</Box>
	);

	return (
		<Layout noFoot={true}>
			<ProtectedRoute>
				{!loading && authUser?.isVerified
					? renderChildren(children, rest)
					: renderNotVerified()}
			</ProtectedRoute>
		</Layout>
	);
}
