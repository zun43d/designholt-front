import Image from 'next/image';
import NextLink from 'next/link';
import { useAuth } from '@/context/AuthUserContext';
import { useCart } from 'react-use-cart';

import { Box, Text, Heading, Skeleton, useToast } from '@chakra-ui/react';
import { IconButton, Button, Link } from '@/components/uiComponents';
import { DownloadIcon } from '@chakra-ui/icons';

export default function Product({
	image,
	alt,
	title,
	creator,
	price,
	id,
	thumbnail,
	setIsCartOpen,
	setItemDetails,
	...rest
}) {
	const { authUser } = useAuth();
	const { addItem, inCart } = useCart();
	const toast = useToast();

	const productUrl = `/products/${id}`;

	return (
		<Box
			w="full"
			boxShadow="md"
			borderRadius="sm"
			overflow="hidden"
			{...rest}
			_hover={{
				transform: 'translateY(-3px) scale(1.005)',
				// transform: 'scale(1.01)',
				transition: 'all 0.25s linear',
				boxShadow: 'lg',
			}}
		>
			<NextLink href={productUrl} passHref>
				<Link>
					<Box w="full" height="xs" overflow="hidden" position="relative">
						<Box
							w="full"
							h="full"
							position="absolute"
							bgGradient="linear-gradient(0deg,rgba(0,0,0,.2) 0,transparent 80px)"
							opacity="0.5"
							transition="all"
							transitionDuration="0.2s"
							zIndex="1"
							_hover={{
								opacity: '1',
								// backgroundImage:
								// 	'linear-gradient(0deg,rgba(0,0,0,.2) 0,transparent 80px)',
							}}
						></Box>
						<Image
							src={image}
							width={128}
							height={278}
							layout="responsive"
							alt={alt}
							draggable={false}
						/>
					</Box>
				</Link>
			</NextLink>
			<Box px="4" bg="white">
				<Box py="5" textAlign="left">
					<NextLink href={productUrl} passHref>
						<Link>
							<Heading as="h4" size="sm" isTruncated>
								{title}
							</Heading>
						</Link>
					</NextLink>
					<Text pt="0.5" fontSize="xs" color="gray.500">
						<i>by</i>{' '}
						<NextLink href={`/seller/${creator._id}`} passHref>
							<Link>{creator.fullName}</Link>
						</NextLink>
					</Text>
				</Box>
				<Box
					pb="6"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text fontWeight="bold" fontSize="xl">
						${price}
					</Text>
					<IconButton
						colorScheme="purple"
						size="md"
						variant="outline"
						icon={<DownloadIcon />}
						bg="purple.50"
						color="purple.700"
						border="1px"
						borderColor="purple.200"
						isDisabled={creator._id === authUser?.uid}
						_hover={{
							backgroundColor: 'purple.500',
							color: 'white',
							borderColor: 'purple.500',
						}}
						onClick={() => {
							if (!inCart(id)) {
								addItem({ id, title, price, thumbnail, creator });
								setItemDetails({ id, title, price, thumbnail, creator });
								setIsCartOpen(true);
								return toast({
									title: 'Added to cart',
									status: 'success',
									duration: 5000,
									isClosable: true,
								});
							}

							toast({
								title: 'Already in cart',
								status: 'warning',
								duration: 5000,
								isClosable: true,
							});
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
}
