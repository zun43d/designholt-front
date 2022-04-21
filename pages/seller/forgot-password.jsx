import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthUserContext';
import Layout from '@/layout/layout';
import {
	Box,
	Heading,
	Text,
	Center,
	FormControl,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { Button, Input, FormLabel } from '@/components/uiComponents';

export default function Reset() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();
	const { forgotPassword, authUser } = useAuth();
	const toast = useToast();

	const handleEmail = async ({ email }) => {
		await forgotPassword(email)
			.then((res) => {
				console.log(res);
				toast({
					title: 'Email successfully sent',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
			})
			.catch((err) => {
				toast({
					title: `Error occurred!`,
					description: err.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			});
	};

	return (
		<Layout maxW="8xl" noFoot={true}>
			<Center>
				<Center flexDir="column" boxShadow="md" w="xl" py="6" px="12" mt="32">
					<Box mb="8" textAlign="center">
						<Heading mb="3">Recover your account</Heading>
						<Text fontSize="md" px="5">
							Enter your email address and we will send you a password reset
							link.
						</Text>
					</Box>
					<Stack
						as="form"
						onSubmit={handleSubmit(handleEmail)}
						spacing={4}
						mb="6"
						w="full"
					>
						<FormControl>
							<FormLabel>Email address</FormLabel>
							<Input
								{...register('email', {
									required: 'true',
									value: authUser?.email,
								})}
								placeholder="Enter your email"
							/>
						</FormControl>
						<Button
							type="submit"
							mt="4"
							colorScheme="purple"
							isLoading={isSubmitting}
						>
							Get reset link
						</Button>
					</Stack>
				</Center>
			</Center>
		</Layout>
	);
}
