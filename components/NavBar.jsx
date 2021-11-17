import NextLink from 'next/link';
import { useAuth } from '@/context/AuthUserContext';
import {
	Box,
	Flex,
	HStack,
	Container,
	Text,
	Link,
	Spacer,
	useColorMode,
	Icon,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuGroup,
	MenuDivider,
	Portal,
	Avatar,
	useDisclosure,
} from '@chakra-ui/react';
import { Button, IconButton } from '@/components/uiComponents.jsx';
import SideDrawer from '@/components/SideDrawer';
import Branding from '@/components/BrandingSVG.jsx';
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HiShoppingCart } from 'react-icons/hi';

export default function NavBar({ home }) {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { authUser, signUserOut } = useAuth();

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
				<Flex mt="-1" cursor="pointer">
					<NextLink href="/">
						<Branding
							isDark={colorMode === 'dark' ? true : false}
							style={{
								curson: 'pointer',
							}}
						/>
					</NextLink>
				</Flex>
				<Spacer />
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
					{!authUser && (
						<Menu id="seller-menu" isLazy>
							<MenuButton>Seller portal</MenuButton>
							<MenuList>
								<NextLink href={'/seller/signup'} passHref>
									<Link w="full" h="full">
										<MenuItem>Become a seller</MenuItem>
									</Link>
								</NextLink>
								<NextLink href={'/seller/login'} passHref>
									<Link w="full" h="full">
										<MenuItem>Seller login</MenuItem>
									</Link>
								</NextLink>
							</MenuList>
						</Menu>
					)}
				</HStack>
				<Spacer />
				<HStack spacing={4}>
					{/* <IconButton
						icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						color="gray.400"
						onClick={toggleColorMode}
					/> */}
					<Box>
						<Button
							onClick={onOpen}
							leftIcon={<Icon as={HiShoppingCart} w={5} h={5} />}
						>
							Open Cart
						</Button>
						<Portal>
							<SideDrawer
								size="sm"
								isOpen={isOpen}
								onClose={onClose}
								header="Cart Items"
								pButton="Secure Checkout"
								sButton="Browse more"
							/>
						</Portal>
					</Box>
					{authUser && (
						<Menu>
							<MenuButton>
								<Avatar w={10} h={10} />
							</MenuButton>
							<MenuList>
								<MenuGroup title="My Account">
									<NextLink href="/seller/dashboard" passHref>
										<MenuItem as="a">Dashboard</MenuItem>
									</NextLink>
									<NextLink href={`/seller/${authUser?.uid}`} passHref>
										<MenuItem as="a">Profile</MenuItem>
									</NextLink>
								</MenuGroup>
								<MenuDivider />
								<MenuGroup title="Quick Links">
									<MenuItem>Upload New Logo</MenuItem>
									<MenuItem>All Contents</MenuItem>
								</MenuGroup>
								<MenuDivider />
								<MenuItem onClick={signUserOut}>Log Out</MenuItem>
							</MenuList>
						</Menu>
					)}
				</HStack>
			</Container>
		</Box>
	);
}
