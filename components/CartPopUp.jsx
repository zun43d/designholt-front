import Image from 'next/image';
import NextLink from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
	useOutsideClick,
	Box,
	Heading,
	Text,
	Divider,
	Portal,
} from '@chakra-ui/react';
import { Button } from './uiComponents';
import { BsCheckCircle } from 'react-icons/bs';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function CartPopUp({ open, setOpen, itemDetails }) {
	const [isOpen, setIsOpen] = useState(false);
	const { id, title, price, thumbnail, creator } = itemDetails;
	const ref = useRef();

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		setIsOpen(open);
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	const closeModal = () => {
		setIsOpen(false);
		document.body.style.overflow = '';
	};

	useOutsideClick({
		ref: ref,
		handler: () => {
			setIsOpen(false);
			setOpen(false);
		},
	});

	return isOpen ? (
		<Portal>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				position="fixed"
				top="0"
				w="100vw"
				h="100vh"
				bg="rgb(0,0,0,0.5)"
				zIndex="100"
			>
				<Box ref={ref} bg="white" borderRadius="md" w="xl">
					<Box
						px="5"
						py="3"
						textAlign="center"
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<Box mt="1">
							<BsCheckCircle size="24" color="#805AD5" />
						</Box>
						<Heading fontWeight="bold" fontSize="2xl" mx="2">
							Item added to your cart
						</Heading>
					</Box>
					<Divider />
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						px="5"
						py="5"
						bg="gray.100"
					>
						<Box display="flex" alignItems="center" gridGap="4">
							<Box w="20" h="20" borderRadius="md" overflow="hidden">
								<Image src={thumbnail} height="200" width="200" alt={title} />
							</Box>
							<Box>
								<Text fontWeight="semibold">{title}</Text>
								<Text fontSize="sm">{creator.fullName}</Text>
							</Box>
							{/* <Text>{creator}</Text> */}
						</Box>
						<Box>
							<Text fontWeight="bold" fontSize="2xl">
								${price}
							</Text>
						</Box>
					</Box>
					<Divider />
					<Box
						mx="5"
						my="3"
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Button size="sm" onClick={closeModal}>
							Browse More
						</Button>
						<NextLink href="/checkout" passHref>
							<Button
								colorScheme="purple"
								size="sm"
								rightIcon={<ChevronRightIcon w="5" h="5" ml="-1" />}
							>
								Proceed to checkout
							</Button>
						</NextLink>
					</Box>
				</Box>
			</Box>
		</Portal>
	) : null;
}
