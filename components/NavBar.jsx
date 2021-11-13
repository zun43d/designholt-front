import NextLink from 'next/link';
import {
	Box,
	Flex,
	HStack,
	Container,
	Text,
	Link,
	Spacer,
	useColorMode,
} from '@chakra-ui/react';
import { Button, IconButton } from '@/components/uiComponents.jsx';
import Branding from '@/components/BrandingSVG.jsx';
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function NavBar({ home }) {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box color="gray.700" boxShadow="sm">
			<Container
				maxW="8xl"
				h="20"
				px={[4, 8, 8, 8, 4]}
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				<Flex mt="-1">
					<Branding isDark={colorMode === 'dark' ? true : false} />
				</Flex>
				<HStack as="nav" spacing="4" ml="8" fontWeight="normal">
					<NextLink href={'/all-logos'} passHref>
						<Link>All Items</Link>
					</NextLink>
					<NextLink href={'/'} passHref>
						<Link>
							Categories
							<ChevronDownIcon />
						</Link>
					</NextLink>
				</HStack>
				<Spacer />
				<HStack spacing={2}>
					<IconButton
						icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						color="gray.400"
						onClick={toggleColorMode}
						// mr="3"
					/>
					<NextLink href="/seller-login" passHref>
						<Button as="a">Seller Login</Button>
					</NextLink>
					<NextLink href="/seller-create" passHref>
						<Button as="a" colorScheme="purple">
							Become a seller
						</Button>
					</NextLink>
				</HStack>
			</Container>
		</Box>
	);
}
