import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '@/context/AuthUserContext';
import Layout, { siteTitle } from '@/layout/layout';
import { countries } from '@/lib/allCountry';
import {
	Box,
	Heading,
	Text,
	Stack,
	FormControl,
	Spacer,
} from '@chakra-ui/react';
import {
	FormLabel,
	Input,
	Button,
	Radio,
	RadioGroup,
	Select,
} from '@/components/uiComponents';
import { useForm } from 'react-hook-form';

export default function SignUp() {
	const router = useRouter();
	const { loading, authUser, createUserWithEmail } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm();

	const password = watch('password', '');

	useEffect(() => {
		if (!loading && authUser) {
			router.push('/seller/login');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser, loading]);

	const handleSignup = async (values) => {
		const res = await createUserWithEmail(values).then((res) => {
			router.push('/seller/dashboard/portfolio');
		});

		return res;
	};

	if (!loading && !authUser) {
		return (
			<Layout maxW="8xl" px={[4, 8, 8, 8, 4]}>
				<Head>
					<title>Seller Signup | {siteTitle}</title>
				</Head>

				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mx="10"
					my="20"
				>
					<Box w="xl">
						<Heading>Register as a seller</Heading>
						<Text color="gray.500">
							Join us and start your creative earning today.
						</Text>
						<Stack
							as="form"
							name="seller-singup"
							onSubmit={handleSubmit(handleSignup)}
							spacing={4}
							mt="10"
						>
							<FormControl id="fullName">
								<FormLabel>Full Name</FormLabel>
								<Input
									type="text"
									placeholder="Enter your full legal name"
									{...register('fullName', {
										required: 'Please enter your fullname',
										// minLength: {
										// 	value: 2,
										// 	message: 'Your name should at least be two characters long',
										// },
									})}
								/>
							</FormControl>

							<FormControl id="signup-email">
								<FormLabel>Email</FormLabel>
								<Input
									type="text"
									placeholder="Enter your email address"
									{...register('email', {
										required: 'You have to enter your email',
										pattern: {
											value:
												/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											message: 'Please enter a valid email',
										},
									})}
								/>
							</FormControl>

							<FormControl id="gender">
								<FormLabel>Gender</FormLabel>
								<RadioGroup name="gender">
									<Radio
										id="gender-male"
										value="male"
										{...register('gender', {
											required: 'Please enter your gender',
										})}
									>
										Male
									</Radio>
									<Radio
										id="gender-female"
										value="female"
										{...register('gender', {
											required: 'Please enter your gender',
										})}
									>
										Female
									</Radio>
									<Radio
										id="gender-other"
										value="other"
										{...register('gender', {
											required: 'Please enter your gender',
										})}
									>
										Other
									</Radio>
								</RadioGroup>
							</FormControl>

							<FormControl id="country">
								<FormLabel>Country</FormLabel>
								<Select
									placeholder="Select your country"
									{...register('country', {
										required: 'You must select a country',
									})}
								>
									{countries.map((item) => (
										<option key={item} value={item}>
											{item}
										</option>
									))}
								</Select>
							</FormControl>

							<FormControl id="signup-pass">
								<FormLabel>Password</FormLabel>
								<Input
									type="password"
									placeholder="Enter a password"
									{...register('password', {
										required: 'You have to enter a password for your account',
										minLength: {
											value: 8,
											message:
												'Your password must at least be 8 characters long',
										},
									})}
								/>
							</FormControl>

							<FormControl id="confirm-pass">
								<FormLabel>Re-type Password</FormLabel>
								<Input
									type="password"
									placeholder="Re-type the password"
									{...register('re-password', {
										required: 'Please re-type the previous password',
										validate: (value) =>
											value === password || 'The passwords do not match',
									})}
								/>
							</FormControl>
							<Spacer />
							<Button
								type="submit"
								colorScheme="purple"
								isLoading={isSubmitting}
							>
								Create account
							</Button>
						</Stack>
					</Box>
					<Box w="xl">
						<Heading>Start turning your creativity into Dollars!</Heading>
						<br />
						<Text>
							If you believe that you&apos;ve the capiblity to create mind
							blowing unique designs, join our designer community to sell those
							worldwide.
						</Text>
					</Box>
				</Box>
			</Layout>
		);
	} else if (!loading && authUser) {
		return <Text>Redirecting...</Text>;
	}

	return <Layout></Layout>;
}
