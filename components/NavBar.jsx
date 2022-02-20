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

	const categories = [
		{
			_id: '049bdcbe-6309-411e-91bc-90dc131f7bbd',
			categoryName: 'Crests',
		},
		{
			_id: '08180d09-4bb2-402c-84ce-47d3bf84431c',
			categoryName: 'Symbol & Shapes',
		},
		{
			_id: '1300be56-8b28-42f0-8e0c-060579083fc3',
			categoryName: 'Vehicle',
		},
		{
			_id: '3001c8fd-3835-4fca-9f94-314baf2cbddc',
			categoryName: 'Vintage',
		},
		{
			_id: '4546b82c-4ae2-4ddc-aa73-02f468f06fcf',
			categoryName: 'Beauty',
		},
		{
			_id: '468e8e48-788c-40ff-884a-32f946ba6782',
			categoryName: 'Travel',
		},
		{
			_id: '484f6e82-d28a-416d-a512-b00d70a00c64',
			categoryName: 'Security',
		},
		{
			_id: '59d9249d-fdb9-4076-bee6-6a74b5aa6049',
			categoryName: 'Health & Wellness',
		},
		{
			_id: '7b319831-9ac4-4349-aec5-7370cccd0ca6',
			categoryName: 'Objects',
		},
		{
			_id: '84972770-90e0-4bea-9b23-d80ab3d59b43',
			categoryName: 'Animal',
		},
		{
			_id: '9fe89d14-5493-481d-abaa-324301755894',
			categoryName: 'Gaming & Sports',
		},
		{
			_id: 'b240e96d-eddb-4bf3-bc71-0b3152e61ac9',
			categoryName: 'Abstract Symbol',
		},
		{
			_id: 'c28e1ebe-3e99-4469-a306-cf2fa2a3ad5c',
			categoryName: 'Food',
		},
		{
			_id: 'd837c3be-31d2-4d94-adab-c4ba5af422d9',
			categoryName: 'Buildings',
		},
		{
			_id: 'da77d34d-0de5-46ca-b7ee-1a0e98160132',
			categoryName: 'Numbers',
		},
		{
			_id: 'da7aea80-6975-49cc-98c5-faa9130ecfb0',
			categoryName: 'Nature',
		},
		{
			_id: 'e150db81-894c-4bbd-9e37-da0677779bff',
			categoryName: 'Real Estate',
		},
		{
			_id: 'fb1e957c-d627-44d5-abe3-ac5c17256fa7',
			categoryName: 'Education',
		},
		{
			_id: 'fc023c18-b8f5-40c9-a6b8-523fee7b40be',
			categoryName: 'Tech',
		},
		{
			_id: 'fdb8f243-66ff-4de2-897a-d0ad2ea51380',
			categoryName: 'Single Letter',
		},
	];

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
								zIndex="1"
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
