import NextLink from 'next/link';
import { Box, Container, HStack, Text } from '@chakra-ui/react';
import { Link } from './uiComponents';

export default function VendorNav() {
	return (
		<Box bgColor="gray.100" borderY="1px" borderColor="gray.200">
			<Container
				maxW="8xl"
				h="10"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<HStack as="nav" spacing="6">
					<NextLink href="/seller/dashboard" passHref>
						<Link>Dashboard</Link>
					</NextLink>
					<NextLink href="/seller/dashboard/portfolio" passHref>
						<Link>Portfolio</Link>
					</NextLink>
					<NextLink href="/seller/dashboard/upload" passHref>
						<Link>Upload</Link>
					</NextLink>
					<NextLink href="/seller/dashboard/earnings" passHref>
						<Link>Earnings</Link>
					</NextLink>
					<NextLink href="/seller/dashboard/settings" passHref>
						<Link>Settings</Link>
					</NextLink>
				</HStack>
				<Text color="gray.500">Beta v0.1.3</Text>
			</Container>
		</Box>
	);
}
