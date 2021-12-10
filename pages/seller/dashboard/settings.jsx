import NextLink from 'next/link';
import VendorPanel from '@/layout/vendorPanel';
import {
	Heading,
	Text,
	Divider,
	Box,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';
import { Link, Input, Button } from '@/components/uiComponents';

export default function Settings() {
	return (
		<VendorPanel maxW="container.md" mx="auto">
			<Heading my="5">Settings</Heading>
			<Divider />
			<br />
			<Box>
				<Heading fontWeight="bold" size="md">
					Basic Settings
				</Heading>
				<Box my="5">
					<FormControl>
						<FormLabel>Full Name</FormLabel>
						<Box display="flex" alignItems="center" gridGap={2}>
							<Input placeholder="Change your full name" value="Zunaed Ahmed" />
							<Button>Change</Button>
						</Box>
					</FormControl>
					<br />
					<FormControl>
						<FormLabel>Profile Picture</FormLabel>
						<Text fontSize="sm" color="gray.400">
							To change your profile picture, go to your{' '}
							<NextLink href="/seller/dashboard/portfolio" passHref>
								<Link color="purple.500">Portfolio</Link>
							</NextLink>
							.
						</Text>
					</FormControl>
				</Box>
			</Box>
		</VendorPanel>
	);
}
