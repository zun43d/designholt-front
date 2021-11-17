import Layout from '@/layout/layout';
import countryList from 'react-select-country-list';
import { Box, Heading, Text, Stack, FormControl } from '@chakra-ui/react';
import {
	FormLabel,
	Input,
	Button,
	Radio,
	RadioGroup,
	Select,
} from '@/components/uiComponents';
import { useForm } from 'react-hook-form';

export function getStaticProps() {
	const countries = countryList()
		.setLabel('AG', 'Antigua')
		.setLabel('BO', 'Bolivia')
		.setLabel('BQ', 'Bonaire')
		.setLabel('GB', 'United Kingdom')
		// .setEmpty('Select a country')
		.getLabels();

	return {
		props: {
			countries,
		},
	};
}

export default function SignUp({ countries }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	return (
		<Layout>
			<Box>
				<Box>
					<Heading>Create seller account</Heading>
					<Text color="gray.500">
						Join us and start your creative earning today.
					</Text>
					<Stack as="form" name="seller-singup">
						<FormControl>
							<FormLabel>Full Name</FormLabel>
							<Input
								type="text"
								placeholder="Enter your full legal name"
								{...register('fullName', {
									required: 'Please enter your fullname',
									maxLength: {
										value: 2,
										message: 'Your name should at least be two characters long',
									},
								})}
							/>
						</FormControl>

						<FormControl>
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

						<FormControl>
							<FormLabel>Gender</FormLabel>
							<RadioGroup name="seller-signup">
								<Radio value="male">Male</Radio>
								<Radio value="female">Female</Radio>
								<Radio value="other">Other</Radio>
							</RadioGroup>
						</FormControl>

						<FormControl>
							<FormLabel>Country</FormLabel>
							<Select placeholder="Select a country">
								{countries.map((item) => (
									<option key={item} value={item.toLowerCase()}>
										{item}
									</option>
								))}
							</Select>
						</FormControl>
						{/* TODO, gotta add validation to select input box */}
					</Stack>
				</Box>
			</Box>
		</Layout>
	);
}
