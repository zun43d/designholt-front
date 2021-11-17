import Head from 'next/head';
import Layout, { siteTitle } from '@/layout/layout';
import countryList from 'react-select-country-list';
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

// export function getStaticProps() {
// 	const countries = countryList()
// 		.setLabel('AG', 'Antigua')
// 		.setLabel('BO', 'Bolivia')
// 		.setLabel('BQ', 'Bonaire')
// 		.setLabel('GB', 'United Kingdom')
// 		// .setEmpty('Select a country')
// 		.getLabels();

// 	return {
// 		props: {
// 			countries,
// 		},
// 	};
// }

export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm();

	const password = watch('password', '');
	console.log(password);

	const handleSignup = (values) => {
		console.log(values);
		console.log(errors);
	};

	return (
		<Layout>
			<Head>
				<title>Seller Signup | Designholt</title>
			</Head>

			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mx="10"
				mt="20"
			>
				<Box w="xl">
					<Heading>Create seller account</Heading>
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
							<RadioGroup name="gender-select">
								<Radio id="gender-male" value="male">
									Male
								</Radio>
								<Radio id="gender-female" value="female">
									Female
								</Radio>
								<Radio id="gender-other" value="other">
									Other
								</Radio>
							</RadioGroup>
						</FormControl>

						<FormControl id="country">
							<FormLabel>Country</FormLabel>
							<Select
								placeholder="Select the country you are from"
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
										message: 'Your password must at least be 8 characters long',
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
						<Button type="submit" colorScheme="purple" isLoading={isSubmitting}>
							Create account
						</Button>
					</Stack>
				</Box>
				<Box w="xl">
					<Heading>
						I don&apos;t really know what&apos;ll really go here.
					</Heading>
					<br />
					<Text>
						Maybe some informational text will go here. Which will explain how
						to signup and stuff... blah blah. Well I dont really have time to
						think about it and come up with something. Thats really a drag for
						me. Also I dont want to just put a random lorem ipsum text here.
						That freaking text triggers my OCD issue. Anyways, I think this much
						text will be enough for me to test the UI designing stuff.
					</Text>
				</Box>
			</Box>
		</Layout>
	);
}
