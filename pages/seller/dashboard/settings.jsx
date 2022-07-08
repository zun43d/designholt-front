import NextLink from 'next/link';
import VendorPanel from '@/layout/vendorPanel';
import {
	Heading,
	Text,
	Divider,
	Box,
	FormControl,
	FormLabel,
	FormHelperText,
} from '@chakra-ui/react';
import { Link, Input, Button } from '@/components/uiComponents';

export default function Settings() {
	return (
		<VendorPanel maxW="container.md" mx="auto">
			<Heading my="5">Settings</Heading>
			<Divider />
			{/* <br /> */}
			<Box>
				{/* <Heading fontWeight="bold" size="md">
					Account Login
				</Heading> */}
				<Box my="5">
					<FormControl>
						<FormLabel>Change your password</FormLabel>
						<FormHelperText>
							Is your account in danger? Protect it by reseting your password
						</FormHelperText>
						<Box display="flex" alignItems="center" gridGap={2} mt="5">
							<NextLink href="/seller/forgot-password" passHref>
								<Button as="a">Change Password</Button>
							</NextLink>
						</Box>
					</FormControl>
				</Box>
			</Box>
		</VendorPanel>
	);
}
