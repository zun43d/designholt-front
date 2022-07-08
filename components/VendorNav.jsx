import NextLink from 'next/link';
import { Box, Container, HStack, Text } from '@chakra-ui/react';
import { Link } from './uiComponents';

// I was in a hurry, so
// I made repetative components! Sorry to anyone who has to read this. :P

export default function VendorNav() {
	return (
		<Box bgColor="gray.100" borderY="1px" borderColor="gray.200">
			<Container
				maxW="8xl"
				// h="10"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<HStack as="nav" spacing={0}>
					{/* <NextLink href="/seller/dashboard" passHref>
						<Link>Dashboard</Link>
					</NextLink> */}
					<NextLink href="/seller/dashboard/portfolio" passHref>
						<Link
							py="2"
							px="5"
							color="gray.600"
							_hover={{
								textDecoration: 'none',
								background: 'gray.200',
								height: 'full',
								color: 'black',
							}}
						>
							Portfolio
						</Link>
					</NextLink>
					<NextLink href="/seller/dashboard/upload" passHref>
						<Link
							py="2"
							px="5"
							color="gray.600"
							_hover={{
								textDecoration: 'none',
								background: 'gray.200',
								height: 'full',
								color: 'black',
							}}
						>
							Upload
						</Link>
					</NextLink>
					<NextLink href="/seller/dashboard/earnings" passHref>
						<Link
							py="2"
							px="5"
							color="gray.600"
							_hover={{
								textDecoration: 'none',
								background: 'gray.200',
								height: 'full',
								color: 'black',
							}}
						>
							Earnings
						</Link>
					</NextLink>
					<NextLink href="/seller/dashboard/settings" passHref>
						<Link
							py="2"
							px="5"
							color="gray.600"
							_hover={{
								textDecoration: 'none',
								background: 'gray.200',
								height: 'full',
								color: 'black',
							}}
						>
							Settings
						</Link>
					</NextLink>
				</HStack>
				{/* <Text color="gray.500">Beta v0.1.3</Text> */}
			</Container>
		</Box>
	);
}
