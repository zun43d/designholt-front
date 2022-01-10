import NextLink from 'next/link';
import Image from 'next/image';
import { Box, Text, Spacer, HStack } from '@chakra-ui/react';
import { Link } from '@/components/uiComponents';
import { getAllCategories } from '@/lib/sanityDb';
import Branding from '@/components/BrandingSVG.jsx';

export default function Footer({ categories }) {
	return (
		<Box borderTop="1px" borderColor="gray.100" bg="gray.50">
			<Box maxW="8xl" mx="auto">
				<Box display="flex" justifyContent="space-evenly" mt="12">
					<Box>
						<Branding
							isDark={false}
							style={{
								curson: 'pointer',
							}}
						/>
						<Text fontSize="sm" color="gray.600" pl="7" mt="-1">
							Copyright &copy; 2021 DesignHolt. All rights reserved.
						</Text>
					</Box>
					<Spacer />
					<HStack alignItems="flex-start" spacing={20} mb="10">
						<Box display="flex" flexDirection="column">
							<NextLink href="/about" passHref>
								<Link>About us</Link>
							</NextLink>
							<NextLink href="/contact" passHref>
								<Link>Contact us</Link>
							</NextLink>
						</Box>
						<Box display="flex" flexDirection="column">
							<NextLink href="/privacy" passHref>
								<Link>User Privacy</Link>
							</NextLink>
							<NextLink href="/cookies" passHref>
								<Link>Browser Cookies</Link>
							</NextLink>
							<NextLink href="/terms" passHref>
								<Link>Terms of service</Link>
							</NextLink>
						</Box>
					</HStack>
				</Box>
			</Box>
		</Box>
	);
}
