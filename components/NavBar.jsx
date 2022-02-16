import NextLink from 'next/link';
import { useAuth } from '@/context/AuthUserContext';
import {
	Box,
	Flex,
	HStack,
	Container,
	Text,
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
import { Button, Link } from '@/components/uiComponents.jsx';
import CartDrawer from '@/components/CartDrawer';
import Branding from '@/components/BrandingSVG.jsx';
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HiShoppingCart } from 'react-icons/hi';

export default function NavBar({ home, noCart }) {
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
				<HStack as="nav" spacing="4" ml="8" fontWeight="normal">
					<NextLink href={'/products'} passHref>
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
					{noCart ? null : (
						<Box>
							<Button
								onClick={onOpen}
								leftIcon={<Icon as={HiShoppingCart} w={5} h={5} />}
							>
								View Cart
							</Button>
							<Portal>
								<CartDrawer size="sm" isOpen={isOpen} onClose={onClose} />
							</Portal>
						</Box>
					)}
					{authUser && (
						<Menu>
							<MenuButton>
								<Avatar src={authUser?.photoUrl} w={10} h={10} />
							</MenuButton>
							<MenuList>
								<MenuGroup title={authUser?.name}>
									{/* <NextLink href="/seller/dashboard" passHref>
										<MenuItem as="a">Dashboard</MenuItem>
									</NextLink> */}
									<NextLink href={`/seller/dashboard/portfolio`} passHref>
										<MenuItem as="a">Portfolio</MenuItem>
									</NextLink>
								</MenuGroup>
								<NextLink href={`/seller/dashboard/upload`} passHref>
									<MenuItem as="a">Upload new logo</MenuItem>
								</NextLink>
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
