import { useContext } from 'react';
import NextLink from 'next/link';
import AppContext from '@/context/AppContext';
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
	Grid,
	GridItem,
} from '@chakra-ui/react';
import { Button, Link, IconButton } from '@/components/uiComponents.jsx';
import CategoryItem from '@/components/CategoryItem';
import CartDrawer from '@/components/CartDrawer';
import Branding from '@/components/BrandingSVG.jsx';
import {
	MdOutlineShoppingCart,
	MdOutlineSell,
	MdLogin,
	MdPersonAdd,
	MdKeyboardArrowDown,
} from 'react-icons/md';

export default function NavBar({ home, noCart /*categories*/ }) {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { authUser, signUserOut } = useAuth();
	const {
		state: { categories },
	} = useContext(AppContext);

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
				<HStack as="nav" spacing="" ml="8">
					<NextLink href={'/products'} passHref>
						<Button
							as="a"
							variant="ghost"
							h="10"
							px="3"
							borderRadius="xl"
							fontSize="sm"
						>
							All Items
						</Button>
					</NextLink>
					<Box role="group">
						<Button
							variant="ghost"
							h="10"
							px="3"
							iconSpacing="0"
							rightIcon={<MdKeyboardArrowDown size={18} />}
							borderRadius="xl"
							fontSize="sm"
							position="relative"
							top="1"
							noOutline
						>
							Categories
						</Button>
						<Box pt="2">
							<Grid
								visibility="hidden"
								opacity="0"
								position="absolute"
								bgColor="white"
								border="1px"
								borderColor="gray.200"
								borderRadius="lg"
								boxShadow="xl"
								// mt="2"
								ml="-4"
								px="3"
								py="3"
								gridTemplateRows="auto auto auto auto auto"
								gridAutoFlow="column"
								justifyContent="start"
								alignItems="start"
								zIndex="2"
								transform="scale(0.95) translateX(-12px) translateY(-2px)"
								transition="visibility 0.3s linear, opacity 0.2s linear, transform 0.2s ease-in-out"
								transitionDelay="0.1s"
								_groupHover={{
									visibility: 'visible',
									opacity: '1',
									transform: 'scale(1)',
								}}
							>
								{categories.map((category) => (
									<CategoryItem
										key={category._id}
										title={category.categoryName}
										// slug={category.slug}
									/>
								))}
							</Grid>
						</Box>
					</Box>
					{/* {!authUser && (
						<Menu id="seller-menu" isLazy>
							<MenuButton>Seller portal</MenuButton>
							<MenuList>
								<NextLink href={'/seller/signup'} passHref>
									<MenuItem as="a">Become a seller</MenuItem>
								</NextLink>
								<NextLink href={'/seller/login'} passHref>
									<MenuItem as="a">Seller login</MenuItem>
								</NextLink>
							</MenuList>
						</Menu>
					)} */}
				</HStack>
				<Spacer />
				<HStack spacing={2}>
					{/* <IconButton
						icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						color="gray.400"
						onClick={toggleColorMode}
					/> */}

					{noCart ? null : (
						<Box>
							<IconButton
								onClick={onOpen}
								variant="outline"
								icon={<Icon as={MdOutlineShoppingCart} w={6} h={6} />}
							/>
							<Portal>
								<CartDrawer size="sm" isOpen={isOpen} onClose={onClose} />
							</Portal>
						</Box>
					)}
					{!authUser && (
						<Menu id="seller-menu" position="relative">
							<MenuButton
								as={Button}
								colorScheme="purple"
								// variant="outline"
								leftIcon={<MdOutlineSell size="20" />}
							>
								Sell logo
							</MenuButton>
							<Box position="relative" right="32" top="7">
								<MenuList>
									<NextLink href={'/seller/signup'} passHref>
										<MenuItem as="a" icon={<MdPersonAdd size={22} />}>
											Become a seller
										</MenuItem>
									</NextLink>
									<NextLink href={'/seller/login'} passHref>
										<MenuItem as="a" icon={<MdLogin size={20} />}>
											Login as seller
										</MenuItem>
									</NextLink>
								</MenuList>
							</Box>
						</Menu>
					)}

					{authUser && (
						<Menu>
							<MenuButton>
								<Button
									rightIcon={<MdKeyboardArrowDown />}
									variant="outline"
									iconSpacing="0"
									px="0"
								>
									<Avatar
										borderRadius="md"
										src={authUser?.photoUrl}
										w={10}
										h={10}
									/>
								</Button>
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
