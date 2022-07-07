import NextLink from 'next/link';
import Layout from '@/layout/layout';
import { Box, Heading, Text, OrderedList, ListItem } from '@chakra-ui/react';
import { Link } from '@/components/uiComponents';

export default function Cookies() {
	return (
		<Layout maxW="4xl">
			<Box my="12" px="10">
				<Heading as="h2" size="2xl" textAlign="center" mb="2">
					Cookies Policy
				</Heading>
				<br />
				<Text fontSize="lg">
					Cookies, clear gifs and similar technologies (cookies) are used on our
					site to personalize content and ads, provide and improve product
					features and to analyze our traffic on our Designholt site, our
					business partners and sellers. As a part of our commitment to
					upholding a high standard of transparency with our users, we’ve
					created this guide to explain the tracking technologies we use on our
					site.
				</Text>
				<br />
				<Heading as="h3" size="lg" mb="2">
					What are cookies, clear gifs and similar technologies?
				</Heading>
				<Text fontSize="lg">
					<br />
					<b>Cookies</b> are a small data file sent to your web browser or
					mobile device that is stored on your browser cache.
					<br />
					<br />
					<b>Clear gifs and pixel trackers</b> are tiny graphics with a unique
					identifier and are similar in function to cookies, and are used to
					track the movements of web users between pages and website. They are
					embedded invisibly on web pages and are about the size of a single
					pixel.
					<br />
					<br />
					<b>First-party</b> cookies are set by us when you&apos;re visiting our
					site, and third-party cookies are set by a party other than the
					website you&apos;re visiting.
				</Text>
				<br />
				<br />
				<Heading as="h3" size="lg" mb="2">
					Cookies and similar technologies are used for the following purposes
					on the Designholt site
				</Heading>
				<Text fontSize="lg">
					<br />
					<b>Strictly Necessary:</b> Strictly necessary cookies help make a
					website usable by enabling basic functions like page navigation,
					website security and access to information that requires
					authentication.
					<br />
					<br />
					<b>Preferences:</b> These cookies enable storage of information that
					changes the way a website behaves or looks, like settings for your
					region.
					<br />
					<br />
					<b>Statistics:</b> Statistics cookies help us to understand how
					visitors interact with our website by collecting and reporting
					information.
					<br />
					<br />
					<b>Marketing:</b> Marketing cookies are used for tracking browsing
					activity and to customize and display ads that are relevant and
					engaging.
					<br />
					<br />
					<b>Third Parties:</b> Our business partners and sellers use cookies
					for the purposes described above.
				</Text>
				<br />
				<br />
				<Heading as="h3" size="lg" mb="2">
					Contact, questions and changes
				</Heading>
				<br />
				<Text fontSize="lg">
					We may make changes to the Cookie Policy from time to time and we will
					take reasonable steps to let our users know about these changes. You
					can keep track of changes made by referring to the date below.
				</Text>
				<br />
				<Text fontSize="lg">
					If you have any questions about our privacy practices, or about how to
					change your cookie preferences, please contact our privacy manager at{' '}
					<NextLink href="mailto:contact@desingholt.com" passHref>
						<Link color="purple.600">contact@desingholt.com</Link>
					</NextLink>
				</Text>
				<br />
			</Box>
		</Layout>
	);
}
