import { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthUserContext';
import { useForm } from 'react-hook-form';

import Layout, { siteTitle } from '@/layout/layout';
import {
	Box,
	Text,
	Heading,
	FormControl,
	FormErrorMessage,
	Spacer,
	Stack,
	useToast,
	Center,
	Spinner,
} from '@chakra-ui/react';
import {
	Button,
	FormLabel,
	Input,
	InputGroup,
	Link,
} from '@/components/uiComponents';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';

export default function SellerLogin() {
	const { authUser, loading, signInWithEmail } = useAuth();
	const router = useRouter();
	const toast = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	useEffect(() => {
		if (!loading && authUser) {
			router.push('/seller/dashboard/portfolio');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser, loading]);

	const handleLogin = async (data) => {
		try {
			const res = await signInWithEmail(data.email, data.password);
			res &&
				toast({
					title: 'Log in success',
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
		} catch (error) {
			toast({
				title: 'No such user found!',
				description: 'Try to login again with proper account details',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	if (!loading && !authUser) {
		return (
			<Layout maxW="8xl" px={[4, 8, 8, 8, 4]}>
				<Head>
					<title>Seller Login | {siteTitle}</title>
				</Head>

				<Box
					h="xl"
					mx="5"
					my="16"
					display="flex"
					justifyContent="space-around"
					alignItems="center"
				>
					<Box maxW="xl" mr="5">
						<Heading>Welcome Back!</Heading>
						<br />
						<Text color="gray.500">
							&quot;Creativity is inventing, experimenting, growing, taking
							risks, breaking rules, making mistakes, and having fun.&quot;
							<br />
							<Box mt="2">- Mary Lou Cook</Box>
						</Text>
					</Box>

					<Box>
						<Heading as="h2">Seller login panel</Heading>
						{/* <Text mt="1" color="gray.500">
							Login to make yourself motivated!
						</Text> */}
						<Stack
							as="form"
							name="seller-login"
							mt="10"
							w="sm"
							maxW="xl"
							spacing={3}
							onSubmit={handleSubmit(handleLogin)}
						>
							<FormControl id="email" isInvalid={errors.email}>
								<FormLabel>Email</FormLabel>
								<InputGroup
									icon={<EmailIcon color="gray.300" w="5" h="5" />}
									placeholder="Enter your email"
									type="email"
									{...register('email', {
										required: 'You email is required to login',
										pattern: {
											value:
												/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											message: 'Enter a valid email',
										},
									})}
								/>

								<FormErrorMessage>
									{errors.email && errors.email.message}
								</FormErrorMessage>
							</FormControl>

							<FormControl id="pass" isInvalid={errors.password}>
								<FormLabel>Password</FormLabel>
								<InputGroup
									icon={<LockIcon color="gray.300" w="5" h="5" />}
									placeholder="Enter your password"
									type="password"
									{...register('password', {
										required: 'Enter your password',
										minLength: {
											value: 8,
											message: 'Password must be 8 character long',
										},
									})}
								/>
								<FormErrorMessage>
									{errors.password && errors.password.message}
								</FormErrorMessage>
							</FormControl>
							<Spacer />
							<Button
								type="submit"
								colorScheme="purple"
								isLoading={isSubmitting}
							>
								Log In
							</Button>
							<br />
							<NextLink href="/seller/signup" passHref>
								<Link color="purple.500" fontSize="sm" w="max-content">
									Sign up as a seller
								</Link>
							</NextLink>
							<NextLink href="/seller/forgot-password" passHref>
								<Link color="purple.500" fontSize="sm" w="max-content">
									Can&apos;t remember your password?
								</Link>
							</NextLink>
						</Stack>
					</Box>
				</Box>
			</Layout>
		);
	} else if (!loading && authUser) {
		return <Text>Redirecting...</Text>;
	}

	return (
		<Layout>
			<Center h="70vh">
				<Spinner color="purple.500" />
			</Center>
		</Layout>
	);
}
