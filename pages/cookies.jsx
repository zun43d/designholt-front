import NextLink from 'next/link';
import Layout from '@/layout/layout';
import { Box, Heading, Text, OrderedList, ListItem } from '@chakra-ui/react';
import { Link } from '@/components/uiComponents';

export default function Cookies() {
	return (
		<Layout maxW="4xl">
			<Box my="12" px="10">
				<Heading as="h2" size="2xl" textAlign="center" mb="2">
					Cookies
				</Heading>
				<br />
				<Text fontSize="lg">
					We use cookies to improve your experience on our website. By using our
					website, you agree to our use of cookies.
				</Text>
				<br />
				<Heading as="h3" size="lg" mb="2">
					What are cookies?
				</Heading>
				<Text fontSize="lg">
					Cookies are small text files that are stored on your computer to help
					us improve your experience. We use cookies to help us understand how
					you use our website, so that we can personalize your experience. For
					example, we use cookies to remember your login details so that you can
					access your account faster.
				</Text>
				<br />
				<Heading as="h3" size="lg" mb="2">
					How do we use cookies?
				</Heading>
				<Text fontSize="lg">
					We use cookies to help us understand how you use our website, so that
					we can personalize your experience. For example, we use cookies to
					remember your login details so that you can access your account
					faster.
				</Text>
				<br />
				<Heading as="h3" size="lg" mb="2">
					How do we stop using cookies?
				</Heading>
				<Text fontSize="lg">
					You can stop using cookies by changing your browser settings. However,
					some of the features of our website may not work properly if you do
					so.
				</Text>
				<br />
				<Heading as="h3" size="lg" mb="2">
					How do we keep your information safe?
				</Heading>
				<Text fontSize="lg">
					We use security measures to protect your information. When you place
					an order through our website, we use a secure server to store your
					information. We also protect your information by using encryption.
				</Text>
				<br />
			</Box>
		</Layout>
	);
}
