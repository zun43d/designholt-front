import NextLink from 'next/link';
import Image from 'next/image';
import { Box, Text, Spacer, HStack } from '@chakra-ui/react';
import { Link } from '@/components/uiComponents';
import { getAllCategories } from '@/lib/sanityDb';
import Branding from '@/components/BrandingSVG.jsx';

export default function Footer({ categories }) {
	return (
		<Box borderTop="1px" borderColor="gray.100" bg="gray.100">
			<Box maxW="8xl" mx="auto">
				<Box
					display="flex"
					flexDir={['column-reverse', null, 'row']}
					justifyContent="space-evenly"
					mt="12"
				>
					<Box w="60" mx={['auto', 'auto', 0]}>
						<Box w="40" mx={['auto', 'auto', 0]}>
							<Branding
								isDark={false}
								style={{
									curson: 'pointer',
								}}
							/>
						</Box>
						<Text
							fontSize="sm"
							color="gray.600"
							pl="7"
							mt={['1', null, '-1']}
							mb="5"
							textAlign={['center', 'center', 'left']}
						>
							Copyright &copy; 2021 DesignHolt. All rights reserved.
						</Text>
					</Box>
					<Spacer />
					<HStack
						flexDir={['column', null, 'row']}
						alignItems={['center', null, 'flex-start']}
						justifyContent={['center', null, 'flex-start']}
						spacing={[0, null, 20]}
						mb="10"
						textAlign={['center', null, 'left']}
					>
						<Box display="flex" flexDirection="column" mb={['5', null, '0']}>
							<NextLink href="/about" passHref>
								<Link>About us</Link>
							</NextLink>
							{/* <NextLink href="/contact" passHref>
								<Link>Contact us</Link>
							</NextLink> */}
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
