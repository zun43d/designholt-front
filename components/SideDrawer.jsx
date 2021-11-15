import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import { Button, Input } from './uiComponents';

export default function SideDrawer(props) {
	// const { isOpen, onOpen, onClose } = useDisclosure();
	const { size, isOpen, onClose, header, children, pButton, sButton } = props;

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
					<DrawerHeader>{header}</DrawerHeader>

					<DrawerBody>{children}</DrawerBody>

					<DrawerFooter display="flex" flexDir="column">
						<Button colorScheme="purple" size="lg" w="full" mb="2">
							{pButton}
						</Button>
						<Button variant="ghost" onClick={onClose} size="md" w="full">
							{sButton}
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
