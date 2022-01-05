import Image from 'next/image';
import { useCart } from 'react-use-cart';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Text,
	Box,
	Center,
	Spacer,
} from '@chakra-ui/react';
import { Button, Input, IconButton } from './uiComponents';
import { MinusIcon } from '@chakra-ui/icons';

export default function SideDrawer(props) {
	// const { isOpen, onOpen, onClose } = useDisclosure();
	const { size, isOpen, onClose, header, children, pButton, sButton } = props;
	const { isEmpty, totalUniqueItems, items, removeItem } = useCart();

	const totalPrice = items.reduce((acc, item) => {
		return (items.length * item.price).toFixed(2);
	}, 0);

	return (
		<>
			{/* <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button> */}
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				size={size}
				// finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						Cart
						<Text fontSize="sm" fontWeight="normal" color="gray.500">
							{totalUniqueItems} items were added
						</Text>
					</DrawerHeader>

					<DrawerBody>
						{isEmpty ? (
							<Center
								minH="full"
								fontWeight="medium"
								fontSize="lg"
								color="gray.500"
							>
								Your cart is empty!
							</Center>
						) : (
							items.map((item) => (
								<Box
									key={item.id}
									mb="3"
									px="3"
									py="2"
									border="1px"
									borderColor="gray.100"
									borderRadius="md"
									boxShadow="sm"
									display="flex"
									alignItems="center"
								>
									<Box display="flex" alignItems="center">
										<Box w="20" h="20">
											<Image
												src={item.thumbnail}
												alt={item.title}
												width={100}
												height={100}
												layout="responsive"
											/>
										</Box>
										<Box ml="5" flexGrow="1">
											<Text fontWeight="semibold">{item.title}</Text>
											<Text fontSize="lg" fontWeight="medium" color="gray.500">
												{item.price}$
											</Text>
										</Box>
									</Box>
									<Spacer />
									<IconButton
										icon={<MinusIcon />}
										variant="ghost"
										colorScheme="gray"
										_hover={{ color: 'red.600', bgColor: 'red.50' }}
										onClick={() => removeItem(item.id)}
									/>
								</Box>
							))
						)}
						{!isEmpty && (
							<Box
								bg="white"
								px="3"
								py="2"
								border="1px"
								borderColor="gray.100"
								borderRadius="md"
								boxShadow="sm"
								display="flex"
								alignItems="center"
								fontSize="lg"
								position="sticky"
								bottom="0px"
							>
								<Text>Total</Text>
								<Spacer />
								<Text fontWeight="semibold">{totalPrice}$</Text>
							</Box>
						)}
					</DrawerBody>

					{!isEmpty && (
						<DrawerFooter display="flex" flexDir="column">
							<Button colorScheme="purple" size="lg" w="full" mb="2">
								Secure Checkout
							</Button>
							<Button variant="ghost" onClick={onClose} size="md" w="full">
								Browse More
							</Button>
						</DrawerFooter>
					)}
				</DrawerContent>
			</Drawer>
		</>
	);
}
